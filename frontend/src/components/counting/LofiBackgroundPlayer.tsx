import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

type LofiBackgroundPlayerProps = {
  src: string | null;
  volume: number;
};

const LOADING_HIDE_DELAY_MS = 3100;

export default function LofiBackgroundPlayer({
  src,
  volume,
}: LofiBackgroundPlayerProps) {
  if (!src) return null;

  return <ActiveLofiBackgroundPlayer key={src} src={src} volume={volume} />;
}

function ActiveLofiBackgroundPlayer({
  src,
  volume,
}: {
  src: string;
  volume: number;
}) {
  const [isBuffering, setIsBuffering] = useState(true);
  const hideLoadingTimeoutRef = useRef<number | null>(null);

  const clearHideLoadingTimeout = () => {
    if (hideLoadingTimeoutRef.current === null) return;

    window.clearTimeout(hideLoadingTimeoutRef.current);
    hideLoadingTimeoutRef.current = null;
  };

  const hideLoadingAfterDelay = () => {
    clearHideLoadingTimeout();
    hideLoadingTimeoutRef.current = window.setTimeout(() => {
      setIsBuffering(false);
      hideLoadingTimeoutRef.current = null;
    }, LOADING_HIDE_DELAY_MS);
  };

  const showLoading = () => {
    clearHideLoadingTimeout();
    setIsBuffering(true);
  };

  useEffect(() => {
    return clearHideLoadingTimeout;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      {isBuffering && (
        <img
          className="absolute inset-0 z-10 h-full w-full object-cover contrast-150"
          src="/loading.gif"
          alt=""
        />
      )}

      <div
        className={`absolute left-1/2 top-1/2 h-[56.25vw] min-h-screen w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 scale-[1.18] transition-opacity duration-500 ${
          isBuffering ? "opacity-0" : "opacity-100"
        }`}
      >
        <ReactPlayer
          src={src}
          playing
          playsInline
          controls={false}
          volume={volume}
          width="100%"
          height="100%"
          className="h-full w-full"
          config={{
            youtube: {
              color: "white",
              disablekb: 1,
              fs: 0,
              iv_load_policy: 3,
              rel: 0,
            },
          }}
          onPlay={hideLoadingAfterDelay}
          onPlaying={hideLoadingAfterDelay}
          onWaiting={showLoading}
        />
      </div>
    </div>
  );
}
