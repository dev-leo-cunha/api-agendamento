import { Router } from "express";
import * as UsersControllers from "../controllers/usersControllers";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/ping", UsersControllers.ping);

router.post("/users", UsersControllers.store);
router.put("/users", upload.single("avatar_url"),AuthMiddleware, UsersControllers.update);
router.post("/users/auth", UsersControllers.auth);

export default router;
