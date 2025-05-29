import {
    IDoctor,
    IDoctorCreateDTO,
    IDoctorUpdateDTO,
} from "../interfaces/doctor.interface";
import { repository } from "../repositories/repository";

class Service {
    public getAll(): Promise<IDoctor[]> {
        return repository.getAll();
    }

    public create(body: IDoctorCreateDTO): Promise<IDoctor> {
        return repository.create(body);
    }

    public getById(id: string): Promise<IDoctor> {
        return repository.getById(id);
    }

    public updateById(id: string, body: IDoctorUpdateDTO): Promise<IDoctor> {
        return repository.updateById(id, body);
    }

    public deleteById(id: string): Promise<IDoctor> {
        return repository.deleteById(id);
    }
}

export const service = new Service();
