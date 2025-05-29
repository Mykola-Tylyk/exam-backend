import {
    IDoctor,
    IDoctorCreateDTO,
    IDoctorUpdateDTO,
} from "../interfaces/doctor.interface";
import { Doctor } from "../models/doctor.model";

class Repository {
    public getAll(): Promise<IDoctor[]> {
        return Doctor.find();
    }

    public create(body: IDoctorCreateDTO): Promise<IDoctor> {
        return Doctor.create(body);
    }

    public getById(id: string): Promise<IDoctor> {
        return Doctor.findById(id);
    }

    public updateById(id: string, body: IDoctorUpdateDTO): Promise<IDoctor> {
        return Doctor.findByIdAndUpdate(id, body, { new: true });
    }

    public deleteById(id: string): Promise<IDoctor> {
        return Doctor.findByIdAndDelete(id);
    }
}

export const repository = new Repository();
