import { Router } from "express";

import { clinicController } from "../controllers/clinic.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ClinicValidator } from "../validators/clinic.validator";

const router = Router();

router.get(
    "/",
    commonMiddleware.query(ClinicValidator.query),
    clinicController.getAll,
);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(ClinicValidator.create),
    clinicController.create,
);

router.get(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    clinicController.getById,
);

router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(ClinicValidator.update),
    clinicController.updateById,
);

router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    clinicController.deleteById,
);

export const clinicRouter = router;
