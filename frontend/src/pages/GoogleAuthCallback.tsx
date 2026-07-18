import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginWithGoogleCode } from "../features/auth/AuthSlice";
import { useAppDispatch } from "../hooks/dispatch";

export default function GoogleAuthCallback() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const started = useRef(false);
  const callback = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const providerError = params.get("error");
    const code = params.get("code");
    return {
      code,
      initialError: providerError
        ? "Google authentication was cancelled or could not be completed."
        : code
          ? null
          : "The Google login response did not include a valid code.",
    };
  }, [location.search]);
  const [error, setError] = useState<string | null>(callback.initialError);

  useEffect(() => {
    if (started.current) {
      return;
    }
    started.current = true;

    if (callback.initialError || !callback.code) return;

    toast
      .promise(dispatch(loginWithGoogleCode(callback.code)).unwrap(), {
        pending: "Completing Google login...",
        success: "Google login successful",
        error: {
          render({ data }) {
            return data instanceof Error ? data.message : "Google login failed";
          },
        },
      })
      .then(() => navigate("/dashboard", { replace: true }))
      .catch((reason: unknown) => {
        setError(
          reason instanceof Error
            ? reason.message
            : "Google login could not be completed.",
        );
      });
  }, [callback, dispatch, navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050806] px-4 pt-16 text-on-surface">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(229,255,222,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(229,255,222,0.025)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,252,64,0.06),transparent_56%)]" />

      <section className="relative w-full max-w-md rounded-[1.35rem] border border-white/[0.08] bg-black/55 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.4),0_0_40px_rgba(0,252,64,0.05)] backdrop-blur-xl">
        {error ? (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-red-400/30 bg-red-400/10 text-red-300">
              <span className="material-symbols-outlined">error</span>
            </div>
            <h1 className="mt-5 font-headline text-2xl font-black uppercase text-on-surface">
              Sync interrupted
            </h1>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              {error}
            </p>
            <Link
              to="/login"
              replace
              className="mt-6 inline-flex rounded-full bg-primary-container px-6 py-3 font-headline text-[10px] font-black uppercase tracking-[0.16em] text-on-primary-container transition-colors hover:bg-primary-fixed"
            >
              Return to login
            </Link>
          </>
        ) : (
          <>
            <div className="relative mx-auto h-12 w-12">
              <div className="absolute inset-0 rounded-full border border-primary-fixed/35 motion-safe:animate-ping" />
              <div className="absolute inset-1 rounded-full border-2 border-primary-fixed/20 border-t-primary-fixed motion-safe:animate-spin" />
            </div>
            <h1 className="mt-5 font-headline text-2xl font-black uppercase text-on-surface">
              Synchronizing profile
            </h1>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              Verifying your Google identity and opening the focus channel.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
