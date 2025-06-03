import { IClinic } from "./clinic.interface";
import { IService } from "./service.interface";

export interface IClinicsWithServices extends IClinic {
    services: IService[];
}
