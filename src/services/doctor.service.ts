import {
    IDoctor,
    IDoctorCreateDTO,
    IDoctorUpdateDTO,
} from "../interfaces/doctor.interface";
import { doctorRepository } from "../repositories/doctor.repository";

class DoctorService {
    public getAll(): Promise<IDoctor[]> {
        return doctorRepository.getAll();
    }

    public create(doctor: IDoctorCreateDTO): Promise<IDoctor> {
        return doctorRepository.create(doctor);
    }

    public getById(doctorId: string): Promise<IDoctor> {
        return doctorRepository.getById(doctorId);
    }

    public updateById(
        doctorId: string,
        doctor: IDoctorUpdateDTO,
    ): Promise<IDoctor> {
        return doctorRepository.updateById(doctorId, doctor);
    }

    public deleteById(doctorId: string): Promise<IDoctor> {
        return doctorRepository.deleteById(doctorId);
    }
}

export const doctorService = new DoctorService();
