"use client";

import { RecordDraftProvider } from "@/store/recordDraftContext";

export default function RecordLayout({ children }: { children: React.ReactNode }) {
  return <RecordDraftProvider>{children}</RecordDraftProvider>;
}
