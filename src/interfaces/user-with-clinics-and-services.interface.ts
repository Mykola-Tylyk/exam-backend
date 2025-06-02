import { IClinic } from "./clinic.interface";
import { IService } from "./service.interface";
import { IUser } from "./user.interface";

export interface IUserWithClinicsAndServices extends IUser {
    clinics: IClinic[];
    services: IService[];
}
