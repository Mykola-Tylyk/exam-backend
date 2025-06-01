import { IClinic } from "./clinic.interface";
import { IUser } from "./user.interface";

export interface IUserWithClinics extends IUser {
    clinics: IClinic[];
}
