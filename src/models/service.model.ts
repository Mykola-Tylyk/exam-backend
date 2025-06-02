import { model, Schema } from "mongoose";

import { IService } from "../interfaces/service.interface";
import { Clinic } from "./clinic.model";
import { User } from "./user.model";

const serviceSchema = new Schema(
    {
        specialization: { type: String, required: true },
        userIds: [{ type: Schema.Types.ObjectId, required: true, ref: User }],
        clinicIds: [
            { type: Schema.Types.ObjectId, required: true, ref: Clinic },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Service = model<IService>("service", serviceSchema);
