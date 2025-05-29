import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IToken extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

interface ITokenPayload {
    userId: string;
    role: RoleEnum;
}

type ITokenModel = Pick<IToken, "accessToken" | "refreshToken" | "_userId">;

type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

type IRefresh = Pick<IToken, "refreshToken">;

export { IRefresh, IToken, ITokenModel, ITokenPair, ITokenPayload };
