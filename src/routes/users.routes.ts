import { Router } from "express";
import * as UsersControllers from "../controllers/UsersControllers";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/Auth";

const router = Router();

router.get("/ping", UsersControllers.ping);

router.post("/users", UsersControllers.store);
router.put(
  "/users",
  upload.single("avatar_url"),
  AuthMiddleware,
  UsersControllers.update
);
router.post("/users/auth", UsersControllers.auth);

router.post("/users/refresh", UsersControllers.refresh);

export default router;
