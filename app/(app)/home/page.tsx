"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Image, FileText } from "lucide-react";
import { TopBar } from "@/components/looma";
import { RecordTypeCard } from "@/components/home/RecordTypeCard";

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
  return `${days[now.getDay()]}day · ${months[now.getMonth()]} ${now.getDate()}`;
}

function HomeContent() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar variant="text+icon_btn" title={getTodayLabel()} />

      <div className="flex flex-col gap-4 px-4 pb-4 pt-8">
        <div className="mb-2 flex flex-col gap-2">
          <h2 className="font-pretendard text-heading-sm text-[var(--color-text-primary)]">
            오늘의 기록
          </h2>
          <p className="font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
            어떤 방식으로 기록할까요?
          </p>
        </div>

        <RecordTypeCard
          icon={Image}
          title="이미지 기반 기록"
          description="이미지 위에 포인트를 찍어 주석을 달아요"
          onClick={() => router.push("/record/image")}
        />

        <RecordTypeCard
          icon={FileText}
          title="텍스트 기반 기록"
          description="이미지 없이 텍스트로 문제를 기록해요"
          onClick={() => router.push("/record/info?type=text")}
        />
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
