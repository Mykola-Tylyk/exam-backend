import { FilterQuery } from "mongoose";

import { IQuery } from "../interfaces/query.interface";
import {
    IService,
    IServiceModelDTO,
    IServiceUpdateDTO,
} from "../interfaces/service.interface";
import { Service } from "../models/service.model";

class ServiceRepository {
    public getAll(query: IQuery): Promise<[IService[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IService> = {};

        if (query.serviceSearch) {
            filterObject.$or = [
                { name: { $regex: query.serviceSearch, $options: "i" } },
            ];
        }

        return Promise.all([
            Service.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.sort)
                .lean(),
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
}

export const serviceRepository = new ServiceRepository();
