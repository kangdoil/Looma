"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { TopBar, Button } from "@/components/looma";
import { AnnotationCanvas } from "@/components/record/AnnotationCanvas";
import { BottomSheet } from "@/components/record/BottomSheet";
import { useRecordDraft } from "@/store/recordDraftContext";
import type { AnnotationDraft } from "@/types";

export default function AnnotatePage() {
  const router = useRouter();
  const { draft, setAnnotations } = useRecordDraft();
  const [annotations, setLocalAnnotations] = useState<AnnotationDraft[]>(
    draft.annotations.length > 0 ? draft.annotations : []
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const imageUrl = draft.imagePreviewUrl ?? null;
  const activeAnnotation = annotations.find((a) => a.id === activeId) ?? null;

  const handleCanvasClick = (xRatio: number, yRatio: number) => {
    const newAnn: AnnotationDraft = {
      id: `pin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      xRatio,
      yRatio,
      name: "",
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

  const handleDeletePin = (id: string) => {
    const updated = annotations.filter((a) => a.id !== id);
    setLocalAnnotations(updated);
    if (activeId === id) {
      setActiveId(null);
      setSheetOpen(false);
    }
  };

  const handlePinMove = (id: string, xRatio: number, yRatio: number) => {
    setLocalAnnotations((prev) => prev.map((a) => (a.id === id ? { ...a, xRatio, yRatio } : a)));
  };

  const updateActive = (field: keyof AnnotationDraft, value: string) => {
    setLocalAnnotations((prev) =>
      prev.map((a) => (a.id === activeId ? { ...a, [field]: value } : a))
    );
  };

  const handleComplete = (type?: "next" | "complete") => {
    setAnnotations(annotations);
    setSheetOpen(false);
    if (type === "next") router.push("/record/info");
  };

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar
        className="relative z-[45]"
        variant="center_title"
        title="태그 기록"
        rightLabel="다음"
        currentStep={1}
        totalSteps={3}
        onLeftAction={() => router.back()}
        onRightAction={() => handleComplete("next")}
      />

      {/* 이미지 + 핀 캔버스 — z-index를 시트보다 낮게 유지 */}
      <div className="relative z-0 mx-4 mt-4 sm:mx-8 md:mx-12">
        <AnnotationCanvas
          imageUrl={imageUrl}
          annotations={annotations}
          activeId={activeId}
          onPinClick={handlePinClick}
          onCanvasClick={handleCanvasClick}
          onDeletePin={handleDeletePin}
          onPinMove={handlePinMove}
        />
      </div>

      {/* 바텀시트 */}
      <BottomSheet open={sheetOpen}>
        <div className="flex flex-col pb-8">
          {activeAnnotation ? (
            <>
              {/* 포인트 이름 입력 */}
              <div className="flex items-center gap-2 px-4 py-2">
                {/* 노란 포인트 아이콘 */}
                <div className="flex size-[22px] shrink-0 items-center justify-center rounded-[11px] border-[0.5px] border-[#efedcb] bg-[#fffa9f] p-[3px]">
                  <Plus size={14} strokeWidth={2.5} className="text-[#1a1a1a]" />
                </div>
                {/* 이름 입력 필드 */}
                <input
                  type="text"
                  placeholder="태그 이름을 입력하세요"
                  value={activeAnnotation.name}
                  onChange={(e) => updateActive("name", e.target.value)}
                  className="flex-1 rounded-[var(--radius-sm)] border-[0.5px] border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3 font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-component-primary)]"
                />
              </div>

              {/* 구분선 */}
              <div className="mx-0 h-px bg-[var(--color-bg-card)]" />

              {/* 문제 및 시도 + 결과 */}
              <div className="flex flex-col gap-3 px-4 pt-6">
                {/* 문제 및 시도 */}
                <div className="flex flex-col gap-2">
                  <label className="font-pretendard text-body-sm text-[var(--color-text-primary)]">
                    문제 및 시도
                  </label>
                  <textarea
                    placeholder="문제를 해결하기 위한 과정을 작성해주세요"
                    value={activeAnnotation.problem}
                    onChange={(e) => updateActive("problem", e.target.value)}
                    rows={3}
                    className="resize-none rounded-[var(--radius-sm)] border-[0.5px] border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3 font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-component-primary)]"
                  />
                </div>

                {/* 결과 */}
                <div className="flex flex-col gap-2">
                  <label className="font-pretendard text-body-sm text-[var(--color-text-primary)]">
                    결과
                  </label>
                  <textarea
                    placeholder="결과를 작성해주세요"
                    value={activeAnnotation.solution}
                    onChange={(e) => updateActive("solution", e.target.value)}
                    rows={3}
                    className="resize-none rounded-[var(--radius-sm)] border-[0.5px] border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3 font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-component-primary)]"
                  />
                </div>

                {/* 기록 완료 버튼 */}
                <div className="mt-2 flex justify-center">
                  <Button
                    variant="container"
                    label="기록 완료"
                    disabled={annotations.length === 0}
                    onClick={() => handleComplete("complete")}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="py-6 text-center font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
              포인트를 선택하세요
            </p>
          )}
        </div>
      </BottomSheet>

      {/* 바텀 시트 배경 탭 영역 — 캔버스·핀(z-0)보다 위, 시트(z-50)보다 아래 */}
      {sheetOpen && (
        <div
          role="presentation"
          className="bg-[var(--color-bg-primary)]/40 fixed inset-0 z-40"
          onClick={() => setSheetOpen(false)}
        />
      )}
    </div>
  );
}
