import { Router } from "express";

import { authRouter } from "./auth.router";
import { clinicRouter } from "./clinic.router";
import { serviceRouter } from "./service.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/clinics", clinicRouter);

router.use("/services", serviceRouter);

export const apiRouter = router;
