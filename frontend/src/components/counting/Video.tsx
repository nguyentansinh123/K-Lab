import { useCallback, useEffect, useRef, useState } from "react";
import type { Human as HumanInstance } from "@vladmandic/human";
import {
  calculateFocusScore,
  emptyFocusSnapshot,
  storeStudyMode,
  type FocusTrackingSnapshot,
  type StudyMode,
} from "../../features/focus/focusTracking";
import { useLanguage } from "../../i18n/LanguageContext";

type VideoProps = {
  collecting: boolean;
  mode: StudyMode;
  resetToken: number;
  onModeChange: (mode: StudyMode) => void;
  onTrackingChange: (tracking: FocusTrackingSnapshot) => void;
};

type TrackingStatus = "off" | "loading" | "ready" | "error";

let humanPromise: Promise<HumanInstance> | null = null;

const getHuman = async () => {
  if (!humanPromise) {
    humanPromise = import("@vladmandic/human").then(async ({ Human }) => {
      const human = new Human({
        backend: "webgl",
        modelBasePath: "https://vladmandic.github.io/human-models/models/",
        cacheSensitivity: 0.25,
        warmup: "face",
        filter: { enabled: true, flip: false, autoBrightness: true },
        face: {
          enabled: true,
          detector: { maxDetected: 1, minConfidence: 0.35, rotation: false },
          mesh: { enabled: true },
          iris: { enabled: false },
          attention: { enabled: false },
          description: { enabled: false },
          emotion: { enabled: false },
          antispoof: { enabled: false },
          liveness: { enabled: false },
          gear: { enabled: false },
        },
        body: { enabled: false },
        hand: { enabled: false },
        object: { enabled: false },
        gesture: { enabled: false },
        segmentation: { enabled: false },
      });
      await human.load();
      return human;
    }).catch((error) => {
      humanPromise = null;
      throw error;
    });
  }
  return humanPromise;
};

const radiansToDegrees = (value: number) => (value * 180) / Math.PI;

