"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { TopBar, Button, TextField } from "@/components/looma";
import { AnnotationCanvas } from "@/components/record/AnnotationCanvas";
import { BottomSheet } from "@/components/record/BottomSheet";
import { useRecordDraft } from "@/store/recordDraftContext";
import type { AnnotationDraft } from "@/types";

// 더미 이미지 URL (이미지 선택을 건너뛴 경우 fallback)
const FALLBACK_IMAGE = null;

export default function AnnotatePage() {
  const router = useRouter();
  const { draft, setAnnotations } = useRecordDraft();
  const [annotations, setLocalAnnotations] = useState<AnnotationDraft[]>(
    draft.annotations.length > 0 ? draft.annotations : []
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const imageUrl = draft.imagePreviewUrl ?? FALLBACK_IMAGE;

  const activeAnnotation = annotations.find((a) => a.id === activeId) ?? null;

  const handleCanvasClick = (xRatio: number, yRatio: number) => {
    const newAnn: AnnotationDraft = {
      id: `pin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      xRatio,
      yRatio,
      problem: "",
      solution: "",
    };
    const updated = [...annotations, newAnn];
    setLocalAnnotations(updated);
    setActiveId(newAnn.id);
    setSheetOpen(true);
  };

  const handlePinClick = (id: string) => {
    setActiveId(id);
    setSheetOpen(true);
  };

  const updateActiveAnnotation = (field: "problem" | "solution", value: string) => {
    setLocalAnnotations((prev) =>
      prev.map((a) => (a.id === activeId ? { ...a, [field]: value } : a))
    );
  };

  const handleComplete = () => {
    setAnnotations(annotations);
    router.push("/record/info");
  };

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar
        variant="center_title"
        title="주석 작성"
        rightLabel="완료"
        currentStep={1}
        totalSteps={3}
        onLeftAction={() => router.back()}
        onRightAction={handleComplete}
      />

      {/* 안내 텍스트 */}
      <p className="mt-4 px-4 text-center font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
        이미지 위를 탭해 주석 포인트를 추가하세요
      </p>

      {/* 이미지 + 핀 캔버스 */}
      <div className="mx-4 mt-3">
        <AnnotationCanvas
          imageUrl={imageUrl}
          annotations={annotations}
          activeId={activeId}
          onPinClick={handlePinClick}
          onCanvasClick={handleCanvasClick}
        />
      </div>

      {/* 핀 개수 표시 */}
      {annotations.length > 0 && (
        <p className="mt-2 text-center font-pretendard text-caption text-[var(--color-text-tertiary)]">
          {annotations.length}개의 포인트
        </p>
      )}

      {/* 바텀시트 */}
      <BottomSheet open={sheetOpen}>
        <div className="flex flex-col gap-4 px-4 pb-8">
          {activeAnnotation ? (
            <>
              <p className="font-pretendard text-body-sm text-[var(--color-text-secondary)]">
                포인트 {annotations.findIndex((a) => a.id === activeId) + 1}
              </p>

              <TextField
                label="문제 및 시도"
                placeholder="어떤 문제가 있었나요?"
                value={activeAnnotation.problem}
                onChange={(e) => updateActiveAnnotation("problem", e.target.value)}
              />

              <div className="h-px bg-[var(--color-border-subtle)]" />

              <TextField
                label="해결 과정"
                placeholder="어떻게 해결했나요?"
                value={activeAnnotation.solution}
                onChange={(e) => updateActiveAnnotation("solution", e.target.value)}
              />

              <Button
                variant="container"
                label="저장"
                onClick={() => setSheetOpen(false)}
                className="w-full justify-center"
              />
            </>
          ) : (
            <p className="py-4 text-center font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
              포인트를 선택하세요
            </p>
          )}
        </div>
      </BottomSheet>

      {/* 바텀시트 닫기 오버레이 */}
      {sheetOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setSheetOpen(false)} />}
    </div>
  );
}
