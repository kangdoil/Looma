"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { TopBar, Button } from "@/components/looma";
import { useRecordDraft } from "@/store/recordDraftContext";

export default function ImageSelectPage() {
  const router = useRouter();
  const { setImage } = useRecordDraft();
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setImage(file, url);
  };

  const hasSelection = previewUrl !== null;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar
        variant="center_title"
        title="이미지 선택"
        rightLabel="다음"
        currentStep={0}
        totalSteps={3}
        disabled={!hasSelection}
        onLeftAction={() => router.back()}
        onRightAction={() => hasSelection && router.push("/record/annotate")}
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 pb-8 sm:px-8 md:px-12">
        <div className="flex aspect-square w-full max-w-[min(100%,28rem)] items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)]">
          {previewUrl ? (
            <img src={previewUrl} alt="선택된 이미지" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[var(--color-text-disabled)]">
              <ImageIcon size={40} strokeWidth={1} />
              <span className="font-pretendard text-body-sm">이미지를 선택하세요</span>
            </div>
          )}
        </div>

        <div className="w-full max-w-[min(100%,28rem)]">
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
      </div>
    </div>
  );
}
