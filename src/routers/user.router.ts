import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/userValidator";

const router = Router();

router.get("/", userController.getAll);

// router.get(
//     "/",
//     commonMiddleware.query(UserValidator.query),
//     userController.getAll,
// );

router.get("/:id", commonMiddleware.isIdValidate("id"), userController.getById);

router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateById,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    userController.deleteById,
);

// router.patch(
//     "/:id/block",
//     authMiddleware.checkAccessToken,
//     authMiddleware.isAdmin,
//     userController.blockUser,
// );
//
// router.patch(
//     "/:id/unblock",
//     authMiddleware.checkAccessToken,
//     authMiddleware.isAdmin,
//     userController.unBlockUser,
// );
//
// router.patch(
//     "/upload-avatar/:id",
//     authMiddleware.checkAccessToken,
//     upload.single("avatar"),
//     commonMiddleware.isFileExists(),
//     userController.uploadAvatar,
// );

export const userRouter = router;
