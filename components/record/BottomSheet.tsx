"use client";

import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ open, children, className }: BottomSheetProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 z-50 w-full max-w-[768px] -translate-x-1/2",
        "rounded-t-[var(--radius-md)] bg-[var(--color-bg-surface)]",
        "shadow-overlay transition-transform duration-300 ease-out",
        "border-t border-[var(--color-border-subtle)]",
        open ? "translate-y-0" : "translate-y-full",
        className
      )}
    >
      {/* 드래그 핸들 */}
      <div className="flex justify-center pb-2 pt-3">
        <div className="h-1 w-10 rounded-full bg-[var(--color-border-default)]" />
      </div>
      {children}
    </div>
  );
}
