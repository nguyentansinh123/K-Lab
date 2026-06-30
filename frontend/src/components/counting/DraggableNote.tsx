import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

type TodoTask = {
  id: number;
  text: string;
  done: boolean;
};

const initialTasks: TodoTask[] = [
  { id: 1, text: "Pick the next thing", done: false },
  { id: 2, text: "Keep the session moving", done: false },
];

export default function DraggableNote() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [draft, setDraft] = useState("");
  const draggedClosedButtonRef = useRef(false);
  const nextTaskId = useRef(initialTasks.length + 1);
  const dragControls = useDragControls();
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const addTask = () => {
    const text = draft.trim();
    if (!text) return;

    setTasks((current) => [
      ...current,
      { id: nextTaskId.current, text, done: false },
    ]);
    nextTaskId.current += 1;
    setDraft("");
  };

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const removeTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <AnimatePresence initial={false}>
        {open ? (
          <motion.aside
            key="counting-note"
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            style={{ x, y }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto absolute left-4 top-24 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-[0.8rem] border border-primary/20 bg-[#10160f]/90 shadow-[0_18px_50px_rgba(0,0,0,0.45),0_0_28px_rgba(156,255,147,0.08)] backdrop-blur-xl"
          >
            <div
              role="button"
              tabIndex={0}
              aria-label="Drag note"
              onPointerDown={(event) => dragControls.start(event)}
              className="flex cursor-grab touch-none items-center justify-between gap-3 border-b border-white/[0.07] px-3 py-2 active:cursor-grabbing"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="material-symbols-outlined block text-[1rem] leading-none text-primary/80">
                  sticky_note_2
                </span>
                <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface">
                  Todo
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close note"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] text-on-surface-variant outline-none transition-colors hover:border-primary/25 hover:bg-primary/[0.07] hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <span className="material-symbols-outlined block text-[0.95rem] leading-none">
                  close
                </span>
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                addTask();
              }}
              className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2"
            >
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Add task..."
                aria-label="Add task"
                className="min-w-0 flex-1 bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/55"
              />
              <button
                type="submit"
                aria-label="Add task"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] text-primary outline-none transition-colors hover:border-primary/25 hover:bg-primary/[0.07] focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <span className="material-symbols-outlined block text-[0.95rem] leading-none">
                  add
                </span>
              </button>
            </form>

            <Reorder.Group
              axis="y"
              values={tasks}
              onReorder={setTasks}
              className="grid max-h-64 gap-1 overflow-y-auto px-2 py-2"
            >
              {tasks.map((task) => (
                <Reorder.Item
                  key={task.id}
                  value={task}
                  className="group flex cursor-grab items-center gap-2 rounded-[0.6rem] border border-white/[0.06] bg-white/[0.035] px-2 py-2 shadow-sm active:cursor-grabbing"
                >
                  <span className="material-symbols-outlined block text-[1rem] leading-none text-on-surface-variant/70">
                    drag_indicator
                  </span>

                  <button
                    type="button"
                    aria-pressed={task.done}
                    aria-label={task.done ? "Mark task undone" : "Mark task done"}
                    onClick={() => toggleTask(task.id)}
                    className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      task.done
                        ? "border-primary/35 bg-primary/20 text-primary"
                        : "border-white/[0.12] text-transparent hover:border-primary/30 hover:text-primary/70"
                    }`}
                  >
                    <span className="material-symbols-outlined block text-[0.9rem] leading-none">
                      check
                    </span>
                  </button>

                  <span
                    className={`min-w-0 flex-1 truncate text-sm transition-colors ${
                      task.done
                        ? "text-on-surface-variant line-through decoration-primary/70 decoration-2"
                        : "text-on-surface"
                    }`}
                  >
                    {task.text}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    aria-label="Remove task"
                    className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-on-surface-variant opacity-0 outline-none transition-opacity hover:bg-white/[0.06] hover:text-primary focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary/60 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined block text-[0.85rem] leading-none">
                      close
                    </span>
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </motion.aside>
        ) : (
          <motion.button
            key="counting-note-button"
            type="button"
            drag
            dragMomentum={false}
            whileDrag={reduceMotion ? undefined : { scale: 1.06 }}
            onDragStart={() => {
              draggedClosedButtonRef.current = true;
            }}
            onDragEnd={() => {
              window.setTimeout(() => {
                draggedClosedButtonRef.current = false;
              }, 0);
            }}
            onClick={() => {
              if (draggedClosedButtonRef.current) return;

              setOpen(true);
            }}
            aria-label="Open todo"
            style={{ x, y }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="pointer-events-auto absolute left-4 top-24 flex h-10 w-10 cursor-grab items-center justify-center rounded-full border border-white/[0.08] bg-black/35 text-on-surface-variant shadow-[0_10px_26px_rgba(0,0,0,0.24)] backdrop-blur-xl outline-none transition-colors hover:border-primary/25 hover:bg-primary/[0.07] hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/60 active:cursor-grabbing"
          >
            <span className="material-symbols-outlined block text-[1.05rem] leading-none">
              checklist
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
