import { Suspense } from "react";
import { AppNav } from "@/components/layout/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[var(--color-bg-primary)]">
      <div className="relative flex min-h-screen w-full max-w-[375px] flex-col">
        <main className="flex flex-1 flex-col">{children}</main>
        <Suspense>
          <AppNav />
        </Suspense>
      </div>
    </div>
  );
}
