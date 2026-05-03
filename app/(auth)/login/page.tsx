"use client";

import { createClient } from "@/lib/supabase/client";
import { Tag } from "@/components/looma";

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[375px] flex-col items-center justify-between bg-[var(--color-bg-primary)] px-8 py-16">
      {/* 상단: 브랜딩 */}
      <div className="flex w-full flex-col items-start gap-3 pt-16">
        <h1 className="font-pretendard text-display-lg leading-tight tracking-tight text-[var(--color-component-primary)]">
          Looma
        </h1>
        <p className="font-pretendard text-body-md text-[var(--color-text-tertiary)]">
          Quick and simple record keeping
        </p>
        <Tag label="Problem Solver" size="sm" />
      </div>

      {/* 하단: 로그인 버튼 */}
      <div className="flex w-full flex-col gap-4">
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] py-4 font-pretendard text-body-md text-[var(--color-text-primary)] transition-opacity active:opacity-70"
        >
          {/* Google G 로고 */}
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Log in with Google
        </button>
      </div>
    </div>
  );
}
