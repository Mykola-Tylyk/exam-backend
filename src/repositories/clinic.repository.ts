import { FilterQuery } from "mongoose";

import {
    IClinic,
    IClinicModelDTO,
    IClinicUpdateDTO,
} from "../interfaces/clinic.interface";
import { IQuery } from "../interfaces/query.interface";
import { Clinic } from "../models/clinic.model";

class ClinicRepository {
    public getAll(
        query: IQuery,
        userIds?: string[],
    ): Promise<[IClinic[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IClinic> = {};

        if (userIds?.length) {
            filterObject.userIds = { $in: userIds };
        }

        if (query.clinicSearch) {
            filterObject.$or = [
                { name: { $regex: query.clinicSearch, $options: "i" } },
            ];
        }

        return Promise.all([
            Clinic.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.clinicSort)
                .then((docs) => docs.map((doc) => doc.toJSON())),
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

    public getOne(filter: FilterQuery<IClinic>): Promise<IClinic> {
        return Clinic.findOne(filter);
    }

    public addUserToClinic(clinicId: string, userId: string): Promise<IClinic> {
        return Clinic.findByIdAndUpdate(
            clinicId,
            { $addToSet: { userIds: userId } },
            { new: true },
        );
    }
}

export const clinicRepository = new ClinicRepository();
