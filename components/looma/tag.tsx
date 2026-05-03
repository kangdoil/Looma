import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TagSize = "sm" | "md";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 크기 변형 — sm: 12px / md: 14px */
  size?: TagSize;
  /** 태그 텍스트 */
  label?: string;
  /** 표시할 lucide 아이콘 */
  icon?: LucideIcon;
  /** 비활성화 상태 (시각적) */
  disabled?: boolean;
}

export function Tag({
  size = "sm",
  label = "Label",
  icon: Icon,
  disabled = false,
  className,
  ...props
}: TagProps) {
  return (
    <span
      aria-disabled={disabled}
      className={cn(
        // base
        "inline-flex items-center justify-center gap-1",
        "rounded-[var(--radius-full)] border py-1",
        "whitespace-nowrap font-pretendard",

        // size
        size === "sm" && ["px-1.5", "text-caption"],
        size === "md" && ["px-3", "text-body-sm"],

        // enabled
        !disabled && [
          "bg-[var(--color-bg-main-blur)]",
          "border-[var(--color-border-accent)]",
          "text-[var(--color-component-primary)]",
        ],

        // disabled
        disabled && [
          "bg-[var(--color-bg-input)]",
          "border-[var(--color-border-subtle)]",
          "text-[var(--color-text-disabled)]",
          "cursor-not-allowed",
        ],

        className
      )}
      {...props}
    >
      {Icon && <Icon size={size === "sm" ? 10 : 12} strokeWidth={1.5} aria-hidden />}
      {label && <span>{label}</span>}
    </span>
  );
}
