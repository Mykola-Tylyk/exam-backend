import { IBase } from "./base.interface";

interface IClinic extends IBase {
    _id: string;
    name: string;
    userIds: string[];
}

type IClinicModelDTO = Pick<IClinic, "name" | "userIds">;

type IClinicCreateDTO = Pick<IClinic, "name">;

type IClinicUpdateDTO = Pick<IClinic, "name">;

export type { IClinic, IClinicCreateDTO, IClinicModelDTO, IClinicUpdateDTO };
