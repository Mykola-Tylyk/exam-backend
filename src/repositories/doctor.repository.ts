import {
    IDoctor,
    IDoctorCreateDTO,
    IDoctorUpdateDTO,
} from "../interfaces/doctor.interface";
import { Doctor } from "../models/doctor.model";

class DoctorRepository {
    public getAll(): Promise<IDoctor[]> {
        return Doctor.find();
    }

    public create(doctor: IDoctorCreateDTO): Promise<IDoctor> {
        return Doctor.create(doctor);
    }

    public getById(doctorId: string): Promise<IDoctor> {
        return Doctor.findById(doctorId);
    }

    public updateById(
        doctorId: string,
        doctor: IDoctorUpdateDTO,
    ): Promise<IDoctor> {
        return Doctor.findByIdAndUpdate(doctorId, doctor, { new: true });
    }

    public deleteById(doctorId: string): Promise<IDoctor> {
        return Doctor.findByIdAndDelete(doctorId);
    }
}

export const doctorRepository = new DoctorRepository();
