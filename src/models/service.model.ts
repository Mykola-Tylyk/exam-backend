import { model, Schema } from "mongoose";

import { IService } from "../interfaces/service.interface";
import { User } from "./user.model";

const serviceSchema = new Schema(
    {
        specialization: { type: String, required: true },
        userIds: [{ type: Schema.Types.ObjectId, required: true, ref: User }],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Service = model<IService>("service", serviceSchema);
