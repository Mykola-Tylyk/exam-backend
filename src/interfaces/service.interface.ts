import { IBase } from "./base.interface";

interface IService extends IBase {
    _id: string;
    specialization: string;
    userIds: string[];
}

type IServiceModelDTO = Pick<IService, "specialization" | "userIds">;

type IServiceCreateDTO = Pick<IService, "specialization">;

type IServiceUpdateDTO = Pick<IService, "specialization">;

export type {
    IService,
    IServiceCreateDTO,
    IServiceModelDTO,
    IServiceUpdateDTO,
};
