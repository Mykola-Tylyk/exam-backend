import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IClinic,
    IClinicCreateDTO,
    IClinicModelDTO,
    IClinicUpdateDTO,
} from "../interfaces/clinic.interface";
import { IClinicsWithServices } from "../interfaces/clinics-with-services.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQuery } from "../interfaces/query.interface";
import { IService } from "../interfaces/service.interface";
import { clinicRepository } from "../repositories/clinic.repository";
import { serviceRepository } from "../repositories/service.repository";

class ClinicService {
    public async getAll(
        query: IQuery,
    ): Promise<IPaginatedResponse<IClinicsWithServices>> {
        let [clinics, totalItems] = await clinicRepository.getAll(query);

        if (!clinics) {
            throw new ApiError("Clinics not found", StatusCodesEnum.NOT_FOUND);
        }

        const totalPages = Math.ceil(totalItems / query.pageSize);

        const clinicIds = clinics.map((clinic) => clinic._id.toString());

        const [services] = await serviceRepository.getAll(
            query,
            undefined,
            clinicIds,
        );
        const servicesByClinicId = new Map<string, IService[]>();
        for (const service of services) {
            for (const cid of service.clinicIds) {
                const clinicIdStr = cid.toString();
                const list = servicesByClinicId.get(clinicIdStr) || [];
                list.push(service);
                servicesByClinicId.set(clinicIdStr, list);
            }
        }
        if (query.serviceSearch) {
            const clinicIdsFromServices = new Set<string>();
            for (const service of services) {
                service.clinicIds.forEach((id) =>
                    clinicIdsFromServices.add(id.toString()),
                );
            }

            clinics = clinics.filter((clinic) =>
                clinicIdsFromServices.has(clinic._id.toString()),
            );
            totalItems = clinics.length;
        }

        const dataWithServices: IClinicsWithServices[] = clinics.map(
            (clinic) => ({
                ...clinic,
                services: servicesByClinicId.get(clinic._id.toString()) || [],
            }),
        );

        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data: dataWithServices,
        };
    }

    public async create(
        body: IClinicCreateDTO,
        userId: string,
    ): Promise<IClinic> {
        const clinic = await clinicRepository.getOne({
            name: body.name,
        });

        if (clinic) {
            if (!clinic.userIds.includes(userId)) {
                await clinicRepository.addUserToClinic(
                    clinic._id.toString(),
                    userId,
                );
            }
            return await clinicRepository.addUserToClinic(
                clinic._id.toString(),
                userId,
            );
        }

        const clinicData: IClinicModelDTO = {
            name: body.name,
            userIds: [userId],
        };

        return await clinicRepository.create(clinicData);
    }

    public async getById(id: string): Promise<IClinic> {
        const clinic = await clinicRepository.getById(id);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        return clinic;
    }

    public async updateById(
        id: string,
        body: IClinicUpdateDTO,
    ): Promise<IClinic> {
        const clinic = await clinicRepository.updateById(id, body);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        return clinic;
    }

    public async deleteById(id: string): Promise<IClinic> {
        const clinic = await clinicRepository.deleteById(id);

        if (!clinic) {
            throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
        }

        return clinic;
    }
}

export const clinicService = new ClinicService();
