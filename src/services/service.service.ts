import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQuery } from "../interfaces/query.interface";
import {
    IService,
    IServiceCreateDTO,
    IServiceModelDTO,
    IServiceUpdateDTO,
} from "../interfaces/service.interface";
import { clinicRepository } from "../repositories/clinic.repository";
import { serviceRepository } from "../repositories/service.repository";

class ServiceService {
    public async getAll(query: IQuery): Promise<IPaginatedResponse<IService>> {
        const [services, totalItems] = await serviceRepository.getAll(query);

        if (!services) {
            throw new ApiError("Services not found", StatusCodesEnum.NOT_FOUND);
        }

        const totalPages = Math.ceil(totalItems / query.pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data: services,
        };
    }

    public async create(
        body: IServiceCreateDTO,
        userId: string,
    ): Promise<IService> {
        const service = await serviceRepository.getOne({
            specialization: body.specialization,
        });

        const clinic = await clinicRepository.getById(body.clinicId);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        if (!clinic.userIds.includes(userId)) {
            await clinicRepository.addUserToClinic(
                clinic._id.toString(),
                userId,
            );
        }

        if (service) {
            let updatedService = service;

            updatedService = await serviceRepository.addUserAndClinicToService(
                service._id.toString(),
                userId,
                body.clinicId,
            );

            return updatedService;
        }

        const serviceData: IServiceModelDTO = {
            specialization: body.specialization,
            userIds: [userId],
            clinicIds: [body.clinicId],
        };

        return await serviceRepository.create(serviceData);
    }

    public async getById(id: string): Promise<IService> {
        const service = await serviceRepository.getById(id);

        if (!service) {
            throw new ApiError("Service not found", StatusCodesEnum.NOT_FOUND);
        }

        return service;
    }

    public async updateById(
        id: string,
        body: IServiceUpdateDTO,
    ): Promise<IService> {
        const service = await serviceRepository.updateById(id, body);

        if (!service) {
            throw new ApiError("Service not found", StatusCodesEnum.NOT_FOUND);
        }

        return service;
    }

    public async deleteById(id: string): Promise<IService> {
        const service = await serviceRepository.deleteById(id);

        if (!service) {
            throw new ApiError("Service not found", StatusCodesEnum.NOT_FOUND);
        }

        return service;
    }
}

export const serviceService = new ServiceService();
