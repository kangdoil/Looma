import { cn } from "@/lib/utils";
import { Tag } from "@/components/looma";

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
  if (record.imageUrl) {
    return (
      <button
        onClick={onClick}
        className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] text-left transition-opacity active:opacity-70"
      >
        <img
          src={record.imageUrl}
          alt={record.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* 하단 블러 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 rounded-b-[var(--radius-md)] bg-[rgba(45,45,45,0.4)] px-2.5 pb-3 pt-2 backdrop-blur-[11px]">
          <p className="line-clamp-2 overflow-hidden text-ellipsis font-pretendard text-[12px] leading-4 tracking-[-0.24px] text-white">
            {record.title}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] text-left transition-opacity active:opacity-70",
        "border border-[var(--color-border-default)]"
      )}
      style={{
        background: record.color
          ? `linear-gradient(-40deg, ${record.color}55 11%, ${record.color}88 98%)`
          : "linear-gradient(-40deg, rgba(26,26,26,0.4) 11%, rgba(56,56,56,0.4) 98%)",
      }}
    >
      {/* 하단 태그 + 텍스트 */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-4">
        {record.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {record.tags.slice(0, 2).map((tag) => (
              <Tag key={tag} label={tag} size="sm" />
            ))}
          </div>
        )}
        <p className="line-clamp-2 overflow-hidden text-ellipsis font-pretendard text-[12px] leading-4 tracking-[-0.24px] text-white">
          {record.title}
        </p>
      </div>
    </button>
  );
}
