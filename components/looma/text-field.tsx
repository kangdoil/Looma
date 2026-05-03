"use client";

import { useState } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextFieldProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "disabled"
> {
  /** 인풋 위 레이블 텍스트 */
  label?: string;
  /** 레이블 표시 여부 */
  showLabel?: boolean;
  /** 왼쪽 프리픽스 아이콘 */
  icon?: LucideIcon;
  /** 비활성화 상태 */
  disabled?: boolean;
}

export function TextField({
  label = "label",
  showLabel = true,
  icon: Icon,
  disabled = false,
  placeholder = "place holder",
  className,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("flex w-full flex-col items-start gap-2", className)}>
      {/* ── Label ── */}
      {showLabel && (
        <span
          className={cn(
            "whitespace-nowrap font-pretendard text-body-sm",
            focused && !disabled && "text-[var(--color-component-primary)]",
            !focused && !disabled && "text-[var(--color-text-primary)]",
            disabled && "text-[var(--color-text-disabled)]"
          )}
        >
          {label}
        </span>
      )}

      {/* ── Textarea wrapper ── */}
      <div
        className={cn(
          "relative h-[68px] w-full",
          "overflow-hidden rounded-[var(--radius-sm)] border-[0.5px]",
          focused && !disabled
            ? "border-[var(--color-border-accent)] bg-[var(--color-bg-surface)]"
            : disabled
              ? "border-[var(--color-border-subtle)] bg-[var(--color-bg-input)]"
              : "border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]"
        )}
      >
        {/* 프리픽스 아이콘 */}
        {Icon && (
          <span
            className={cn(
              "pointer-events-none absolute left-4 top-3",
              disabled
                ? "text-[var(--color-text-disabled)]"
                : "text-[var(--color-component-primary)]"
            )}
          >
            <Icon size={16} strokeWidth={1.5} aria-hidden />
          </span>
        )}

        {/* textarea */}
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "h-full w-full resize-none bg-transparent",
            "px-4 py-3",
            Icon && "pl-9",
            "font-pretendard text-body-sm",
            "text-[var(--color-text-primary)]",
            "placeholder:text-[var(--color-text-tertiary)]",
            "outline-none",
            "looma-scrollbar overflow-y-auto",
            "disabled:text-[var(--color-text-disabled)]",
            "disabled:placeholder:text-[var(--color-text-disabled)]",
            "disabled:cursor-not-allowed"
          )}
          {...props}
        />
      </div>
    </div>
  );
}
