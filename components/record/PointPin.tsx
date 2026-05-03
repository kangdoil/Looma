import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type PinPointerHandlers = Pick<
  React.ComponentPropsWithoutRef<"button">,
  "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel" | "onLostPointerCapture"
>;

interface PointPinProps {
  xRatio: number;
  yRatio: number;
  isActive?: boolean;
  onClick?: () => void;
  /** 드래그 가능할 때 포인터 핸들러(부모 관리); 있으면 onClick은 타지 않음 */
  pointerHandlers?: PinPointerHandlers;
}

export function PointPin({
  xRatio,
  yRatio,
  isActive = false,
  onClick,
  pointerHandlers,
}: PointPinProps) {
  return (
    <button
      type="button"
      data-annotation-pin-root
      style={{
        left: `${xRatio * 100}%`,
        top: `${yRatio * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
      className={cn(
        "absolute flex items-center justify-center rounded-[11px]",
        "border-[0.5px] border-[#efedcb] bg-[#fffa9f] p-[3px]",
        "touch-none drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)] transition-all",
        pointerHandlers ? "cursor-grab active:cursor-grabbing" : "",
        isActive ? "size-[26px] rounded-[13px]" : "size-[22px]"
      )}
      {...pointerHandlers}
      onClick={pointerHandlers ? undefined : onClick}
      aria-label="포인트"
    >
      <Plus
        size={isActive ? 16 : 14}
        strokeWidth={2.5}
        className="pointer-events-none shrink-0 text-[#1a1a1a]"
      />
    </button>
  );
}
