"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { TopBar, Button } from "@/components/looma";
import { useRecordDraft } from "@/store/recordDraftContext";
import { cn } from "@/lib/utils";

// 더미 이미지: 색상 팔레트 블록 12개
const DUMMY_COLORS = [
  "#2c3e50",
  "#8e44ad",
  "#2980b9",
  "#16a085",
  "#27ae60",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#7f8c8d",
  "#1abc9c",
  "#3498db",
  "#9b59b6",
];

export default function ImageSelectPage() {
  const router = useRouter();
  const { setImage } = useRecordDraft();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setImage(file, url);
    setSelectedIndex(null);
  };

  const handleDummySelect = (index: number) => {
    setSelectedIndex(index);
    // 더미 이미지는 색상 블록이므로 Canvas로 Blob 생성
    const canvas = document.createElement("canvas");
    canvas.width = 343;
    canvas.height = 343;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = DUMMY_COLORS[index];
    ctx.fillRect(0, 0, 343, 343);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `dummy-${index}.png`, { type: "image/png" });
      const url = canvas.toDataURL();
      setPreviewUrl(url);
      setImage(file, url);
    });
  };

  const hasSelection = previewUrl !== null;

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar
        variant="center_title"
        title="이미지 선택"
        rightLabel="다음"
        currentStep={0}
        totalSteps={3}
        onLeftAction={() => router.back()}
        onRightAction={() => hasSelection && router.push("/record/annotate")}
      />

      {/* 미리보기 */}
      <div className="mx-4 mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)]">
        {previewUrl ? (
          <img src={previewUrl} alt="선택된 이미지" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[var(--color-text-disabled)]">
            <ImageIcon size={40} strokeWidth={1} />
            <span className="font-pretendard text-body-sm">이미지를 선택하세요</span>
          </div>
        )}
      </div>

      {/* 갤러리에서 선택 버튼 */}
      <div className="mt-4 px-4">
        <Button
          variant="stroke"
          label="갤러리에서 선택"
          onClick={() => fileRef.current?.click()}
          className="w-full justify-center rounded-[var(--radius-sm)]"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* 더미 이미지 그리드 */}
      <div className="mt-4 grid grid-cols-3 gap-0.5 px-4 pb-4">
        {DUMMY_COLORS.map((color, i) => (
          <button
            key={i}
            onClick={() => handleDummySelect(i)}
            className={cn(
              "aspect-square rounded-sm transition-all",
              selectedIndex === i &&
                "ring-2 ring-[var(--color-border-accent)] ring-offset-1 ring-offset-[var(--color-bg-primary)]"
            )}
            style={{ backgroundColor: color }}
            aria-label={`더미 이미지 ${i + 1}`}
          />
        ))}
      </div>

      {/* 다음 버튼 */}
      <div className="mt-auto px-4 pb-8">
        <Button
          variant="container"
          label="다음"
          disabled={!hasSelection}
          onClick={() => hasSelection && router.push("/record/annotate")}
          className="w-full justify-center"
        />
      </div>
    </div>
  );
}
