import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQuery } from "../interfaces/query.interface";
import {
    IService,
    IServiceCreateDTO,
    IServiceModelDTO,
    IServiceUpdateDTO,
} from "../interfaces/service.interface";
import { Service } from "../models/service.model";
import { serviceRepository } from "../repositories/service.repository";

class ServiceService {
    public async getAll(query: IQuery): Promise<IPaginatedResponse<IService>> {
        const [data, totalItems] = await serviceRepository.getAll(query);

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
        body: IServiceCreateDTO,
        userId: string,
    ): Promise<IService> {
        let existingClinic = await Service.findOne({
            specialization: body.specialization,
        });

        if (existingClinic) {
            if (existingClinic.userIds.includes(userId)) {
                return existingClinic;
            }

            existingClinic.userIds.push(userId);
            await existingClinic.save();
            return existingClinic;
        }

        const clinicData: IServiceModelDTO = {
            specialization: body.specialization,
            userIds: [userId],
        };

        return await serviceRepository.create(clinicData);
    }

    public getById(id: string): Promise<IService> {
        return serviceRepository.getById(id);
    }

    public updateById(id: string, body: IServiceUpdateDTO): Promise<IService> {
        return serviceRepository.updateById(id, body);
    }

    public deleteById(id: string): Promise<IService> {
        return serviceRepository.deleteById(id);
    }
}

export const serviceService = new ServiceService();
