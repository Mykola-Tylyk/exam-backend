import { FilterQuery } from "mongoose";

import { IQuery } from "../interfaces/query.interface";
import {
    IService,
    IServiceModelDTO,
    IServiceUpdateDTO,
} from "../interfaces/service.interface";
import { Service } from "../models/service.model";

class ServiceRepository {
    public getAll(
        query: IQuery,
        userIds?: string[],
        clinicIds?: string[],
    ): Promise<[IService[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IService> = {};

        if (userIds?.length) {
            filterObject.userIds = { $in: userIds };
        }

        if (clinicIds?.length) {
            filterObject.clinicIds = { $in: clinicIds };
        }

        if (query.serviceSearch) {
            filterObject.$or = [
                {
                    specialization: {
                        $regex: query.serviceSearch,
                        $options: "i",
                    },
                },
            ];
        }

        return Promise.all([
            Service.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.serviceSort)
                .then((docs) => docs.map((doc) => doc.toJSON())),
            Service.find(filterObject).countDocuments(),
        ]);
    }

    public create(body: IServiceModelDTO): Promise<IService> {
        return Service.create(body);
    }

    public getById(id: string): Promise<IService> {
        return Service.findById(id);
    }

    public updateById(id: string, body: IServiceUpdateDTO): Promise<IService> {
        return Service.findByIdAndUpdate(id, body, { new: true });
    }

    public deleteById(id: string): Promise<IService> {
        return Service.findByIdAndDelete(id);
    }

    public getOne(filter: FilterQuery<IService>): Promise<IService> {
        return Service.findOne(filter);
    }

    public addUserAndClinicToService(
        serviceId: string,
        userId: string,
        clinicId: string,
    ): Promise<IService> {
        return Service.findByIdAndUpdate(
            serviceId,
            {
                $addToSet: {
                    userIds: userId,
                    clinicIds: clinicId,
                },
            },
            { new: true },
        );
    }
}

export const serviceRepository = new ServiceRepository();
