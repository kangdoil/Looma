"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopBar, Button, TextField, Chip } from "@/components/looma";
import { AnnotationCanvas } from "@/components/record/AnnotationCanvas";
import { useRecordDraft } from "@/store/recordDraftContext";

const DUMMY_TAGS = [
  { id: "t1", name: "UI/UX" },
  { id: "t2", name: "기획" },
  { id: "t3", name: "개발" },
  { id: "t4", name: "리서치" },
  { id: "t5", name: "디자인" },
];

function InfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTextType = searchParams.get("type") === "text";
  const { draft, setTitle, setDescription, setTagIds, resetDraft } = useRecordDraft();

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(draft.tagIds);
  const [saving, setSaving] = useState(false);

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const handleSave = async () => {
    setSaving(true);
    setTagIds(selectedTagIds);
    // 더미: 실제 저장 없이 300ms 딜레이 후 홈으로 이동
    await new Promise((r) => setTimeout(r, 300));
    resetDraft();
    router.push("/home");
  };

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar
        variant="center_title"
        title="정보 입력"
        rightLabel="저장"
        currentStep={2}
        totalSteps={3}
        onLeftAction={() => router.back()}
        onRightAction={handleSave}
      />

      <div className="flex flex-col gap-5 overflow-y-auto px-4 pb-24 pt-5">
        {/* 이미지/텍스트 미리보기 */}
        {!isTextType ? (
          <div className="overflow-hidden rounded-[var(--radius-md)]">
            <AnnotationCanvas
              imageUrl={draft.imagePreviewUrl}
              annotations={draft.annotations}
              readOnly
            />
          </div>
        ) : (
          <TextField
            label="내용"
            placeholder="문제와 해결 과정을 자유롭게 작성하세요"
            className="min-h-[140px]"
          />
        )}

        {/* 태그 선택 */}
        <div className="flex flex-col gap-3">
          <span className="font-pretendard text-body-sm text-[var(--color-text-primary)]">
            태그
          </span>
          <div className="flex flex-wrap gap-2">
            {DUMMY_TAGS.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                selected={selectedTagIds.includes(tag.id)}
                onClick={() => toggleTag(tag.id)}
              />
            ))}
          </div>
        </div>

        {/* 제목 */}
        <TextField
          label="제목"
          placeholder="기록 제목을 입력하세요"
          value={draft.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 설명 */}
        <TextField
          label="설명"
          placeholder="추가 설명을 입력하세요"
          value={draft.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* 저장 버튼 */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-[375px] -translate-x-1/2 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 pb-8 pt-4">
        <Button
          variant="container"
          label={saving ? "저장 중..." : "저장"}
          disabled={saving}
          onClick={handleSave}
          className="w-full justify-center"
        />
      </div>
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
