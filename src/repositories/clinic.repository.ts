import { FilterQuery } from "mongoose";

import {
    IClinic,
    IClinicModelDTO,
    IClinicUpdateDTO,
} from "../interfaces/clinic.interface";
import { IQuery } from "../interfaces/query.interface";
import { Clinic } from "../models/clinic.model";

class ClinicRepository {
    // public getAll(): Promise<IClinic[]> {
    //     return Clinic.find();
    // }

    public getAll(query: IQuery): Promise<[IClinic[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IClinic> = {};

        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
            ];
        }

        return Promise.all([
            Clinic.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.sort)
                .lean(),
            Clinic.find(filterObject).countDocuments(),
        ]);
    }

    public create(body: IClinicModelDTO): Promise<IClinic> {
        return Clinic.create(body);
    }

    public getById(id: string): Promise<IClinic> {
        return Clinic.findById(id);
    }

    public updateById(id: string, body: IClinicUpdateDTO): Promise<IClinic> {
        return Clinic.findByIdAndUpdate(id, body, { new: true });
    }

    public deleteById(id: string): Promise<IClinic> {
        return Clinic.findByIdAndDelete(id);
    }
}

export const clinicRepository = new ClinicRepository();
