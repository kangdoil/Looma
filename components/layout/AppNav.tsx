"use client";

import { usePathname, useRouter } from "next/navigation";
import { BottomBar } from "@/components/looma";

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();

  const showBottomBar = !pathname.startsWith("/record");
  const activeTab = pathname.startsWith("/library") ? "library" : "home";

  if (!showBottomBar) return null;

  return (
    <div className="sticky bottom-0 flex justify-center bg-[var(--color-bg-primary)] pb-6 pt-2 sm:pb-8">
      <BottomBar
        active={activeTab}
        onHomeClick={() => router.push("/home")}
        onLibraryClick={() => router.push("/library")}
      />
    </div>
  );
}
