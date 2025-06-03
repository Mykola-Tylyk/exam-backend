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
import { Clinic } from "../models/clinic.model";
import { Service } from "../models/service.model";
import { clinicRepository } from "../repositories/clinic.repository";

class ClinicService {
    public async getAll(
        query: IQuery,
    ): Promise<IPaginatedResponse<IClinicsWithServices>> {
        const [clinics, totalItems] = await clinicRepository.getAll(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);

        const clinicIds = clinics.map((clinic) => clinic._id.toString());

        const services = await Service.find({
            clinicIds: { $in: clinicIds },
        }).lean();

        const servicesByClinicId = new Map<string, IService[]>();
        for (const service of services) {
            for (const uid of service.clinicIds) {
                const clinicIdStr = uid.toString();
                const list = servicesByClinicId.get(clinicIdStr) || [];
                list.push(service);
                servicesByClinicId.set(clinicIdStr, list);
            }
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
