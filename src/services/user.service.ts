import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IClinic } from "../interfaces/clinic.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQuery } from "../interfaces/query.interface";
import { IService } from "../interfaces/service.interface";
import { IUser } from "../interfaces/user.interface";
import { IUserWithClinicsAndServices } from "../interfaces/user-with-clinics-and-services.interface";
import { clinicRepository } from "../repositories/clinic.repository";
import { serviceRepository } from "../repositories/service.repository";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll(
        query: IQuery,
    ): Promise<IPaginatedResponse<IUserWithClinicsAndServices>> {
        let [users, totalItems] = await userRepository.getAll(query);

        if (!users) {
            throw new ApiError("Users not found", StatusCodesEnum.NOT_FOUND);
        }

        const totalPages = Math.ceil(totalItems / query.pageSize);

        const userIds = users.map((user) => user._id.toString());

        const [clinics] = await clinicRepository.getAll(query, userIds);

        const clinicsByUserId = new Map<string, IClinic[]>();
        for (const clinic of clinics) {
            for (const uid of clinic.userIds) {
                const userIdStr = uid.toString();
                const list = clinicsByUserId.get(userIdStr) || [];
                list.push(clinic);
                clinicsByUserId.set(userIdStr, list);
            }
        }

        const [services] = await serviceRepository.getAll(query, userIds);

        const servicesByUserId = new Map<string, IService[]>();
        for (const service of services) {
            for (const uid of service.userIds) {
                const userIdStr = uid.toString();
                const list = servicesByUserId.get(userIdStr) || [];
                list.push(service);
                servicesByUserId.set(userIdStr, list);
            }
        }

        if (query.clinicSearch) {
            const userIdsFromClinics = new Set<string>();
            for (const clinic of clinics) {
                clinic.userIds.forEach((id) =>
                    userIdsFromClinics.add(id.toString()),
                );
            }

            users = users.filter((user) =>
                userIdsFromClinics.has(user._id.toString()),
            );
        }

        if (query.serviceSearch) {
            const userIdsFromServices = new Set<string>();
            for (const service of services) {
                service.userIds.forEach((id) =>
                    userIdsFromServices.add(id.toString()),
                );
            }

            users = users.filter((user) =>
                userIdsFromServices.has(user._id.toString()),
            );
        }

        if (query.clinicSearch || query.serviceSearch) {
            totalItems = users.length;
        }

        const dataWithClinicsAndServices: IUserWithClinicsAndServices[] =
            users.map((user) => ({
                ...user,
                clinics: clinicsByUserId.get(user._id.toString()) || [],
                services: servicesByUserId.get(user._id.toString()) || [],
            }));

        return {
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages,
            data: dataWithClinicsAndServices,
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
        const user = await userRepository.getById(userId);

        if (!user) {
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

    public async blockUser(user_id: string): Promise<IUser> {
        const user = await userRepository.blockUser(user_id);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }

    public async unBlockUser(user_id: string): Promise<IUser> {
        const user = await userRepository.unBlockUser(user_id);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }

    public async getByEmail(email: string): Promise<IUser> {
        const user = await userRepository.getByEmail(email);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }
}

export const userService = new UserService();
