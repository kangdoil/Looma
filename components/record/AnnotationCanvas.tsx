"use client";

import { useCallback, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { AnnotationDraft } from "@/types";
import { cn } from "@/lib/utils";
import { PointPin } from "./PointPin";

const DRAG_THRESHOLD_PX = 6;

interface AnnotationCanvasProps {
  imageUrl: string | null;
  annotations: AnnotationDraft[];
  activeId?: string | null;
  onPinClick?: (id: string) => void;
  onCanvasClick?: (xRatio: number, yRatio: number) => void;
  onDeletePin?: (id: string) => void;
  /** 포인터 드래그로 좌표 갱신 (제공 시 핀 이동 가능) */
  onPinMove?: (id: string, xRatio: number, yRatio: number) => void;
  readOnly?: boolean;
}

function clampRatio(v: number): number {
  return Math.min(Math.max(v, 0.05), 0.95);
}

export function AnnotationCanvas({
  imageUrl,
  annotations,
  activeId,
  onPinClick,
  onCanvasClick,
  onDeletePin,
  onPinMove,
  readOnly = false,
}: AnnotationCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /** 드래그 직후 캔버스에 새 핀이 생기지 않도록 */
  const suppressNextCanvasPointerUpRef = useRef(false);

  const dragSessionRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);

  const ratiosFromPointer = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const xRatio = clampRatio((clientX - rect.left) / rect.width);
    const yRatio = clampRatio((clientY - rect.top) / rect.height);
    return { xRatio, yRatio };
  }, []);

  const canDragPins = Boolean(!readOnly && onPinMove);

  function finishPinPointerSession(pinId: string) {
    const session = dragSessionRef.current;
    if (!session || session.id !== pinId) return;

    const { moved } = session;
    dragSessionRef.current = null;

    if (moved) {
      suppressNextCanvasPointerUpRef.current = true;
      return;
    }

    onPinClick?.(pinId);
  }

  const makePinDragHandlers = (
    id: string
  ):
    | {
        onPointerDown: React.PointerEventHandler<HTMLElement>;
        onPointerMove: React.PointerEventHandler<HTMLElement>;
        onPointerUp: React.PointerEventHandler<HTMLElement>;
        onPointerCancel: React.PointerEventHandler<HTMLElement>;
        onLostPointerCapture: React.PointerEventHandler<HTMLElement>;
      }
    | undefined => {
    if (!canDragPins) return undefined;

    return {
      onPointerDown(e) {
        e.stopPropagation();
        dragSessionRef.current = {
          id,
          startX: e.clientX,
          startY: e.clientY,
          moved: false,
        };
        e.currentTarget.setPointerCapture(e.pointerId);
      },

      onPointerMove(e) {
        const session = dragSessionRef.current;
        if (!session || session.id !== id) return;

        const dx = e.clientX - session.startX;
        const dy = e.clientY - session.startY;
        const thresholdSq = DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX;

        if (!session.moved && dx * dx + dy * dy >= thresholdSq) {
          session.moved = true;
        }

        if (session.moved) {
          const { xRatio, yRatio } = ratiosFromPointer(e.clientX, e.clientY);
          onPinMove!(id, xRatio, yRatio);
        }
      },

      onPointerUp() {
        finishPinPointerSession(id);
      },

      onPointerCancel() {
        finishPinPointerSession(id);
      },

      onLostPointerCapture() {
        finishPinPointerSession(id);
      },
    };
  };

  const handleCanvasPointerDown = () => {
    suppressNextCanvasPointerUpRef.current = false;
  };

  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement | null;
    if (el?.closest?.("[data-annotation-pin-root], [data-blocks-canvas-tap]")) return;

    if (suppressNextCanvasPointerUpRef.current) {
      suppressNextCanvasPointerUpRef.current = false;
      return;
    }

    if (readOnly || !onCanvasClick) return;
    const rect = containerRef.current!.getBoundingClientRect();
    const xRatio = clampRatio((e.clientX - rect.left) / rect.width);
    const yRatio = clampRatio((e.clientY - rect.top) / rect.height);
    onCanvasClick(xRatio, yRatio);
  };

  return (
    <div
      ref={containerRef}
      role="presentation"
      onPointerDown={handleCanvasPointerDown}
      onPointerUp={handleCanvasPointerUp}
      className="relative isolate z-0 aspect-square w-full select-none overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)]"
      style={{
        cursor: readOnly ? "default" : "crosshair",
        touchAction: "manipulation",
      }}
    >
      {/* 이미지 */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="기록 이미지"
          className="pointer-events-none h-full w-full object-cover"
        />
      ) : (
        <div className="pointer-events-none h-full w-full bg-[var(--color-bg-card)]" />
      )}

      {/* 가이드 — 핀이 없을 때 */}
      {annotations.length === 0 && !readOnly && (
        <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute size-[22px] animate-ping rounded-[11px] bg-[#fffa9f] opacity-60" />
            <div className="relative flex size-[22px] animate-pulse items-center justify-center rounded-[11px] border-[0.5px] border-[#efedcb] bg-[#fffa9f] p-[3px]">
              <Plus size={14} strokeWidth={2.5} className="text-[#1a1a1a]" />
            </div>
          </div>
          <div
            className="rounded-[32px] px-3 py-2 text-center"
            style={{
              background: "rgba(237,237,237,0.08)",
              backdropFilter: "blur(6px)",
              boxShadow: "inset 0px 2px 6px 0px rgba(255,255,255,0.2)",
            }}
          >
            <p className="font-pretendard text-body-sm text-[var(--color-text-primary)]">
              이미지 위를 탭해
              <br />
              태그 포인트를 추가하세요
            </p>
          </div>
        </div>
      )}

      {/* 핀 렌더링 */}
      {annotations.map((ann) => {
        const isActive = ann.id === activeId;

        if (isActive && !readOnly) {
          const dragHandlers = makePinDragHandlers(ann.id);
          return (
            <div
              key={ann.id}
              data-annotation-pin-root
              role="presentation"
              className={cn(
                "absolute z-10 flex touch-none flex-col items-center gap-1",
                canDragPins && "cursor-grab active:cursor-grabbing"
              )}
              style={{
                left: `${ann.xRatio * 100}%`,
                top: `${ann.yRatio * 100}%`,
                transform: "translate(-50%, calc(-100% + 13px))",
              }}
              {...(dragHandlers ?? {})}
            >
              {/* 이름 버블 */}
              <div
                className="flex max-w-[150px] items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "#2c2c2c", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap font-pretendard text-body-sm font-semibold text-white">
                  {ann.name || "이름 없음"}
                </span>
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePin?.(ann.id);
                  }}
                  className="shrink-0"
                  aria-label="포인트 삭제"
                >
                  <Trash2 size={14} className="text-[var(--color-text-tertiary)]" />
                </button>
              </div>
              {/* 큰 포인트 장식 — 이벤트는 루트에서 처리 */}
              <div className="pointer-events-none flex size-[26px] items-center justify-center rounded-[13px] border-[0.5px] border-[#efedcb] bg-[#fffa9f] p-[5px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.12)]">
                <Plus size={16} strokeWidth={2.5} className="text-[#1a1a1a]" />
              </div>
            </div>
          );
        }

        const pinDragHandlers = makePinDragHandlers(ann.id);

        return (
          <PointPin
            key={ann.id}
            xRatio={ann.xRatio}
            yRatio={ann.yRatio}
            isActive={false}
            pointerHandlers={pinDragHandlers}
            onClick={() => !pinDragHandlers && onPinClick?.(ann.id)}
          />
        );
      })}

      {/* Total Points 배지 — 우하단 (탭 전파로 새 핀이 생기지 않게) */}
      {annotations.length > 0 && (
        <div
          data-blocks-canvas-tap
          className="absolute bottom-5 right-5 z-[1] flex items-center gap-1.5 rounded-[32px] px-2 py-1"
          style={{
            background: "rgba(237,237,237,0.08)",
            boxShadow: "inset 0px 4px 20px 0px rgba(255,255,255,0.25)",
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
        >
          <div className="flex size-[22px] items-center justify-center rounded-[11px] border-[0.5px] border-[#efedcb] bg-[#fffa9f] p-[3px]">
            <Plus size={14} strokeWidth={2.5} className="text-[#1a1a1a]" />
          </div>
          <span className="font-pretendard text-body-sm text-[var(--color-text-primary)]">
            {annotations.length}
          </span>
        </div>
      )}
    </div>
  );
}
