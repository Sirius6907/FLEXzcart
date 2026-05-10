import { getAuth } from "@clerk/express";
import { Router } from "express";
import { getOrSyncUser } from "../lib/users";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await getOrSyncUser(userId);

    res.json({ user });
  } catch (e) {

    next(e);
  }
});

export default router;
