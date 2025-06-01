import { Router } from "express";

import { serviceController } from "../controllers/service.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ServiceValidator } from "../validators/service.validator";

const router = Router();

router.get(
    "/",
    commonMiddleware.query(ServiceValidator.query),
    serviceController.getAll,
);

router.get(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    serviceController.getById,
);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(ServiceValidator.create),
    serviceController.create,
);

router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(ServiceValidator.update),
    serviceController.updateById,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValidate("id"),
    serviceController.deleteById,
);

export const serviceRouter = router;
