export interface Record {
  id: string;
  userId: string;
  title: string;
  imageUrl: string | null;
  description: string;
  createdAt: string;
}

export interface RecordInsert {
  userId: string;
  title: string;
  imageUrl?: string | null;
  description?: string;
}

export interface RecordUpdate {
  title?: string;
  imageUrl?: string | null;
  description?: string;
}
