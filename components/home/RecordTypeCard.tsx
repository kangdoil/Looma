import { type LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecordTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function RecordTypeCard({
  icon: Icon,
  title,
  description,
  onClick,
  className,
}: RecordTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-4 p-5",
        "rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)]",
        "border border-[var(--color-border-subtle)] shadow-card",
        "text-left transition-opacity active:opacity-70",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-bg-card)]">
          <Icon size={24} strokeWidth={1.5} className="text-[var(--color-component-primary)]" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-pretendard text-body-lg text-[var(--color-text-primary)]">
            {title}
          </span>
          <span className="font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
            {description}
          </span>
        </div>
      </div>
      <ChevronRight
        size={20}
        strokeWidth={1.5}
        className="shrink-0 text-[var(--color-text-tertiary)]"
      />
    </button>
  );
}
