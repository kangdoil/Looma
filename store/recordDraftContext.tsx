"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { AnnotationDraft } from "@/types";

export interface RecordDraft {
  imageFile: File | null;
  imagePreviewUrl: string | null;
  annotations: AnnotationDraft[];
  title: string;
  description: string;
  tagIds: string[];
}

const initialDraft: RecordDraft = {
  imageFile: null,
  imagePreviewUrl: null,
  annotations: [],
  title: "",
  description: "",
  tagIds: [],
};

interface RecordDraftContextValue {
  draft: RecordDraft;
  setImage: (file: File, previewUrl: string) => void;
  setAnnotations: (annotations: AnnotationDraft[]) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setTagIds: (tagIds: string[]) => void;
  resetDraft: () => void;
}

const RecordDraftContext = createContext<RecordDraftContextValue | null>(null);

export function RecordDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<RecordDraft>(initialDraft);

  const setImage = (file: File, previewUrl: string) =>
    setDraft((prev) => ({ ...prev, imageFile: file, imagePreviewUrl: previewUrl }));

  const setAnnotations = (annotations: AnnotationDraft[]) =>
    setDraft((prev) => ({ ...prev, annotations }));

  const setTitle = (title: string) => setDraft((prev) => ({ ...prev, title }));

  const setDescription = (description: string) => setDraft((prev) => ({ ...prev, description }));

  const setTagIds = (tagIds: string[]) => setDraft((prev) => ({ ...prev, tagIds }));

  const resetDraft = () => setDraft(initialDraft);

  return (
    <RecordDraftContext.Provider
      value={{ draft, setImage, setAnnotations, setTitle, setDescription, setTagIds, resetDraft }}
    >
      {children}
    </RecordDraftContext.Provider>
  );
}

export function useRecordDraft() {
  const ctx = useContext(RecordDraftContext);
  if (!ctx) throw new Error("useRecordDraft must be used within RecordDraftProvider");
  return ctx;
}
