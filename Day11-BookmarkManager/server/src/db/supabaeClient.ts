import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import type { Bookmark, CreateBookmarkPayload, UpdateBookmarkPayload } from "../types";

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// TODO: implement the following functions using Supabase
export async function getBookmarks(): Promise<Bookmark[]> {
  // TODO: fetch all bookmarks from Supabase
  const { data } = await supabase.from("bookmarks").select("*");
  return data as Bookmark[];
}

export async function createBookmark(payload: CreateBookmarkPayload): Promise<Bookmark> {
  // TODO: insert bookmark into Supabase and return it
  const dataToInsert = {
    title: payload.title,
    url: payload.url,
    tags: payload.tags ?? [],
  }
  
  const { data, error } = await supabase.from("bookmarks").insert(dataToInsert).select().single();

  if (error) console.error(error);;

  return data!;
}

export async function updateBookmark(id: string, payload: UpdateBookmarkPayload): Promise<Bookmark> {
  // TODO: update bookmark by id in Supabase and return it
  const dataToUpdate: Partial<UpdateBookmarkPayload> = {}
  if(payload.title) dataToUpdate.title = payload.title;
  if(payload.url) dataToUpdate.url = payload.url;
  if(payload.tags) dataToUpdate.tags = payload.tags;

  const { data, error } = await supabase.from("bookmarks").update(dataToUpdate).eq("id", id).select().single();

  if (error) {
    console.error(error);
  };
    
  return data!;
}

export async function deleteBookmark(id: string): Promise<Bookmark> {
  // TODO: delete bookmark by id in Supabase and return it
  const { data, error } = await supabase.from("bookmarks").delete().eq("id", id).select().single();
  if (error) console.error(error);;

  return data!;
}
