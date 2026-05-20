import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterType } from "../fetchLib/authapi";
import { register } from "../features/auth/AuthSlice";
import { useAppDispatch } from "../hooks/dispatch";
import { toast } from "react-toastify";

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
    <div className="h-screen overflow-hidden flex flex-col md:flex-row pt-16">
      {/* Left — registration form */}
      <section className="w-full md:w-[45%] lg:w-[40%] flex items-center justify-center overflow-y-auto px-6 py-4 lg:px-12 bg-surface-dim">
        <div className="w-full max-w-sm space-y-4">
          {/* Header */}
          <header className={`space-y-2 ${reveal(100)}`}>
            <h1 className="text-3xl lg:text-[2.15rem] font-black font-headline tracking-tighter uppercase leading-[0.95] text-on-surface">
              COMMENCE YOUR <span className="text-primary">STUDY JOURNEY</span>
            </h1>
            <p className="text-on-surface-variant text-[11px] max-w-[88%] uppercase tracking-wide leading-relaxed">
              Initialize your performance profile to track peak cognitive
              output.
            </p>
          </header>

          {/* Form */}
          <form
            className={`space-y-3 ${reveal(200)}`}
            onSubmit={RegisterHandler}
          >
            {/* Firstname name */}
            <div className="space-y-1.5 group">
              <label className="block text-[10px] font-black font-headline tracking-[0.2em] text-outline uppercase group-focus-within:text-primary transition-colors">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                required
                value={registerData.firstName}
                onChange={handleRegisterChange}
                placeholder="FIRST_NAME"
                className="w-full bg-surface-container-lowest border-0 border-l-2 border-l-transparent focus:border-l-primary focus:outline-none focus:ring-0 text-on-surface placeholder:text-outline-variant font-headline text-sm py-3 px-4 transition-all duration-300"
              />
            </div>

            {/* LastName name */}
            <div className="space-y-1.5 group">
              <label className="block text-[10px] font-black font-headline tracking-[0.2em] text-outline uppercase group-focus-within:text-primary transition-colors">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                required
                value={registerData.lastName}
                onChange={handleRegisterChange}
                placeholder="LAST_NAME"
                className="w-full bg-surface-container-lowest border-0 border-l-2 border-l-transparent focus:border-l-primary focus:outline-none focus:ring-0 text-on-surface placeholder:text-outline-variant font-headline text-sm py-3 px-4 transition-all duration-300"
              />
            </div>
            {/* Email */}
            <div className="space-y-1.5 group">
              <label className="block text-[10px] font-black font-headline tracking-[0.2em] text-outline uppercase group-focus-within:text-primary transition-colors">
                Data Uplink
              </label>
              <input
                name="email"
                type="email"
                required
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="ACADEMIC_EMAIL@LAB.NET"
                className="w-full bg-surface-container-lowest border-0 border-l-2 border-l-transparent focus:border-l-primary focus:outline-none focus:ring-0 text-on-surface placeholder:text-outline-variant font-headline text-sm py-3 px-4 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5 group">
              <label className="block text-[10px] font-black font-headline tracking-[0.2em] text-outline uppercase group-focus-within:text-primary transition-colors">
                Security Protocol
              </label>
              <input
                name="password"
                type="password"
                required
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="••••••••••••"
                className="w-full bg-surface-container-lowest border-0 border-l-2 border-l-transparent focus:border-l-primary focus:outline-none focus:ring-0 text-on-surface placeholder:text-outline-variant font-headline text-sm py-3 px-4 transition-all duration-300"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5 group">
              <label className="block text-[10px] font-black font-headline tracking-[0.2em] text-outline uppercase group-focus-within:text-primary transition-colors">
                Confirm Security Protocol
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                placeholder="••••••••••••"
                className="w-full bg-surface-container-lowest border-0 border-l-2 border-l-transparent focus:border-l-primary focus:outline-none focus:ring-0 text-on-surface placeholder:text-outline-variant font-headline text-sm py-3 px-4 transition-all duration-300"
              />
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary font-black font-headline tracking-widest uppercase py-3.5 px-8 hover:bg-primary hover:shadow-[0_0_20px_rgba(0,252,64,0.25)] transition-all duration-200 active:scale-[0.98] neon-glow-sm"
              >
                ENTER THE FLOW STATE
              </button>
            </div>
          </form>

          {/* Footer link */}
          <footer
            className={`pt-3 border-t border-outline-variant/10 text-center ${reveal(300)}`}
          >
            <p className="text-xs tracking-[0.1em] text-on-surface-variant uppercase">
              Existing Node?{" "}
              <Link
                to="/login"
                className="text-primary font-black ml-2 hover:underline decoration-2 underline-offset-4 transition-all duration-200"
              >
                LOGIN INSTEAD
              </Link>
            </p>
          </footer>
        </div>
      </section>

      {/* Right — bold visual panel */}
      <section className="hidden md:flex w-full md:w-[55%] lg:w-[60%] bg-surface-container relative overflow-hidden">
        {/* Background image */}
        <img
          alt="Student focused at desk"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaxA6TWwvq3Rvu3SvPRWSVhHsw_07pPq-_DSjxzFiPi3vR6PTJg0dGdwmgnipMCHvikXrBJHsikzeVPJOoS6MugPvrXP3js98xI6PWEIj7tzpDi5QNNvu9PU746OYHdVMrbE2NVNi-Vhvdq5bRUTJ43BPBDTvWJznDN71HEzvGjThi_cj5HdTxmy_ggfKQAi8LfOyahZP3FV3rRgxPvrfiySYpTNywjzLJSiKAWpaHSwhF-o5dsWpYtlMl9fZxZPPf6N4QTWypapA"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2] contrast-125 z-0"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dim via-transparent to-transparent z-10" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full z-10" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
          style={{
            backgroundImage:
              "linear-gradient(#00fc40 1px, transparent 1px), linear-gradient(90deg, #00fc40 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end p-10 lg:p-16 space-y-6">
          <div className={`max-w-xl space-y-4 ${reveal(400)}`}>
            {/* Status badge */}
            <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-md px-4 py-1.5 border-l-4 border-primary">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_stories
              </span>
              <span className="text-[10px] font-black font-headline tracking-widest text-primary uppercase">
                STATUS: READY FOR SESSION
              </span>
            </div>

            {/* Big headline */}
            <h2 className="text-5xl lg:text-7xl font-black font-headline tracking-tighter uppercase leading-[0.9] text-on-surface">
              THE <br />
              <span className="text-primary-container">ARCHITECT</span> <br />
              OF FOCUS.
            </h2>

            {/* Stats row */}
            <div className={`flex gap-10 pt-4 ${reveal(500)}`}>
              {[
                { label: "RETENTION", value: "94.5%" },
                { label: "SESSION TIME", value: "4.2H" },
                { label: "DEEP WORK", value: "ACTIVE" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[10px] font-black font-headline tracking-widest text-outline uppercase mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl font-headline font-bold text-on-surface">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
