"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Image, FileText } from "lucide-react";
import { TopBar } from "@/components/looma";

function getTodayLabel() {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return `${days[now.getDay()]}s Day · ${months[now.getMonth()]} ${now.getDate()}`;
}

const recordTypeCardSurfaceStyle = {
  background:
    "var(--gradient-background-diagonal, linear-gradient(319deg, rgba(26, 26, 26, 0.40) 11.63%, rgba(56, 56, 56, 0.40) 98.06%))",
  // 외부 그림자 + 유리 상단 림(플랫 배경에서도 글래스가 읽히도록)
  boxShadow: "0 4px 20px 0 rgba(45, 45, 45, 0.40), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
  WebkitBackdropFilter: "blur(24px) saturate(1.35)",
  backdropFilter: "blur(24px) saturate(1.35)",
} as const;

const recordTypeCardButtonClass =
  "relative z-10 flex h-[166px] w-[166px] flex-col justify-between rounded-[32px] border border-[rgba(255,255,255,0.08)] p-4 text-left transition-[transform,opacity] duration-300 ease-out hover:-translate-y-2 motion-reduce:hover:translate-y-0 active:translate-y-0 active:opacity-70";

function HomeContent() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar variant="text+icon_btn" title={getTodayLabel()} />

      {/* 중앙 콘텐츠 */}
      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-4 pb-24">
        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-pretendard text-display-lg text-[var(--color-text-primary)]">
            Looma
          </h1>
          <p className="font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
            업무 노하우를 시각적 자산으로 남겨보세요.
          </p>
        </div>

        {/* 기록 유형 카드 — 뒤쪽 대비 레이어가 있어야 단색 배경에서도 backdrop 블러가 보임 */}
        <div className="relative isolate flex gap-[10px] py-6">
          {/* <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[232px] w-[384px] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute inset-0 rounded-[52px] bg-[radial-gradient(ellipse_78%_72%_at_50%_48%,rgba(145,205,255,0.22)_0%,rgba(26,26,26,0)_68%)]" />
            <div className="absolute bottom-[14%] left-[10%] size-[128px] rounded-full bg-[rgba(255,255,255,0.085)]" />
            <div className="absolute right-[12%] top-[16%] size-[104px] rounded-full bg-[rgba(145,205,255,0.16)]" />
          </div> */}
          {/* 이미지 기록 */}
          <button
            onClick={() => router.push("/record/image")}
            className={recordTypeCardButtonClass}
            style={recordTypeCardSurfaceStyle}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-primary)]">
              <Image size={24} strokeWidth={1.5} className="text-[var(--color-text-primary)]" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-pretendard text-body-md text-[var(--color-text-primary)]">
                이미지 기록
              </p>
              <p className="font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
                스크린샷에 주석 달기
              </p>
            </div>
          </button>

          {/* 텍스트 기록 */}
          <button
            onClick={() => router.push("/record/info?type=text")}
            className={recordTypeCardButtonClass}
            style={recordTypeCardSurfaceStyle}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-primary)]">
              <FileText size={24} strokeWidth={1.5} className="text-[var(--color-text-primary)]" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-pretendard text-body-md text-[var(--color-text-primary)]">
                텍스트 기록
              </p>
              <p className="font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
                빠르게 글로 남기기
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
