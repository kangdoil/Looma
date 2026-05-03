"use client";

import { useRef } from "react";
import type { AnnotationDraft } from "@/types";
import { PointPin } from "./PointPin";

interface AnnotationCanvasProps {
  imageUrl: string | null;
  annotations: AnnotationDraft[];
  activeId?: string | null;
  onPinClick?: (id: string) => void;
  onCanvasClick?: (xRatio: number, yRatio: number) => void;
  readOnly?: boolean;
}

export function AnnotationCanvas({
  imageUrl,
  annotations,
  activeId,
  onPinClick,
  onCanvasClick,
  readOnly = false,
}: AnnotationCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly || !onCanvasClick) return;
    const rect = containerRef.current!.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    onCanvasClick(Math.min(Math.max(xRatio, 0.05), 0.95), Math.min(Math.max(yRatio, 0.05), 0.95));
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative aspect-square w-full cursor-crosshair select-none overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)]"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="기록 이미지"
          className="pointer-events-none h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-[var(--color-bg-card)]" />
      )}

      {annotations.map((ann, i) => (
        <PointPin
          key={ann.id}
          index={i + 1}
          xRatio={ann.xRatio}
          yRatio={ann.yRatio}
          isActive={ann.id === activeId}
          onClick={() => {
            onPinClick?.(ann.id);
          }}
        />
      ))}
    </div>
  );
}
