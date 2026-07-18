export type StudyMode = "screen" | "paper";

export type FocusTrackingSnapshot = {
  paperMode: boolean;
  totalSamples: number;
  faceDetectedSamples: number;
  averageYawDegrees: number | null;
  averagePitchDegrees: number | null;
  focusScore: number | null;
};

export const STUDY_MODE_STORAGE_KEY = "kinetic-study-mode";

export const getStoredStudyMode = (): StudyMode =>
  localStorage.getItem(STUDY_MODE_STORAGE_KEY) === "paper" ? "paper" : "screen";

export const storeStudyMode = (mode: StudyMode) => {
  localStorage.setItem(STUDY_MODE_STORAGE_KEY, mode);
};

export const emptyFocusSnapshot = (mode: StudyMode): FocusTrackingSnapshot => ({
  paperMode: mode === "paper",
  totalSamples: 0,
  faceDetectedSamples: 0,
  averageYawDegrees: null,
  averagePitchDegrees: null,
  focusScore: null,
});

export const calculateFocusScore = ({
  paperMode,
  totalSamples,
  faceDetectedSamples,
  averageYawDegrees,
  averagePitchDegrees,
}: Omit<FocusTrackingSnapshot, "focusScore">): number | null => {
  if (totalSamples <= 0) return null;

  const presence = Math.min(1, Math.max(0, faceDetectedSamples / totalSamples));
  if (faceDetectedSamples <= 0 || averageYawDegrees === null || averagePitchDegrees === null) {
    return Math.round(presence * 40);
  }

  const pitchTarget = paperMode ? 22 : 0;
  const pitchTolerance = paperMode ? 36 : 24;
  const pitchValue = paperMode ? Math.abs(averagePitchDegrees) : averagePitchDegrees;
  const yawAlignment = Math.max(0, 1 - Math.abs(averageYawDegrees) / 35);
  const pitchAlignment = Math.max(
    0,
    1 - Math.abs(pitchValue - pitchTarget) / pitchTolerance,
  );

  return Math.round(100 * (presence * 0.4 + yawAlignment * 0.3 + pitchAlignment * 0.3));
};
