export interface Annotation {
  id: string;
  recordId: string;
  xRatio: number;
  yRatio: number;
  problem: string;
  solution: string;
  createdAt: string;
}

export interface AnnotationDraft {
  id: string;
  xRatio: number;
  yRatio: number;
  name: string;
  problem: string;
  solution: string;
}

export interface AnnotationInsert {
  recordId: string;
  xRatio: number;
  yRatio: number;
  problem: string;
  solution: string;
}
