import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "container" | "text" | "icon" | "stroke";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 변형 */
  variant?: ButtonVariant;
  /** 버튼 텍스트 (icon variant에서는 무시됨) */
  label?: string;
  /** 표시할 lucide 아이콘 컴포넌트 */
  icon?: LucideIcon;
  /** 비활성화 상태 */
  disabled?: boolean;
}

export function Button({
  variant = "container",
  label = "기록 완료",
  icon: Icon,
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        // base
        "inline-flex items-center justify-center font-pretendard transition-opacity disabled:cursor-not-allowed",

        // ── container ──
        variant === "container" && [
          "gap-2 rounded-full px-12 py-4",
          "text-body-md",
          disabled
            ? "bg-[var(--color-bg-input)] text-[var(--color-text-disabled)]"
            : "bg-gradient-blue-light text-[var(--color-text-primary)] shadow-btn-container",
        ],

        // ── text ──
        variant === "text" && [
          "gap-2 p-1",
          "text-body-md",
          disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-component-primary)]",
        ],

        // ── icon ──
        variant === "icon" && [
          "p-1",
          disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-component-primary)]",
        ],

        // ── stroke ──
        variant === "stroke" && [
          "gap-1 rounded-full px-4 py-2",
          "text-body-sm",
          disabled
            ? "bg-[var(--color-bg-input)] text-[var(--color-text-disabled)]"
            : "border border-[var(--color-border-accent)] bg-[var(--color-bg-surface)] text-[var(--color-component-primary)]",
        ],

        className
      )}
      {...props}
    >
      {/* 아이콘 — icon variant는 항상, 나머지는 icon prop이 있을 때 */}
      {Icon && <Icon size={variant === "stroke" ? 16 : 24} strokeWidth={1.5} aria-hidden />}

      {/* 텍스트 — icon variant 제외 */}
      {variant !== "icon" && label && <span>{label}</span>}
    </button>
  );
}
