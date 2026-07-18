import { API_ORIGIN } from "../fetchLib/fetch";

type GoogleAuthButtonProps = {
  label: string;
};

const GOOGLE_AUTH_URL = `${API_ORIGIN}/oauth2/authorization/google`;

export default function GoogleAuthButton({ label }: GoogleAuthButtonProps) {
  const beginGoogleLogin = () => {
    window.location.assign(GOOGLE_AUTH_URL);
  };

  return (
    <button
      type="button"
      onClick={beginGoogleLogin}
      className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-[999px] border border-white/[0.1] bg-white/[0.04] px-6 py-3.5 font-headline text-[10px] font-black uppercase tracking-[0.14em] text-on-surface transition-all duration-200 hover:border-white/20 hover:bg-white/[0.075] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285f4] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label={label}
    >
      <span className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-[#4285f4]/70 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <svg
        aria-hidden="true"
        viewBox="0 0 18 18"
        className="h-[18px] w-[18px] shrink-0"
      >
        <path
          fill="#4285F4"
          d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.715v2.258h2.909c1.702-1.567 2.684-3.875 2.684-6.614Z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.468-.806 5.956-2.181l-2.909-2.258c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z"
        />
        <path
          fill="#FBBC05"
          d="M3.963 10.706A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.168.281-1.706V4.962H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.038l3.007-2.332Z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.321 0 2.507.454 3.441 1.346l2.581-2.581C13.464.892 11.426 0 9 0A9 9 0 0 0 .956 4.962l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58Z"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}
