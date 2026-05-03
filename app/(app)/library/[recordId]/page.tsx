"use client";

import { useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { TopBar, Tag } from "@/components/looma";
import { AnnotationCanvas } from "@/components/record/AnnotationCanvas";
import { BottomSheet } from "@/components/record/BottomSheet";
import type { AnnotationDraft } from "@/types";
import type { DummyRecord } from "@/components/library/RecordCard";

// 더미 기록 데이터 (라이브러리 페이지와 동일)
const DUMMY_RECORDS: (DummyRecord & { description?: string })[] = [
  {
    id: "1",
    title: "아이콘 시각화 문제 해결",
    date: "APR 23",
    tags: ["UI/UX", "디자인"],
    imageUrl: null,
    color: "#2c3e50",
    description: "아이콘의 시각적 무게감을 맞추기 위한 실험 기록",
  },
  {
    id: "2",
    title: "내비게이션 플로우 개선",
    date: "APR 21",
    tags: ["기획"],
    imageUrl: null,
    color: "#8e44ad",
    description: "사용자 경로 단축을 위한 플로우 재설계",
  },
  {
    id: "3",
    title: "컴포넌트 반응형 처리",
    date: "APR 19",
    tags: ["개발", "UI/UX"],
    imageUrl: null,
    color: "#2980b9",
    description: "모바일/데스크탑 브레이크포인트 조정",
  },
  {
    id: "4",
    title: "사용자 인터뷰 인사이트 정리",
    date: "APR 17",
    tags: ["리서치"],
    imageUrl: null,
    color: "#16a085",
    description: "5명 인터뷰에서 도출된 주요 패턴",
  },
  {
    id: "5",
    title: "타이포그래피 토큰 적용",
    date: "APR 15",
    tags: ["디자인"],
    imageUrl: null,
    color: "#f39c12",
    description: "Pretendard 폰트 스케일 통일",
  },
  {
    id: "6",
    title: "API 에러 핸들링 패턴",
    date: "APR 12",
    tags: ["개발"],
    imageUrl: null,
    color: "#d35400",
    description: "공통 에러 처리 레이어 설계",
  },
  {
    id: "7",
    title: "온보딩 플로우 설계",
    date: "APR 10",
    tags: ["기획", "UI/UX"],
    imageUrl: null,
    color: "#c0392b",
    description: "첫 사용자 경험 개선을 위한 스텝 구성",
  },
  {
    id: "8",
    title: "성능 최적화 실험 기록",
    date: "APR 08",
    tags: ["개발", "리서치"],
    imageUrl: null,
    color: "#27ae60",
    description: "번들 사이즈 최적화 과정 기록",
  },
];

const DUMMY_ANNOTATIONS: AnnotationDraft[] = [
  {
    id: "a1",
    xRatio: 0.3,
    yRatio: 0.35,
    name: "아이콘 불균형",
    problem: "아이콘 크기가 텍스트와 맞지 않아 시각적 불균형이 생김",
    solution: "8px 기준 그리드로 아이콘 크기를 조정하고 stroke-width를 1.5로 통일",
  },
  {
    id: "a2",
    xRatio: 0.7,
    yRatio: 0.6,
    name: "색상 대비 문제",
    problem: "색상 대비가 낮아 가독성 문제 발생",
    solution: "WCAG AA 기준 4.5:1 이상의 대비율로 팔레트 재정의",
  },
];

function RecordDetail() {
  const { recordId } = useParams<{ recordId: string }>();
  const router = useRouter();
  const record = DUMMY_RECORDS.find((r) => r.id === recordId) ?? DUMMY_RECORDS[0];

  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handlePinClick = (id: string) => {
    setActiveId(id);
    setSheetOpen(true);
  };

  const activeAnnotation = DUMMY_ANNOTATIONS.find((a) => a.id === activeId);
  const activeIndex = DUMMY_ANNOTATIONS.findIndex((a) => a.id === activeId);

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar
        variant="center_title"
        title={record.title}
        rightLabel="편집"
        totalSteps={0}
        onLeftAction={() => router.back()}
        onRightAction={() => {}}
      />

      <div className="flex flex-col gap-4 px-4 pb-32 pt-4 sm:px-8 md:px-12">
        {/* 이미지 + 핀 */}
        <AnnotationCanvas
          imageUrl={record.imageUrl}
          annotations={DUMMY_ANNOTATIONS}
          activeId={activeId}
          onPinClick={handlePinClick}
          readOnly
        />

        {/* 기록 정보 */}
        <div className="flex flex-col gap-2">
          <p className="font-pretendard text-caption text-[var(--color-text-disabled)]">
            {record.date}
          </p>
          <h2 className="font-pretendard text-heading-sm text-[var(--color-text-primary)]">
            {record.title}
          </h2>
          {record.description && (
            <p className="font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
              {record.description}
            </p>
          )}
          <div className="mt-1 flex flex-wrap gap-1">
            {record.tags.map((tag) => (
              <Tag key={tag} label={tag} size="sm" />
            ))}
          </div>
        </div>

        {/* 주석 목록 */}
        <div className="mt-2 flex flex-col gap-3">
          <p className="font-pretendard text-body-sm text-[var(--color-text-secondary)]">
            주석 목록
          </p>
          {DUMMY_ANNOTATIONS.map((ann, i) => (
            <button
              key={ann.id}
              onClick={() => handlePinClick(ann.id)}
              className="flex gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-4 text-left transition-opacity active:opacity-70"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-component-primary)] font-pretendard text-caption text-[var(--color-bg-primary)]">
                {i + 1}
              </span>
              <p className="line-clamp-2 font-pretendard text-body-sm text-[var(--color-text-secondary)]">
                {ann.problem}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 주석 상세 바텀시트 */}
      <BottomSheet open={sheetOpen}>
        {activeAnnotation && (
          <div className="flex flex-col gap-4 px-4 pb-8">
            <p className="font-pretendard text-body-sm text-[var(--color-component-primary)]">
              포인트 {activeIndex + 1}
            </p>
            <div className="flex flex-col gap-2">
              <p className="font-pretendard text-caption text-[var(--color-text-tertiary)]">
                문제 및 시도
              </p>
              <p className="font-pretendard text-body-sm text-[var(--color-text-secondary)]">
                {activeAnnotation.problem}
              </p>
            </div>
            <div className="h-px bg-[var(--color-border-subtle)]" />
            <div className="flex flex-col gap-2">
              <p className="font-pretendard text-caption text-[var(--color-text-tertiary)]">
                해결 과정
              </p>
              <p className="font-pretendard text-body-sm text-[var(--color-text-secondary)]">
                {activeAnnotation.solution}
              </p>
            </div>
          </div>
        )}
      </BottomSheet>

      {sheetOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setSheetOpen(false)} />}
    </div>
  );
}

export default function RecordDetailPage() {
  return (
    <Suspense>
      <RecordDetail />
    </Suspense>
  );
}
