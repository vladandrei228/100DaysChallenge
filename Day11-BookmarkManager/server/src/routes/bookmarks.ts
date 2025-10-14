import { Router } from "express";
import type { CreateBookmarkPayload, UpdateBookmarkPayload } from "../types";
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark } from "../db/supabaeClient";

const router = Router();

// TODO: implement routes
router.get("/", async (_req, res) => {
  // TODO: get all bookmarks
  try{
    const bookmarks = await getBookmarks();
    res.json({ data: bookmarks });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post("/", async (req, res) => {
  const payload = req.body as CreateBookmarkPayload;
  // TODO: validate payload and create bookmark
  try{
    const bookmark = await createBookmark(payload);
    res.json({data: bookmark});
  }catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body as UpdateBookmarkPayload;
  // TODO: update bookmark by id
  try{
    const bookmark = await updateBookmark(id, payload);
    res.json({data: bookmark});
  }catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  // TODO: delete bookmark by id
  try{
    const bookmark = await deleteBookmark(id);
    res.json({data: bookmark});
  }catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
