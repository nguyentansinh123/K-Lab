import { motion, useReducedMotion } from "framer-motion";

type FocusAmbientBackgroundProps = {
  active: boolean;
};

const clouds = [
  {
    className:
      "-left-[12%] top-[8%] h-[48vmax] w-[48vmax] bg-[radial-gradient(circle,rgba(0,252,64,0.12),rgba(0,252,64,0.025)_48%,transparent_70%)]",
    x: ["0%", "16%", "4%", "0%"],
    y: ["0%", "12%", "25%", "0%"],
    duration: 28,
  },
  {
    className:
      "-right-[14%] top-[2%] h-[42vmax] w-[42vmax] bg-[radial-gradient(circle,rgba(156,255,147,0.1),rgba(156,255,147,0.02)_50%,transparent_72%)]",
    x: ["0%", "-20%", "-8%", "0%"],
    y: ["0%", "22%", "8%", "0%"],
    duration: 32,
  },
  {
    className:
      "bottom-[-35%] left-[28%] h-[38vmax] w-[38vmax] bg-[radial-gradient(circle,rgba(160,237,0,0.09),rgba(0,252,64,0.018)_50%,transparent_70%)]",
    x: ["0%", "18%", "-12%", "0%"],
    y: ["0%", "-18%", "-6%", "0%"],
    duration: 25,
  },
];

export default function FocusAmbientBackground({ active }: FocusAmbientBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      animate={{ opacity: active ? 1 : 0.42 }}
      transition={{ duration: reduceMotion ? 0 : 1.4 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,252,64,0.035),transparent_38%)]" />

      {clouds.map((cloud, index) => (
        <motion.div
          key={cloud.duration}
          className={`absolute rounded-[999px] blur-[70px] will-change-transform ${cloud.className}`}
          animate={
            reduceMotion
              ? { scale: 1 }
              : {
                  x: cloud.x,
                  y: cloud.y,
                  scale: [0.92, 1.08, 0.98, 0.92],
                  rotate: [0, index % 2 === 0 ? 16 : -14, 0],
                }
          }
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute inset-0 rounded-[999px] border border-primary-fixed/[0.08] shadow-[inset_0_0_70px_rgba(0,252,64,0.025),0_0_80px_rgba(0,252,64,0.025)]"
          animate={
            reduceMotion || !active
              ? { scale: 1, opacity: 0.45 }
              : { scale: [0.92, 1.08, 0.92], opacity: [0.3, 0.7, 0.3] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-[-1px] rounded-[999px]"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-[999px] bg-primary-fixed/70 shadow-[0_0_16px_rgba(0,252,64,0.75)]" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-[8%] top-1/2 h-44 -translate-y-1/2 rounded-[999px] bg-primary-fixed/[0.025] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(8,10,8,0.2)_62%,rgba(8,10,8,0.72)_100%)]" />
    </motion.div>
  );
}
