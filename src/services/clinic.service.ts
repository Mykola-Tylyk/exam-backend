import {
    IClinic,
    IClinicCreateDTO,
    IClinicModelDTO,
    IClinicUpdateDTO,
} from "../interfaces/clinic.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQuery } from "../interfaces/query.interface";
import { Clinic } from "../models/clinic.model";
import { clinicRepository } from "../repositories/clinic.repository";

class ClinicService {
    public async getAll(query: IQuery): Promise<IPaginatedResponse<IClinic>> {
        const [data, totalItems] = await clinicRepository.getAll(query);

        const totalPages = Math.ceil(totalItems / query.pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    }

    public async create(
        body: IClinicCreateDTO,
        userId: string,
    ): Promise<IClinic> {
        let existingClinic = await Clinic.findOne({ name: body.name });

        if (existingClinic) {
            if (existingClinic.userIds.includes(userId)) {
                return existingClinic;
            }

            existingClinic.userIds.push(userId);
            await existingClinic.save();
            return existingClinic;
        }

        const clinicData: IClinicModelDTO = {
            name: body.name,
            userIds: [userId],
        };

        return await clinicRepository.create(clinicData);
    }

    public getById(id: string): Promise<IClinic> {
        return clinicRepository.getById(id);
    }

    public updateById(id: string, body: IClinicUpdateDTO): Promise<IClinic> {
        return clinicRepository.updateById(id, body);
    }

    public deleteById(id: string): Promise<IClinic> {
        return clinicRepository.deleteById(id);
    }
}

export const clinicService = new ClinicService();
