import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { RecoveryValidator } from "../validators/recovery.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
);

router.post(
    "/sign-in",
    commonMiddleware.validateBody(AuthValidator.validateEmailPassword),
    authController.signIn,
);

router.get("/me", authMiddleware.checkAccessToken, authController.me);

router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.patch("/activate/:token", authController.activate);

router.post(
    "/recovery",
    commonMiddleware.validateBody(RecoveryValidator.emailSchema),
    authController.passwordRecoveryRequest,
);

router.post(
    "/recovery/:token",
    commonMiddleware.validateBody(AuthValidator.validatePassword),
    authController.recoveryPassword,
);

export const authRouter = router;
