import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IClinic } from "../interfaces/clinic.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IQuery } from "../interfaces/query.interface";
import { IUser } from "../interfaces/user.interface";
import { IUserWithClinics } from "../interfaces/user-with-clinics.interface";
import { Clinic } from "../models/clinic.model";
import { userRepository } from "../repositories/user.repository";

class UserService {
    // public async getAll(query: IUserQuery): Promise<IPaginatedResponse<IUser>> {
    //     const [data, totalItems] = await userRepository.getAll(query);
    //
    //     const totalPages = Math.ceil(totalItems / query.pageSize);
    //     return {
    //         totalItems,
    //         totalPages,
    //         prevPage: !!(query.page - 1),
    //         nextPage: query.page + 1 <= totalPages,
    //         data,
    //     };
    // }

    // public async getAll(
    //     query: IUserQuery,
    // ): Promise<IPaginatedResponse<IUserWithClinics>> {
    //     const [users, totalItems] = await userRepository.getAll(query); // вызов из репозитория
    //     const totalPages = Math.ceil(totalItems / query.pageSize);
    //
    //     const userIds = users.map((user) => user._id.toString());
    //
    //     // Получаем клиники, принадлежащие пользователям из списка
    //     const clinics = await Clinic.find({ _userId: { $in: userIds } }).lean();
    //     // Группируем клиники по _userId
    //     const clinicsByUserId = new Map<string, IClinic[]>();
    //     for (const clinic of clinics) {
    //         const userIdStr = clinic._userId.toString(); // Преобразуем ObjectId в строку
    //         const list = clinicsByUserId.get(userIdStr) || [];
    //         list.push(clinic);
    //         clinicsByUserId.set(userIdStr, list);
    //     }
    //
    //     // Добавляем клиники в каждый объект пользователя
    //     const dataWithClinics: IUserWithClinics[] = users.map((user) => ({
    //         ...user,
    //         clinics: clinicsByUserId.get(user._id.toString()) || [],
    //     }));
    //
    //     return {
    //         totalItems,
    //         totalPages,
    //         prevPage: query.page > 1,
    //         nextPage: query.page < totalPages,
    //         data: dataWithClinics,
    //     };
    // }

    public async getAll(
        query: IQuery,
    ): Promise<IPaginatedResponse<IUserWithClinics>> {
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

        const dataWithClinics: IUserWithClinics[] = users.map((user) => ({
            ...user,
            clinics: clinicsByUserId.get(user._id.toString()) || [],
        }));

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
