import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginType } from "../fetchLib/authapi";
import { login } from "../features/auth/AuthSlice";
import { useAppDispatch } from "../hooks/dispatch";
import { toast } from "react-toastify";

export default function Login() {
  const [mounted, setMounted] = useState(false);
  const [loginData, setLoginData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const LoginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast
      .promise(appDispatch(login(loginData)).unwrap(), {
        pending: "Logging in...",
        success: "Login successful",
        error: {
          render({ data }) {
            return data instanceof Error ? data.message : "Login failed";
          },
        },
      })
      .then(() => navigate("/dashboard"));
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delay: number) =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }` + ` delay-[${delay}ms]`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050806] pt-16 text-on-surface">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(229,255,222,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(229,255,222,0.025)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,6,0.88)_78%)]" />

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-[1180px] grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[0.95fr_1.05fr] md:px-6">
        <section className="relative hidden overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-surface-container-low shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:block">
          <video
            src="/template/270983.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,252,64,0.10)_1px,transparent_1px)] bg-[size:74px_74px] opacity-35" />

          <div className={`absolute inset-x-7 bottom-7 z-10 space-y-5 ${reveal(200)}`}>
            <div className="inline-flex items-center gap-2 rounded-[999px] border border-primary-fixed/25 bg-black/45 px-3 py-1.5 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-[999px] bg-primary-fixed shadow-[0_0_12px_rgba(0,252,64,0.9)]" />
              <span className="font-headline text-[10px] font-black uppercase tracking-[0.18em] text-primary-fixed">
                Focus channel online
              </span>
            </div>
            <div className="space-y-3">
              <h1 className="font-headline text-5xl font-black uppercase leading-[0.9] tracking-normal text-on-surface lg:text-6xl">
                Pulse of <span className="text-primary-fixed">focus</span>
              </h1>
              <p className="max-w-md text-sm font-medium leading-6 text-on-surface-variant">
                Return to your dashboard, your lofi station, and the tiny systems
                keeping study mode alive.
              </p>
            </div>
            <div className="grid max-w-md grid-cols-3 gap-2">
              {["Session", "Notes", "Sound"].map((label) => (
                <div
                  key={label}
                  className="rounded-[0.9rem] border border-white/[0.08] bg-black/35 px-3 py-3 backdrop-blur-xl"
                >
                  <p className="font-headline text-[9px] font-black uppercase tracking-[0.18em] text-outline">
                    {label}
                  </p>
                  <p className="mt-1 font-headline text-sm font-black uppercase text-on-surface">
                    Ready
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-0 items-center justify-center rounded-[1.35rem] border border-white/[0.08] bg-black/45 px-4 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35),0_0_40px_rgba(0,252,64,0.05)] backdrop-blur-xl sm:px-6 md:px-10">
          <div className="w-full max-w-[430px] space-y-6">
            <header className={`space-y-3 ${reveal(100)}`}>
              <div className="inline-flex items-center gap-2 rounded-[999px] border border-primary-fixed/20 bg-primary-fixed/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-[999px] bg-primary-fixed" />
                <span className="font-headline text-[10px] font-black uppercase tracking-[0.22em] text-primary-fixed">
                  Study Session Authorized
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-black uppercase leading-none tracking-normal text-on-surface sm:text-4xl">
                  Resume your session
                </h2>
                <p className="text-sm leading-6 text-on-surface-variant">
                  Sign back in and pick up right where your focus stack left off.
                </p>
              </div>
            </header>

            <form className={`space-y-5 ${reveal(200)}`} onSubmit={LoginHandler}>
              <div className="space-y-2">
                <label
                  htmlFor="identifier"
                  className="block font-headline text-[10px] font-black uppercase tracking-[0.18em] text-outline"
                >
                  Operative identifier
                </label>
                <div className="group relative">
                  <input
                    id="identifier"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="operative@kineticlab.sys"
                    className="w-full rounded-[1rem] border border-white/[0.08] bg-white/[0.035] px-4 py-4 font-body text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-outline-variant hover:border-white/15 focus:border-primary-fixed/45 focus:bg-primary-fixed/[0.035] focus:shadow-[0_0_0_3px_rgba(0,252,64,0.10)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="protocol"
                  className="block font-headline text-[10px] font-black uppercase tracking-[0.18em] text-outline"
                >
                  Focus protocol
                </label>
                <div className="group relative">
                  <input
                    id="protocol"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••••••"
                    className="w-full rounded-[1rem] border border-white/[0.08] bg-white/[0.035] px-4 py-4 font-body text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-outline-variant hover:border-white/15 focus:border-primary-fixed/45 focus:bg-primary-fixed/[0.035] focus:shadow-[0_0_0_3px_rgba(0,252,64,0.10)]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="group flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-outline-variant bg-surface-container-lowest text-primary accent-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed/40 focus:ring-offset-0"
                  />
                  <span className="font-headline text-[10px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors group-hover:text-primary-fixed">
                    Retain session
                  </span>
                </label>
                <a
                  href="#"
                  className="font-headline text-[10px] uppercase tracking-[0.16em] text-outline underline decoration-white/20 underline-offset-4 transition-colors hover:text-primary-fixed hover:decoration-primary-fixed/60"
                >
                  Recover key?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-[999px] bg-primary-container px-6 py-4 font-headline text-[11px] font-black uppercase tracking-[0.18em] text-on-primary-container shadow-[0_0_24px_rgba(0,252,64,0.12)] transition-all duration-200 hover:bg-primary-fixed hover:shadow-[0_0_28px_rgba(0,252,64,0.24)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Access focus data
              </button>
            </form>

            <footer className={`space-y-4 pt-1 ${reveal(300)}`}>
              <div className="relative flex items-center">
                <div className="h-px flex-grow bg-outline-variant/25" />
                <span className="mx-4 shrink-0 font-headline text-[10px] uppercase tracking-[0.18em] text-outline">
                  Or sync via
                </span>
                <div className="h-px flex-grow bg-outline-variant/25" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2.5 rounded-[999px] border border-white/[0.08] bg-white/[0.035] py-3 font-headline text-[10px] uppercase tracking-[0.12em] text-on-surface transition-all duration-200 hover:border-primary-fixed/30 hover:bg-primary-fixed/10 hover:text-primary-fixed">
                  <span className="material-symbols-outlined text-sm">
                    terminal
                  </span>
                  Kinetic.sys
                </button>
                <button className="flex items-center justify-center gap-2.5 rounded-[999px] border border-white/[0.08] bg-white/[0.035] py-3 font-headline text-[10px] uppercase tracking-[0.12em] text-on-surface transition-all duration-200 hover:border-primary-fixed/30 hover:bg-primary-fixed/10 hover:text-primary-fixed">
                  <span className="material-symbols-outlined text-sm">
                    token
                  </span>
                  Focus.link
                </button>
              </div>

              <p className="text-center font-body text-xs uppercase tracking-[0.12em] text-on-surface-variant">
                New researcher?{" "}
                <Link
                  to="/register"
                  className="ml-2 font-bold text-primary-fixed transition-colors hover:text-on-surface"
                >
                  Initialize profile
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
