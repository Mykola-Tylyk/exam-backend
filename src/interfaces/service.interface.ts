import { IBase } from "./base.interface";

interface IService extends IBase {
    _id: string;
    specialization: string;
    userIds: string[];
    clinicIds: string[];
}

type IServiceModelDTO = Pick<
    IService,
    "specialization" | "userIds" | "clinicIds"
>;

type IServiceCreateDTO = {
    specialization: string;
    clinicId: string;
};

// type IServiceCreateDTO = Pick<IService, "specialization" | "clinicIds">;

type IServiceUpdateDTO = Pick<IService, "specialization" | "clinicIds">;

export type {
    IService,
    IServiceCreateDTO,
    IServiceModelDTO,
    IServiceUpdateDTO,
};
