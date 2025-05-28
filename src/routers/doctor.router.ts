import { Router } from "express";

import { doctorController } from "../controllers/doctor.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { DoctorValidator } from "../validators/doctor.validator";

const router = Router();

router.get("/", doctorController.getAll);

router.post(
    "/",
    commonMiddleware.validateBody(DoctorValidator.create),
    doctorController.create,
);

router.get("/:id", doctorController.getById);

router.put("/:id", doctorController.updateById);

router.delete("/:id", doctorController.deleteById);

export const doctorRouter = router;
