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
    // public getAll(): Promise<IClinic[]> {
    //     return clinicRepository.getAll();
    // }

    // public create(body: IClinicCreateDTO, userId: string): Promise<IClinic> {
    //     const clinicData: IClinicModelDTO = {
    //         ...body,
    //         userIds: [userId],
    //     };
    //
    //     return clinicRepository.create(clinicData);
    // }

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
        // Проверка — есть ли такая клиника по имени
        let existingClinic = await Clinic.findOne({ name: body.name });

        if (existingClinic) {
            // Если клиника есть и userId уже есть — вернуть её
            if (existingClinic.userIds.includes(userId)) {
                return existingClinic;
            }

            // Если userId нет — добавляем
            existingClinic.userIds.push(userId);
            await existingClinic.save();
            return existingClinic;
        }

        // Если такой клиники ещё нет — создаём новую
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
