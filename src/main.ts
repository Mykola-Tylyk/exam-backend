/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { swaggerDocument, swaggerUI } from "./configs/swagger.config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/", apiRouter);

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message ?? "Something went wrong";
        res.status(status).json({ status, message });
    },
);

process.on("uncaughtException", (err) => {
    console.log("uncaughtException:", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connection to DB...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("Database available!!!");
        } catch (e) {
            console.log("Database unavailable, wait 3 second");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, async () => {
            console.log(`Server listening on ${config.PORT}`);
            await cronRunner();
        });
    } catch (e) {
        console.log("Error start:", e);
    }
};

start();
