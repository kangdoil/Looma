import { FileText } from "lucide-react";
import { Tag } from "@/components/looma";
import { cn } from "@/lib/utils";

export interface DummyRecord {
  id: string;
  title: string;
  date: string;
  tags: string[];
  imageUrl: string | null;
  color?: string;
}

interface RecordCardProps {
  record: DummyRecord;
  onClick?: () => void;
}

export function RecordCard({ record, onClick }: RecordCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[var(--radius-md)]",
        "border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]",
        "text-left shadow-card transition-opacity active:opacity-70"
      )}
    >
      {/* 썸네일 */}
      <div
        className="flex aspect-square w-full items-center justify-center"
        style={{ backgroundColor: record.color ?? "var(--color-bg-card)" }}
      >
        {!record.imageUrl && !record.color && (
          <FileText size={32} strokeWidth={1} className="text-[var(--color-text-disabled)]" />
        )}
        {record.imageUrl && (
          <img src={record.imageUrl} alt={record.title} className="h-full w-full object-cover" />
        )}
      </div>

      {/* 정보 */}
      <div className="flex flex-col gap-2 p-3">
        <p className="line-clamp-2 font-pretendard text-body-sm leading-snug text-[var(--color-text-primary)]">
          {record.title}
        </p>
        <p className="font-pretendard text-caption text-[var(--color-text-disabled)]">
          {record.date}
        </p>
        {record.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {record.tags.slice(0, 2).map((tag) => (
              <Tag key={tag} label={tag} size="sm" />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
