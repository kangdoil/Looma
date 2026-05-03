export interface Tag {
  id: string;
  userId: string;
  name: string;
}

export interface TagInsert {
  userId: string;
  name: string;
}

export interface RecordTag {
  recordId: string;
  tagId: string;
}
