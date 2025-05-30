import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: RoleEnum;
    isDeleted: boolean;
    isVerified: boolean;
}

type IUserCreateDTO = Pick<IUser, "email" | "password">;

type IUserUpdateDTO = Pick<IUser, "email" | "password">;

export type { IUser, IUserCreateDTO, IUserUpdateDTO };
