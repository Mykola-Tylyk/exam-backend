import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQuery } from "../interfaces/query.interface";
import {
    IService,
    IServiceCreateDTO,
    IServiceModelDTO,
    IServiceUpdateDTO,
} from "../interfaces/service.interface";
import { Clinic } from "../models/clinic.model";
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
        let existingService = await Service.findOne({
            specialization: body.specialization,
        });

        if (existingService) {
            if (!existingService.userIds.includes(userId)) {
                await Clinic.findByIdAndUpdate(
                    body.clinicId,
                    { $addToSet: { userIds: userId } },
                    { new: true },
                );
                existingService.userIds.push(userId);
            }

            if (!existingService.clinicIds.includes(body.clinicId)) {
                existingService.clinicIds.push(body.clinicId);
            }

            await existingService.save();
            return existingService;
        }

        const serviceData: IServiceModelDTO = {
            specialization: body.specialization,
            userIds: [userId],
            clinicIds: [body.clinicId],
        };

        return await serviceRepository.create(serviceData);
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
