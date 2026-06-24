type MBType = {
  startVideo: () => void;
  stopCamera: () => void;
  isCameraRunning: boolean;
};
const MButton = ({ startVideo, stopCamera, isCameraRunning }: MBType) => {
  return (
    <button
      onClick={isCameraRunning ? stopCamera : startVideo}
      className="cursor-pointer group relative isolate flex h-12 items-center gap-3 overflow-hidden rounded-full border border-primary-fixed/20 bg-black/80 py-2 pl-5 pr-2 text-primary-fixed backdrop-blur-xl transition-all duration-300 hover:border-primary-fixed/45 hover:shadow-[0_0_24px_rgba(0,252,64,0.16)] active:scale-[0.98]"
    >
      {/* Hover stripes */}
      <span className="absolute inset-0 -z-10 -translate-x-full bg-[repeating-linear-gradient(120deg,rgba(0,252,64,0.14)_0px,rgba(0,252,64,0.14)_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)] transition-transform duration-500 ease-out group-hover:translate-x-0" />

      <span className="h-1.5 w-1.5 rounded-full bg-primary-fixed shadow-[0_0_10px_rgba(0,252,64,0.8)]" />

      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
        {isCameraRunning ? "Stop" : "Start"}
      </span>

      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-sm text-on-primary-fixed transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </button>
  );
};

export default MButton;
