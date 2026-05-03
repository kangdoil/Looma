import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택 상태 — true: component/primary 배경, false: surface 배경 */
  selected?: boolean;
  /** 칩 텍스트 */
  label?: string;
  /** 표시할 lucide 아이콘 */
  icon?: LucideIcon;
  /** 비활성화 상태 */
  disabled?: boolean;
}

export function Chip({
  selected = true,
  label = "Label",
  icon: Icon,
  disabled = false,
  className,
  ...props
}: ChipProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        // base
        "inline-flex items-center justify-center gap-1",
        "rounded-[var(--radius-lg)] px-4 py-2",
        "whitespace-nowrap font-pretendard text-body-sm",
        "transition-opacity disabled:cursor-not-allowed",

        // selected
        selected &&
          !disabled && ["bg-[var(--color-component-primary)]", "text-[var(--color-text-primary)]"],

        // unselected
        !selected &&
          !disabled && ["bg-[var(--color-bg-surface)]", "text-[var(--color-text-tertiary)]"],

        // disabled (selected or not)
        disabled && ["bg-[var(--color-bg-input)]", "text-[var(--color-text-disabled)]"],

        className
      )}
      {...props}
    >
      {Icon && <Icon size={14} strokeWidth={1.5} aria-hidden />}
      {label && <span>{label}</span>}
    </button>
  );
}
