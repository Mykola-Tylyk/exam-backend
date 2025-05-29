import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}
