import {
    IDoctor,
    IDoctorCreateDTO,
    IDoctorUpdateDTO,
} from "../interfaces/doctor.interface";
import { doctorRepository } from "../repositories/doctorRepository";

class DoctorService {
    public getAll(): Promise<IDoctor[]> {
        return doctorRepository.getAll();
    }

    public create(body: IDoctorCreateDTO): Promise<IDoctor> {
        return doctorRepository.create(body);
    }

    public getById(id: string): Promise<IDoctor> {
        return doctorRepository.getById(id);
    }

    public updateById(id: string, body: IDoctorUpdateDTO): Promise<IDoctor> {
        return doctorRepository.updateById(id, body);
    }

    public deleteById(id: string): Promise<IDoctor> {
        return doctorRepository.deleteById(id);
    }
}

export const doctorService = new DoctorService();
