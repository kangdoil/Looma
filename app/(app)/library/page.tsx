"use client";

import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Chip, TopBar } from "@/components/looma";
import { RecordCard, type DummyRecord } from "@/components/library/RecordCard";

function getTodayLabel() {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return `${days[now.getDay()]}s Day · ${months[now.getMonth()]} ${now.getDate()}`;
}

const DUMMY_RECORDS: DummyRecord[] = [
  {
    id: "1",
    title: "아이콘 시각화 문제 해결",
    date: "APR 23",
    tags: ["UI/UX", "디자인"],
    imageUrl: null,
    color: "#2c3e50",
  },
  {
    id: "2",
    title: "내비게이션 플로우 개선",
    date: "APR 21",
    tags: ["기획"],
    imageUrl: null,
    color: "#8e44ad",
  },
  {
    id: "3",
    title: "컴포넌트 반응형 처리",
    date: "APR 19",
    tags: ["개발", "UI/UX"],
    imageUrl: null,
    color: "#2980b9",
  },
  {
    id: "4",
    title: "사용자 인터뷰 인사이트 정리",
    date: "APR 17",
    tags: ["리서치"],
    imageUrl: null,
    color: "#16a085",
  },
  {
    id: "5",
    title: "타이포그래피 토큰 적용",
    date: "APR 15",
    tags: ["디자인"],
    imageUrl: null,
    color: "#f39c12",
  },
  {
    id: "6",
    title: "API 에러 핸들링 패턴",
    date: "APR 12",
    tags: ["개발"],
    imageUrl: null,
    color: "#d35400",
  },
  {
    id: "7",
    title: "온보딩 플로우 설계",
    date: "APR 10",
    tags: ["기획", "UI/UX"],
    imageUrl: null,
    color: "#c0392b",
  },
  {
    id: "8",
    title: "성능 최적화 실험 기록",
    date: "APR 08",
    tags: ["개발", "리서치"],
    imageUrl: null,
    color: "#27ae60",
  },
];

const FILTER_TAGS = ["전체", "UI/UX", "기획", "개발", "리서치", "디자인"];

function LibraryContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => {
    setIsSearchActive(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    });
  };

  const closeSearch = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    searchInputRef.current?.blur();
  };

  const filtered = DUMMY_RECORDS.filter((r) => {
    const matchSearch = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = activeFilter === "전체" || r.tags.includes(activeFilter);
    return matchSearch && matchTag;
  });

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      {/* 상단 탭 — 홈과 동일한 형식 */}
      <TopBar variant="text+icon_btn" title={getTodayLabel()} />

      {/* 타이틀 — 스크롤 시 올라감 */}
      <div className="flex flex-col gap-1 px-4 pb-4 pt-4 sm:px-6">
        <h1 className="font-pretendard text-[48px] font-bold leading-[56px] tracking-[-0.96px] text-[var(--color-text-primary)]">
          Library
        </h1>
        <p className="font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
          Quick and simple record keeping
        </p>
      </div>

      {/* 검색바 + 태그 필터 — 스크롤 시 상단 고정 */}
      <div className="sticky top-0 z-10 bg-[var(--color-bg-primary)] px-4 pb-3 pt-2 sm:px-6">
        <div className="flex items-center gap-2 overflow-hidden">
          {/* 검색 버튼 / 확장된 인풋 */}
          <div
            className="flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-[var(--color-border-accent)] bg-[var(--color-bg-surface)] px-4 py-2 transition-all duration-300 ease-in-out"
            style={{ width: isSearchActive ? "100%" : "95px" }}
          >
            <Search
              size={14}
              strokeWidth={1.5}
              className="shrink-0 text-[var(--color-component-primary)]"
            />
            {isSearchActive ? (
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                placeholder="검색"
                className="min-w-0 flex-1 bg-transparent font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
              />
            ) : (
              <button
                onClick={openSearch}
                className="whitespace-nowrap font-pretendard text-body-sm text-[var(--color-component-primary)]"
              >
                Search
              </button>
            )}
            {isSearchActive && (
              <button onClick={closeSearch} className="ml-1 shrink-0">
                <X size={14} strokeWidth={1.5} className="text-[var(--color-text-tertiary)]" />
              </button>
            )}
          </div>

          {/* 구분선 + 칩 — flex-1로 남은 공간 차지해야 overflow-x-auto 스크롤 작동 */}
          <div
            className="flex min-w-0 flex-1 items-center gap-2 transition-transform duration-300 ease-in-out"
            style={{ transform: isSearchActive ? "translateX(120%)" : "translateX(0)" }}
          >
            <div className="h-6 w-px shrink-0 bg-[var(--color-border-default)]" />
            <div className="no-scrollbar flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
              {FILTER_TAGS.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  selected={activeFilter === tag}
                  onClick={() => setActiveFilter(tag)}
                  className="shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div
        className="flex-1 rounded-t-[32px] bg-[var(--color-bg-surface)] px-4 pt-6 sm:px-6"
        onDoubleClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest("button") && !target.closest("input") && isSearchActive) {
            closeSearch();
          }
        }}
      >
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {filtered.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
                onClick={() => router.push(`/library/${record.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <p className="font-pretendard text-body-sm text-[var(--color-text-disabled)]">
              검색 결과가 없습니다
            </p>
          </div>
        )}

        {/* 하단 그라디언트 — 카드 다음 일반 흐름으로 배치해 카드가 잘리지 않음 */}
        <div className="h-36 bg-gradient-to-b from-[var(--color-bg-surface)] to-[var(--color-bg-primary)]" />
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense>
      <LibraryContent />
    </Suspense>
  );
}
