import { IBase } from "./base.interface";

interface IDoctor extends IBase {
    _id: string;
    name: string;
    surname: string;
}

type IDoctorCreateDTO = Pick<IDoctor, "name" | "surname">;

type IDoctorUpdateDTO = Pick<IDoctor, "name" | "surname">;

export type { IDoctor, IDoctorCreateDTO, IDoctorUpdateDTO };
