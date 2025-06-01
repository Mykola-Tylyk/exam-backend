import { model, Schema } from "mongoose";

import { IClinic } from "../interfaces/clinic.interface";
import { User } from "./user.model";

const clinicSchema = new Schema(
    {
        name: { type: String, required: true },
        userIds: [{ type: Schema.Types.ObjectId, required: true, ref: User }],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Clinic = model<IClinic>("clinic", clinicSchema);
