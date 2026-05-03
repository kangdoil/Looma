import { Home, BookOpen, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type BottomBarTab = "home" | "library";

export interface BottomBarProps {
  /** 현재 활성화된 탭 */
  active?: BottomBarTab;
  /** 홈 탭 레이블 */
  homeLabel?: string;
  /** 라이브러리 탭 레이블 */
  libraryLabel?: string;
  /** 홈 탭 아이콘 */
  homeIcon?: LucideIcon;
  /** 라이브러리 탭 아이콘 */
  libraryIcon?: LucideIcon;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 홈 탭 클릭 핸들러 */
  onHomeClick?: () => void;
  /** 라이브러리 탭 클릭 핸들러 */
  onLibraryClick?: () => void;
  className?: string;
}

export function BottomBar({
  active = "home",
  homeLabel = "Home",
  libraryLabel = "Library",
  homeIcon: HomeIcon = Home,
  libraryIcon: LibraryIcon = BookOpen,
  disabled = false,
  onHomeClick,
  onLibraryClick,
  className,
}: BottomBarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 overflow-hidden",
        "rounded-full px-3 py-2",
        "border border-[#222] bg-[var(--color-bg-surface)]",
        "shadow-btn-container",
        className
      )}
    >
      {/* ── Home 탭 ── */}
      <button
        disabled={disabled}
        onClick={onHomeClick}
        className={cn(
          "inline-flex items-center justify-center gap-1.5",
          "rounded-full px-3 py-2",
          "whitespace-nowrap font-pretendard text-body-sm",
          "transition-all disabled:cursor-not-allowed",
          active === "home" && !disabled
            ? [
                "bg-gradient-blue-light text-[var(--color-text-primary)]",
                "[filter:drop-shadow(0_4px_10px_var(--looma-shadow-accent-blue))]",
              ]
            : active === "home" && disabled
              ? "bg-[var(--color-bg-elevated)] text-[var(--color-text-disabled)]"
              : "text-[var(--color-text-tertiary)]"
        )}
        aria-label={homeLabel}
      >
        {active === "home" && <HomeIcon size={16} strokeWidth={1.5} aria-hidden />}
        <span>{homeLabel}</span>
      </button>

      {/* ── Library 탭 ── */}
      <button
        disabled={disabled}
        onClick={onLibraryClick}
        className={cn(
          "inline-flex items-center justify-center gap-1.5",
          "rounded-full px-3 py-2",
          "whitespace-nowrap font-pretendard text-body-sm",
          "transition-all disabled:cursor-not-allowed",
          active === "library" && !disabled
            ? [
                "bg-gradient-blue-light text-[var(--color-text-primary)]",
                "[filter:drop-shadow(0_4px_10px_var(--looma-shadow-accent-blue))]",
              ]
            : active === "library" && disabled
              ? "bg-[var(--color-bg-elevated)] text-[var(--color-text-disabled)]"
              : "text-[var(--color-text-tertiary)]"
        )}
        aria-label={libraryLabel}
      >
        {active === "library" && <LibraryIcon size={16} strokeWidth={1.5} aria-hidden />}
        <span>{libraryLabel}</span>
      </button>
    </div>
  );
}
