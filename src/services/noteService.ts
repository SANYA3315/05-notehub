import axios from "axios";
import type { Note } from "../types/note";

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

type ApiNote = Omit<Note, "createdAt" | "updatedAt">;

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<{
    notes: ApiNote[];
    totalPages: number;
  }>("/notes", {
    params: { page, perPage: 12, search },
  });

  const notes: Note[] = data.notes.map(n => ({
    ...n,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return {
    notes,
    totalPages: data.totalPages,
  };
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: Note["tag"];
}

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await instance.post<ApiNote>("/notes", payload);

  return {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<ApiNote>(`/notes/${id}`);

  return {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
