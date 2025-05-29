import { Router } from "express";

import { controller } from "../controllers/controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { DoctorValidator } from "../validators/doctorValidator";

const router = Router();

router.get("/", controller.getAll);

router.post(
    "/",
    commonMiddleware.validateBody(DoctorValidator.create),
    controller.create,
);

router.get("/:id", commonMiddleware.isIdValidate("id"), controller.getById);

router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(DoctorValidator.update),
    controller.updateById,
);

router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    controller.deleteById,
);

export const doctorRouter = router;
