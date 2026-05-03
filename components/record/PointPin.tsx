import { cn } from "@/lib/utils";

interface PointPinProps {
  index: number;
  xRatio: number;
  yRatio: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function PointPin({ index, xRatio, yRatio, isActive = false, onClick }: PointPinProps) {
  return (
    <button
      onClick={onClick}
      style={{
        left: `${xRatio * 100}%`,
        top: `${yRatio * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
      className={cn(
        "absolute flex size-7 items-center justify-center rounded-full",
        "font-pretendard text-caption font-semibold",
        "border-2 shadow-accent-blue transition-all",
        isActive
          ? "scale-110 border-[var(--color-component-primary)] bg-[var(--color-component-primary)] text-[var(--color-bg-primary)]"
          : "border-[var(--color-component-primary)] bg-[var(--color-bg-elevated)] text-[var(--color-component-primary)]"
      )}
      aria-label={`포인트 ${index}`}
    >
      {index}
    </button>
  );
}
