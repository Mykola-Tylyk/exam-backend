import { Router } from "express";

import { doctorController } from "../controllers/doctorController";
import { commonMiddleware } from "../middlewares/common.middleware";
import { DoctorValidator } from "../validators/doctorValidator";

const router = Router();

router.get("/", doctorController.getAll);

router.post(
    "/",
    commonMiddleware.validateBody(DoctorValidator.create),
    doctorController.create,
);

router.get(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    doctorController.getById,
);

router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(DoctorValidator.update),
    doctorController.updateById,
);

router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    doctorController.deleteById,
);

export const doctorRouter = router;