export default function Video({ collecting, mode, resetToken, onModeChange, onTrackingChange }: VideoProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionTimerRef = useRef<number | null>(null);
  const runDetectionRef = useRef<() => Promise<void>>(async () => undefined);
  const runningRef = useRef(false);
  const collectingRef = useRef(collecting);
  const modeRef = useRef(mode);
  const angleSumsRef = useRef({ yaw: 0, pitch: 0 });
  const snapshotRef = useRef<FocusTrackingSnapshot>(emptyFocusSnapshot(mode));
  const onTrackingChangeRef = useRef(onTrackingChange);
  const [status, setStatus] = useState<TrackingStatus>("off");
  const [liveAngles, setLiveAngles] = useState<{ yaw: number; pitch: number } | null>(null);
  const [liveScore, setLiveScore] = useState<number | null>(null);

  useEffect(() => {
    collectingRef.current = collecting;
  }, [collecting]);

  useEffect(() => {
    onTrackingChangeRef.current = onTrackingChange;
  }, [onTrackingChange]);

  useEffect(() => {
    modeRef.current = mode;
    angleSumsRef.current = { yaw: 0, pitch: 0 };
    snapshotRef.current = emptyFocusSnapshot(mode);
    onTrackingChangeRef.current(snapshotRef.current);
  }, [mode]);

  useEffect(() => {
    angleSumsRef.current = { yaw: 0, pitch: 0 };
    snapshotRef.current = emptyFocusSnapshot(modeRef.current);
    onTrackingChangeRef.current(snapshotRef.current);
  }, [resetToken]);

  const recordSample = useCallback((angles: { yaw: number; pitch: number } | null) => {
    if (!collectingRef.current) return;

    const previous = snapshotRef.current;
    const totalSamples = previous.totalSamples + 1;
    let faceDetectedSamples = previous.faceDetectedSamples;
    let averageYawDegrees = previous.averageYawDegrees;
    let averagePitchDegrees = previous.averagePitchDegrees;

    if (angles) {
      faceDetectedSamples += 1;
      angleSumsRef.current.yaw += angles.yaw;
      angleSumsRef.current.pitch += angles.pitch;
      averageYawDegrees = angleSumsRef.current.yaw / faceDetectedSamples;
      averagePitchDegrees = angleSumsRef.current.pitch / faceDetectedSamples;
    }

    const scoreInput = {
      paperMode: modeRef.current === "paper",
      totalSamples,
      faceDetectedSamples,
      averageYawDegrees,
      averagePitchDegrees,
    };
    const next = { ...scoreInput, focusScore: calculateFocusScore(scoreInput) };
    snapshotRef.current = next;
    onTrackingChangeRef.current(next);
  }, []);

  const runDetection = useCallback(async () => {
    if (!runningRef.current || !videoRef.current) return;

    try {
      const human = await getHuman();
      if (!runningRef.current || !videoRef.current) return;
      const result = await human.detect(videoRef.current);
      const rotation = result.face[0]?.rotation?.angle;

      if (rotation) {
        const angles = {
          yaw: radiansToDegrees(rotation.yaw),
          pitch: radiansToDegrees(rotation.pitch),
        };
        setLiveAngles(angles);
        const score = calculateFocusScore({
          paperMode: modeRef.current === "paper",
          totalSamples: 1,
          faceDetectedSamples: 1,
          averageYawDegrees: angles.yaw,
          averagePitchDegrees: angles.pitch,
        });
        setLiveScore(score);
        recordSample(angles);
      } else {
        setLiveAngles(null);
        setLiveScore(0);
        recordSample(null);
      }
    } catch (error) {
      console.error("Face angle detection failed", error);
      setStatus("error");
      runningRef.current = false;
      return;
    }

    if (runningRef.current) {
      detectionTimerRef.current = window.setTimeout(() => void runDetectionRef.current(), 650);
    }
  }, [recordSample]);

  useEffect(() => {
    runDetectionRef.current = runDetection;
  }, [runDetection]);

  const stopCamera = useCallback(() => {
    runningRef.current = false;
    if (detectionTimerRef.current !== null) window.clearTimeout(detectionTimerRef.current);
    detectionTimerRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus("off");
    setLiveAngles(null);
    setLiveScore(null);
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  const startCamera = async () => {
    setStatus("loading");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      runningRef.current = true;
      await getHuman();
      if (!runningRef.current) return;
      setStatus("ready");
      void runDetection();
    } catch (error) {
      console.error("Could not start focus camera", error);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStatus("error");
    }
  };

  const changeMode = (nextMode: StudyMode) => {
    storeStudyMode(nextMode);
    onModeChange(nextMode);
  };

  const isFocused = liveScore !== null && liveScore >= 65;

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <video ref={videoRef} className="absolute inset-0 h-full w-full scale-x-[-1] object-cover" autoPlay muted playsInline />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48),transparent_32%,transparent_65%,rgba(0,0,0,0.72))]" />

      <div className="absolute left-4 right-4 top-4 flex flex-wrap items-start justify-between gap-3">
        <div className="rounded-[0.9rem] border border-white/[0.1] bg-black/65 px-3 py-2 backdrop-blur-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-outline">{t("focusTracking")}</p>
          <p className={`mt-1 flex items-center gap-2 font-headline text-xs font-black uppercase ${isFocused ? "text-primary" : "text-on-surface-variant"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${status === "ready" ? (isFocused ? "bg-primary" : "bg-secondary") : "bg-outline"}`} />
            {status === "loading"
              ? t("loadingModels")
              : status === "error"
                ? t("cameraError")
                : status === "ready"
                  ? liveAngles
                    ? isFocused ? t("focused") : t("adjustPosition")
                    : t("faceMissing")
                  : t("cameraStart")}
          </p>
        </div>

        <div className="flex rounded-full border border-white/[0.1] bg-black/65 p-1 backdrop-blur-xl">
          {(["screen", "paper"] as StudyMode[]).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => changeMode(option)}
              className={`cursor-pointer rounded-full px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] ${
                mode === option ? "bg-primary/15 text-primary" : "text-outline hover:text-white"
              }`}
            >
              {option === "paper" ? t("paperMode") : t("screenMode")}
            </button>
          ))}
        </div>
      </div>

      {status === "ready" ? (
        <div className="absolute bottom-20 left-4 right-4 grid grid-cols-3 gap-2">
          <Metric label={t("yaw")} value={liveAngles ? `${Math.round(liveAngles.yaw)}°` : "—"} />
          <Metric label={t("pitch")} value={liveAngles ? `${Math.round(liveAngles.pitch)}°` : "—"} />
          <Metric label={t("focusScore")} value={liveScore === null ? "—" : `${liveScore}%`} accent={isFocused} />
        </div>
      ) : null}

      <button
        type="button"
        onClick={status === "off" || status === "error" ? () => void startCamera() : stopCamera}
        disabled={status === "loading"}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-3 rounded-full border border-primary/25 bg-black/80 py-2 pl-5 pr-2 font-headline text-[10px] font-black uppercase tracking-[0.16em] text-primary backdrop-blur-xl transition-colors hover:bg-primary/[0.1] disabled:cursor-wait disabled:opacity-65"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_9px_rgba(0,252,64,0.8)]" />
        {status === "loading" ? t("loadingModels") : status === "ready" ? t("cameraStop") : t("cameraStart")}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary">
          <span className="material-symbols-outlined text-base">{status === "ready" ? "videocam_off" : "videocam"}</span>
        </span>
      </button>
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-[0.8rem] border border-white/[0.09] bg-black/65 px-3 py-2 backdrop-blur-xl">
      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-outline">{label}</p>
      <p className={`mt-1 font-headline text-sm font-black ${accent ? "text-primary" : "text-white"}`}>{value}</p>
    </div>
  );
}
