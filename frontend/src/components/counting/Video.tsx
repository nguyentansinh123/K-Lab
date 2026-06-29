import { useRef, useState } from "react";
import MButton from "../MButton";
import Loader from "../Loader";

const Video = () => {
  const [isCameraRunning, setIsCameraRunning] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startVideo = async () => {
    try {
      const video = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = video;
        setIsCameraRunning(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;

    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      setIsCameraRunning(false);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        playsInline
      />
      {!isCameraRunning && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <MButton
          startVideo={startVideo}
          stopCamera={stopCamera}
          isCameraRunning={isCameraRunning}
        />
      </div>
    </div>
  );
};

export default Video;
