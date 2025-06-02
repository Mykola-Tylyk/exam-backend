import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IClinic } from "../interfaces/clinic.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQuery } from "../interfaces/query.interface";
import { IService } from "../interfaces/service.interface";
import { IUser } from "../interfaces/user.interface";
import { IUserWithClinicsAndServices } from "../interfaces/user-with-clinics-and-services.interface";
import { Clinic } from "../models/clinic.model";
import { Service } from "../models/service.model";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll(
        query: IQuery,
    ): Promise<IPaginatedResponse<IUserWithClinicsAndServices>> {
        const [users, totalItems] = await userRepository.getAll(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);

        const userIds = users.map((user) => user._id.toString());

        const clinics = await Clinic.find({ userIds: { $in: userIds } }).lean();

        const clinicsByUserId = new Map<string, IClinic[]>();
        for (const clinic of clinics) {
            for (const uid of clinic.userIds) {
                const userIdStr = uid.toString();
                const list = clinicsByUserId.get(userIdStr) || [];
                list.push(clinic);
                clinicsByUserId.set(userIdStr, list);
            }
        }

        const services = await Service.find({
            userIds: { $in: userIds },
        }).lean();

        const servicesByUserId = new Map<string, IService[]>();
        for (const service of services) {
            for (const uid of service.userIds) {
                const userIdStr = uid.toString();
                const list = servicesByUserId.get(userIdStr) || [];
                list.push(service);
                servicesByUserId.set(userIdStr, list);
            }
        }

        const dataWithClinics: IUserWithClinicsAndServices[] = users.map(
            (user) => ({
                ...user,
                clinics: clinicsByUserId.get(user._id.toString()) || [],
                services: servicesByUserId.get(user._id.toString()) || [],
            }),
        );

        return {
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages,
            data: dataWithClinics,
        };
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }

    public async updateById(
        userId: string,
        user: Partial<IUser>,
    ): Promise<IUser> {
        const data = await userRepository.getById(userId);

        if (!data) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return await userRepository.updateById(userId, user);
    }

    public async deleteById(userId: string): Promise<void> {
        const data = await userRepository.getById(userId);

        if (!data) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        await userRepository.deleteById(userId);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);

        if (user) {
            throw new ApiError(
                "User is already exists",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
    }

    public async isActive(id: string): Promise<boolean> {
        const user = await this.getById(id);
        return user.isActive;
    }

    public blockUser(user_id: string): Promise<IUser> {
        return userRepository.blockUser(user_id);
    }

    public unBlockUser(user_id: string): Promise<IUser> {
        return userRepository.unBlockUser(user_id);
    }

    public getByEmail(email: string): Promise<IUser> {
        return userRepository.getByEmail(email);
    }
}

export const userService = new UserService();
