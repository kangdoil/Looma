"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { TopBar, Chip } from "@/components/looma";
import { RecordCard, type DummyRecord } from "@/components/library/RecordCard";

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

export default function LibraryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");

  const filtered = DUMMY_RECORDS.filter((r) => {
    const matchSearch =
      searchQuery === "" || r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = activeFilter === "전체" || r.tags.includes(activeFilter);
    return matchSearch && matchTag;
  });

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-bg-primary)]">
      <TopBar variant="icon_btn+txt_btn" rightLabel="편집" onRightAction={() => {}} />

      <div className="flex flex-col gap-4 px-4 pb-32 pt-2">
        {/* 헤더 */}
        <div className="flex flex-col gap-1">
          <h1 className="font-pretendard text-heading-sm text-[var(--color-text-primary)]">
            Library
          </h1>
          <p className="font-pretendard text-body-sm text-[var(--color-text-tertiary)]">
            {DUMMY_RECORDS.length}개의 기록
          </p>
        </div>

        {/* 검색바 */}
        <div className="relative">
          <Search
            size={16}
            strokeWidth={1.5}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
          />
          <input
            type="text"
            placeholder="검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-input)] py-2.5 pl-9 pr-4 font-pretendard text-body-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-border-accent)]"
          />
        </div>

        {/* 태그 필터 칩 */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
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

        {/* 2열 카드 그리드 */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
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
      </div>
    </div>
  );
}
