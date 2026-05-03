"use client";

import { useState, Suspense, useRef, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Plus } from "lucide-react";
import { TopBar, Chip } from "@/components/looma";
import { AnnotationCanvas } from "@/components/record/AnnotationCanvas";
import { BottomSheet } from "@/components/record/BottomSheet";
import { useRecordDraft } from "@/store/recordDraftContext";
import type { AnnotationDraft } from "@/types";

const DEFAULT_TAGS = [
  { id: "t1", name: "figma" },
  { id: "t2", name: "AI" },
  { id: "t3", name: "UIUX" },
  { id: "t4", name: "Icon" },
  { id: "t5", name: "기획" },
  { id: "t6", name: "개발" },
  { id: "t7", name: "리서치" },
];

function InfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTextType = searchParams.get("type") === "text";
  const { draft, setTitle, setDescription, setTagIds, setAnnotations, resetDraft } =
    useRecordDraft();

  // 어노테이션 (정보 입력 화면에서 핀 삭제 가능)
  const [annotations, setLocalAnnotations] = useState<AnnotationDraft[]>(draft.annotations);
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);

  // 태그
  const [tags, setTags] = useState(DEFAULT_TAGS);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(draft.tagIds);
  const [tagSheetOpen, setTagSheetOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");

  // 제목 / 설명
  const [title, setLocalTitle] = useState(draft.title);
  const [description, setLocalDescription] = useState(draft.description);
  const [saving, setSaving] = useState(false);

  // 칩 캐러셀 드래그 스크롤
  const chipScrollRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false); // 실제로 스와이프됐는지 (클릭 방지용)

  const onChipPointerDown = useCallback((e: React.PointerEvent) => {
    const el = chipScrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragScrollLeftRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }, []);

  const onChipPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const el = chipScrollRef.current;
    if (!el) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4) didDragRef.current = true;
    el.scrollLeft = dragScrollLeftRef.current - delta;
  }, []);

  const onChipPointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // --- 핸들러 ---

  const handlePinClick = (id: string) => {
    setActiveAnnotationId((prev) => (prev === id ? null : id));
  };

  const handleDeletePin = (id: string) => {
    const updated = annotations.filter((a) => a.id !== id);
    setLocalAnnotations(updated);
    setAnnotations(updated);
    if (activeAnnotationId === id) setActiveAnnotationId(null);
  };

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) => {
      const isSelected = prev.includes(id);
      if (!isSelected) {
        // 선택 시 캐러셀 맨 앞으로 스크롤
        requestAnimationFrame(() => {
          if (chipScrollRef.current) chipScrollRef.current.scrollLeft = 0;
        });
      }
      return isSelected ? prev.filter((t) => t !== id) : [...prev, id];
    });
  };

  // 선택된 칩 항상 앞, 미선택은 뒤
  const sortedTags = useMemo(
    () => [
      ...tags.filter((t) => selectedTagIds.includes(t.id)),
      ...tags.filter((t) => !selectedTagIds.includes(t.id)),
    ],
    [tags, selectedTagIds]
  );

  const handleAddTag = () => {
    const name = newTagInput.trim();
    if (!name) return;
    const exists = tags.find((t) => t.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      if (!selectedTagIds.includes(exists.id)) {
        setSelectedTagIds((prev) => [...prev, exists.id]);
      }
    } else {
      const newId = `custom-${Date.now()}`;
      setTags((prev) => [...prev, { id: newId, name }]);
      setSelectedTagIds((prev) => [...prev, newId]);
    }
    setNewTagInput("");
    setTagSheetOpen(false);
    // sortedTags가 선택된 것을 앞으로 → 캐러셀 맨 앞으로 스크롤
    requestAnimationFrame(() => {
      if (chipScrollRef.current) chipScrollRef.current.scrollLeft = 0;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setTitle(title);
    setDescription(description);
    setTagIds(selectedTagIds);
    await new Promise((r) => setTimeout(r, 300));
    resetDraft();
    router.push("/home");
  };

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar
        variant="center_title"
        title="정보 입력"
        rightLabel="완료"
        currentStep={2}
        totalSteps={3}
        onLeftAction={() => router.back()}
        onRightAction={handleSave}
      />

      {/* 스크롤 콘텐츠 */}
      <div className="no-scrollbar flex flex-col overflow-y-auto pb-24">
        {/* 이미지 / 텍스트 영역 */}
        {!isTextType ? (
          <div className="mx-4 mt-4 sm:mx-8 md:mx-12">
            <AnnotationCanvas
              imageUrl={draft.imagePreviewUrl}
              annotations={annotations}
              activeId={activeAnnotationId}
              onPinClick={handlePinClick}
              onDeletePin={handleDeletePin}
              onCanvasClick={() => setActiveAnnotationId(null)}
            />
          </div>
        ) : (
          <div className="mx-4 mt-4 sm:mx-8 md:mx-12">
            <textarea
              placeholder="문제와 해결 과정을 자유롭게 작성하세요"
              value={description}
              onChange={(e) => setLocalDescription(e.target.value)}
              rows={6}
              className="w-full resize-none rounded-[var(--radius-md)] border-[0.5px] border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3 font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-component-primary)]"
            />
          </div>
        )}

        {/* 태그 바 — Tag 버튼 + 구분선 + 칩 캐러셀 */}
        <div className="mt-3 flex items-center gap-0 border-b border-[var(--color-border-subtle)] pb-3">
          {/* Tag 버튼 */}
          <div className="shrink-0 pl-4 sm:pl-8 md:pl-12">
            <button
              onClick={() => setTagSheetOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-component-primary)] bg-[var(--color-bg-surface)] px-4 py-2 font-pretendard text-body-sm text-[var(--color-component-primary)] transition-opacity active:opacity-70"
            >
              <Search size={14} strokeWidth={1.5} />
              <span>Tag</span>
            </button>
          </div>

          {/* 수직 구분선 */}
          <div className="mx-3 h-6 w-px shrink-0 bg-[var(--color-border-default)]" />

          {/* 칩 캐러셀 (드래그 스와이프) */}
          <div
            ref={chipScrollRef}
            className="no-scrollbar flex cursor-grab gap-2 overflow-x-auto pr-4 active:cursor-grabbing"
            style={{ userSelect: "none", touchAction: "pan-x" }}
            onPointerDown={onChipPointerDown}
            onPointerMove={onChipPointerMove}
            onPointerUp={onChipPointerUp}
            onPointerCancel={onChipPointerUp}
          >
            {sortedTags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                selected={selectedTagIds.includes(tag.id)}
                onClick={() => {
                  if (!didDragRef.current) toggleTag(tag.id);
                }}
              />
            ))}
          </div>
        </div>

        {/* 제목 입력 */}
        <div className="mx-4 mt-5 sm:mx-8 md:mx-12">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setLocalTitle(e.target.value)}
            className="w-full rounded-[var(--radius-sm)] border-[0.5px] border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3 font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-component-primary)]"
          />
        </div>

        {/* 인사이트 기록 (Optional) */}
        <div className="mx-4 mt-3 sm:mx-8 md:mx-12">
          <div className="mb-2 flex items-center gap-1">
            <span className="font-pretendard text-body-sm text-[var(--color-component-primary)]">
              인사이트 기록
            </span>
            <span className="font-pretendard text-caption text-[var(--color-text-disabled)]">
              (Option)
            </span>
          </div>
          <textarea
            placeholder="배운 점이나 인사이트를 남겨보세요"
            value={isTextType ? "" : description}
            onChange={(e) => setLocalDescription(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-[var(--radius-sm)] border-[0.5px] border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3 font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-component-primary)]"
          />
        </div>
      </div>

      {/* 저장 버튼 (하단 고정) */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-[375px] -translate-x-1/2 bg-[var(--color-bg-primary)] px-4 pb-8 pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center rounded-full px-12 py-4 font-pretendard text-body-md text-white shadow-btn-container transition-opacity disabled:opacity-50"
          style={{
            backgroundImage: "linear-gradient(-2.08deg, #abd9ff 4.12%, #61b7ff 94.99%)",
          }}
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>

      {/* 태그 추가 바텀시트 */}
      <BottomSheet open={tagSheetOpen}>
        <div className="flex flex-col gap-4 px-4 pb-10 pt-2">
          <p className="font-pretendard text-body-md text-[var(--color-text-primary)]">태그 추가</p>

          {/* 입력 필드 */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="새 태그 이름을 입력하세요"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              autoFocus
              className="flex-1 rounded-[var(--radius-sm)] border-[0.5px] border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3 font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-component-primary)]"
            />
            <button
              onClick={handleAddTag}
              className="flex size-11 items-center justify-center rounded-full bg-[var(--color-component-primary)] text-[var(--color-bg-primary)] transition-opacity active:opacity-70"
            >
              <Plus size={18} strokeWidth={2} />
            </button>
          </div>

          {/* 기존 태그 목록 (선택된 것 앞) */}
          <div className="flex flex-wrap gap-2">
            {sortedTags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                selected={selectedTagIds.includes(tag.id)}
                onClick={() => toggleTag(tag.id)}
              />
            ))}
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => setTagSheetOpen(false)}
            className="flex items-center justify-center gap-2 font-pretendard text-body-sm text-[var(--color-text-tertiary)]"
          >
            <X size={14} />
            닫기
          </button>
        </div>
      </BottomSheet>

      {/* 태그 바텀시트 배경 */}
      {tagSheetOpen && (
        <div
          className="bg-[var(--color-bg-primary)]/40 fixed inset-0 z-40"
          onClick={() => setTagSheetOpen(false)}
        />
      )}

      {/* 핀 floating message 닫기 오버레이 */}
      {activeAnnotationId && !tagSheetOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setActiveAnnotationId(null)} />
      )}
    </div>
  );
}

export default function InfoPage() {
  return (
    <Suspense>
      <InfoForm />
    </Suspense>
  );
}
