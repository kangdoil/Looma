import { ChevronLeft, ChevronRight, ChevronDown, Settings, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TopBarVariant =
  | "text+icon_btn" // 날짜 텍스트 + 우측 아이콘 버튼
  | "center_title" // 좌: 뒤로가기, 중앙: 타이틀, 우: 텍스트 버튼 + 스텝 인디케이터
  | "icon_btn+txt_btn" // 좌: 아이콘, 우: 텍스트 버튼
  | "txt_btn+icon_btn"; // 좌: 텍스트, 우: 아이콘

export interface TopBarProps {
  variant?: TopBarVariant;
  /** 메인 타이틀 또는 좌측 텍스트 */
  title?: string;
  /** 우측 텍스트 버튼 레이블 */
  rightLabel?: string;
  /** 좌측 텍스트 버튼 레이블 (txt_btn+icon_btn 전용) */
  leftLabel?: string;
  /** 아이콘 버튼에 사용할 lucide 아이콘 (text+icon_btn 기본값: Settings) */
  icon?: LucideIcon;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 스텝 인디케이터 현재 인덱스 (0-based, center_title 전용) */
  currentStep?: number;
  /** 스텝 인디케이터 총 개수 (center_title 전용) */
  totalSteps?: number;
  /** 아이콘 버튼 클릭 핸들러 */
  onIconAction?: () => void;
  /** 우측 텍스트 버튼 클릭 핸들러 */
  onRightAction?: () => void;
  /** 좌측 아이콘/텍스트 버튼 클릭 핸들러 */
  onLeftAction?: () => void;
  className?: string;
}

export function TopBar({
  variant = "text+icon_btn",
  title = "Thurs Day · APR 23",
  rightLabel = "다음",
  leftLabel = "Library",
  icon: Icon = Settings,
  disabled = false,
  currentStep = 1,
  totalSteps = 3,
  onIconAction,
  onRightAction,
  onLeftAction,
  className,
}: TopBarProps) {
  const actionTextClass = cn(
    "font-pretendard text-body-md whitespace-nowrap",
    disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-component-primary)]"
  );

  const iconClass = cn(
    disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-primary)]"
  );

  // ── text+icon_btn ── 날짜/제목 좌측, 아이콘 우측
  if (variant === "text+icon_btn") {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-between",
          "bg-[var(--color-bg-primary)] px-4 py-2 sm:px-8 md:px-12",
          className
        )}
      >
        <span className="whitespace-nowrap font-pretendard text-body-sm tracking-[0px] text-[var(--color-text-primary)]">
          {title}
        </span>
        <button
          disabled={disabled}
          onClick={onIconAction}
          className={cn("p-2 disabled:cursor-not-allowed", iconClass)}
          aria-label="settings"
        >
          <Icon size={24} strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    );
  }

  // ── center_title ── 뒤로가기, 중앙 타이틀, 우측 액션 + 스텝 인디케이터
  if (variant === "center_title") {
    return (
      <div
        className={cn(
          "relative flex w-full items-center justify-between overflow-hidden",
          "bg-[var(--color-bg-primary)] px-4 py-4 sm:px-8 md:px-12",
          className
        )}
      >
        {/* 뒤로가기 */}
        <button
          disabled={disabled}
          onClick={onLeftAction}
          className={cn("shrink-0 disabled:cursor-not-allowed", iconClass)}
          aria-label="뒤로가기"
        >
          <ChevronLeft size={24} strokeWidth={1.5} aria-hidden />
        </button>

        {/* 중앙 타이틀 */}
        <div className="flex flex-col items-center gap-2">
          <span className="whitespace-nowrap text-center font-pretendard text-body-md text-[var(--color-text-primary)]">
            {title}
          </span>
          {/* 스텝 인디케이터 */}
          <div className="flex h-[2px] items-center gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-[2px] rounded-[var(--radius-sm)] transition-all",
                  i === currentStep
                    ? "w-5 bg-[var(--color-component-primary)]"
                    : "w-2.5 bg-[var(--color-component-tertiary)]"
                )}
              />
            ))}
          </div>
        </div>

        {/* 우측 액션 */}
        <button
          disabled={disabled}
          onClick={onRightAction}
          className={cn("shrink-0 disabled:cursor-not-allowed", actionTextClass)}
        >
          {rightLabel}
        </button>
      </div>
    );
  }

  // ── icon_btn+txt_btn ── 좌: 아이콘, 우: 텍스트 버튼 (블러 배경)
  if (variant === "icon_btn+txt_btn") {
    return (
      <div
        className={cn(
          "relative flex w-full items-center justify-between overflow-hidden",
          "bg-[var(--color-bg-black-blur)] px-4 py-4 sm:px-8 md:px-12",
          className
        )}
      >
        <button
          disabled={disabled}
          onClick={onLeftAction}
          className={cn("shrink-0 disabled:cursor-not-allowed", iconClass)}
          aria-label="접기"
        >
          <ChevronDown size={24} strokeWidth={1.5} aria-hidden />
        </button>

        {/* 중앙 영역 (빈 공간) */}
        <span className="flex-1" />

        <button
          disabled={disabled}
          onClick={onRightAction}
          className={cn("shrink-0 disabled:cursor-not-allowed", actionTextClass)}
        >
          {rightLabel}
        </button>
      </div>
    );
  }

  // ── txt_btn+icon_btn ── 좌: 텍스트, 우: 아이콘 버튼
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between",
        "bg-[var(--color-bg-primary)] px-4 py-4 sm:px-8 md:px-12",
        className
      )}
    >
      <button
        disabled={disabled}
        onClick={onLeftAction}
        className={cn("shrink-0 disabled:cursor-not-allowed", actionTextClass)}
      >
        {leftLabel}
      </button>

      <button
        disabled={disabled}
        onClick={onIconAction}
        className={cn("shrink-0 disabled:cursor-not-allowed", iconClass)}
        aria-label="다음"
      >
        <ChevronRight size={24} strokeWidth={1.5} aria-hidden />
      </button>
    </div>
  );
}
