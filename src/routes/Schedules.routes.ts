import { Router } from "express";
import * as schedulesController from "../controllers/SchedulesControllers";
import { AuthMiddleware } from "../middlewares/Auth";

const router = Router();

router.post("/schedules", AuthMiddleware, schedulesController.create);
router.get("/schedules", AuthMiddleware, schedulesController.index);
router.put("/schedules/:id", AuthMiddleware, schedulesController.update);

export default router;
