import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class DoctorValidator {
    private static name = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);

    public static create = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
    });
}
