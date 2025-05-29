import { Router } from "express";

import { doctorRouter } from "./doctor.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);

router.use("/doctors", doctorRouter);

export const apiRouter = router;
