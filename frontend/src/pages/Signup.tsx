import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterType } from "../fetchLib/authapi";
import { register } from "../features/auth/AuthSlice";
import { useAppDispatch } from "../hooks/dispatch";
import { toast } from "react-toastify";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function Signup() {
  const [mounted, setMounted] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const appDispatch = useAppDispatch()
  const navigate = useNavigate();

  const RegisterHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast
      .promise(appDispatch(register(registerData)).unwrap(), {
        pending: "Creating account...",
        success: "Registration successful",
        error: {
          render({ data }) {
            return data instanceof Error ? data.message : "Registration failed";
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

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-[1180px] grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[1.02fr_0.98fr] md:px-6">
        <section className="flex min-h-0 items-center justify-center overflow-y-auto rounded-[1.35rem] border border-white/[0.08] bg-black/45 px-4 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35),0_0_40px_rgba(0,252,64,0.05)] backdrop-blur-xl sm:px-6 md:px-9">
          <div className="w-full max-w-[460px] space-y-5">
            <header className={`space-y-3 ${reveal(100)}`}>
              <div className="inline-flex items-center gap-2 rounded-[999px] border border-primary-fixed/20 bg-primary-fixed/10 px-3 py-1.5">
                <span className="material-symbols-outlined text-sm text-primary-fixed">
                  auto_stories
                </span>
                <span className="font-headline text-[10px] font-black uppercase tracking-[0.22em] text-primary-fixed">
                  New focus profile
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="font-headline text-3xl font-black uppercase leading-none tracking-normal text-on-surface sm:text-4xl">
                  Build your <span className="text-primary-fixed">study lab</span>
                </h1>
                <p className="max-w-md text-sm leading-6 text-on-surface-variant">
                  Initialize the profile that powers your sessions, notes, and
                  background focus setup.
                </p>
              </div>
            </header>

            <form className={`space-y-3.5 ${reveal(200)}`} onSubmit={RegisterHandler}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="group space-y-2">
                  <label className="block font-headline text-[10px] font-black uppercase tracking-[0.18em] text-outline transition-colors group-focus-within:text-primary-fixed">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    placeholder="FIRST_NAME"
                    className="w-full rounded-[1rem] border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 font-body text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-outline-variant hover:border-white/15 focus:border-primary-fixed/45 focus:bg-primary-fixed/[0.035] focus:shadow-[0_0_0_3px_rgba(0,252,64,0.10)]"
                  />
                </div>

                <div className="group space-y-2">
                  <label className="block font-headline text-[10px] font-black uppercase tracking-[0.18em] text-outline transition-colors group-focus-within:text-primary-fixed">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    placeholder="LAST_NAME"
                    className="w-full rounded-[1rem] border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 font-body text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-outline-variant hover:border-white/15 focus:border-primary-fixed/45 focus:bg-primary-fixed/[0.035] focus:shadow-[0_0_0_3px_rgba(0,252,64,0.10)]"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="block font-headline text-[10px] font-black uppercase tracking-[0.18em] text-outline transition-colors group-focus-within:text-primary-fixed">
                  Data Uplink
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="ACADEMIC_EMAIL@LAB.NET"
                  className="w-full rounded-[1rem] border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 font-body text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-outline-variant hover:border-white/15 focus:border-primary-fixed/45 focus:bg-primary-fixed/[0.035] focus:shadow-[0_0_0_3px_rgba(0,252,64,0.10)]"
                />
              </div>

              <div className="group space-y-2">
                <label className="block font-headline text-[10px] font-black uppercase tracking-[0.18em] text-outline transition-colors group-focus-within:text-primary-fixed">
                  Security Protocol
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="••••••••••••"
                  className="w-full rounded-[1rem] border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 font-body text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-outline-variant hover:border-white/15 focus:border-primary-fixed/45 focus:bg-primary-fixed/[0.035] focus:shadow-[0_0_0_3px_rgba(0,252,64,0.10)]"
                />
              </div>

              <div className="group space-y-2">
                <label className="block font-headline text-[10px] font-black uppercase tracking-[0.18em] text-outline transition-colors group-focus-within:text-primary-fixed">
                  Confirm Security Protocol
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="••••••••••••"
                  className="w-full rounded-[1rem] border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 font-body text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-outline-variant hover:border-white/15 focus:border-primary-fixed/45 focus:bg-primary-fixed/[0.035] focus:shadow-[0_0_0_3px_rgba(0,252,64,0.10)]"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full rounded-[999px] bg-primary-container px-6 py-4 font-headline text-[11px] font-black uppercase tracking-[0.18em] text-on-primary-container shadow-[0_0_24px_rgba(0,252,64,0.12)] transition-all duration-200 hover:bg-primary-fixed hover:shadow-[0_0_28px_rgba(0,252,64,0.24)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Enter the flow state
                </button>
              </div>
            </form>

            <div className={`space-y-4 pt-1 ${reveal(300)}`}>
              <div className="relative flex items-center">
                <div className="h-px flex-grow bg-outline-variant/25" />
                <span className="mx-4 shrink-0 font-headline text-[10px] uppercase tracking-[0.18em] text-outline">
                  Or sync via
                </span>
                <div className="h-px flex-grow bg-outline-variant/25" />
              </div>

              <GoogleAuthButton label="Sign up with Google" />
            </div>

            <footer
              className={`border-t border-outline-variant/20 pt-4 text-center ${reveal(400)}`}
            >
              <p className="text-xs uppercase tracking-[0.12em] text-on-surface-variant">
                Existing node?{" "}
                <Link
                  to="/login"
                  className="ml-2 font-black text-primary-fixed transition-colors hover:text-on-surface"
                >
                  Login instead
                </Link>
              </p>
            </footer>
          </div>
        </section>

        <section className="relative hidden overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-surface-container-low shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:block">
          <video
            src="/template/265816_medium.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,252,64,0.10)_1px,transparent_1px)] bg-[size:74px_74px] opacity-35" />

          <div className={`absolute inset-x-7 bottom-7 z-10 space-y-5 ${reveal(400)}`}>
            <div className="inline-flex items-center gap-2 rounded-[999px] border border-primary-fixed/25 bg-black/45 px-3 py-1.5 backdrop-blur-xl">
              <span className="material-symbols-outlined text-sm text-primary-fixed">
                radio_button_checked
              </span>
              <span className="font-headline text-[10px] font-black uppercase tracking-[0.18em] text-primary-fixed">
                Status: ready for session
              </span>
            </div>

            <h2 className="max-w-xl font-headline text-5xl font-black uppercase leading-[0.9] tracking-normal text-on-surface lg:text-6xl">
              The architect of <span className="text-primary-fixed">focus</span>
            </h2>

            <div className="grid max-w-lg grid-cols-3 gap-2">
              {[
                { label: "Retention", value: "94.5%" },
                { label: "Session", value: "4.2H" },
                { label: "Deep work", value: "Active" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[0.9rem] border border-white/[0.08] bg-black/35 px-3 py-3 backdrop-blur-xl"
                >
                  <p className="font-headline text-[9px] font-black uppercase tracking-[0.18em] text-outline">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-headline text-sm font-black uppercase text-on-surface">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
