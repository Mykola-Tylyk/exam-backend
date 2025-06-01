import { Router } from "express";

import { authRouter } from "./auth.router";
import { clinicRouter } from "./clinic.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/clinic", clinicRouter);

export const apiRouter = router;
