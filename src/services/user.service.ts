import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IUser, IUserUpdateDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
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
        user: IUserUpdateDTO,
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
}

export const userService = new UserService();
