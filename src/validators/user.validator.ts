import joi from "joi";

import { ClinicQuerySortEnum } from "../enums/clinic-query-sort.enum";
import { RegexEnum } from "../enums/regex.enum";
import { ServiceQuerySortEnum } from "../enums/service-query-sort.enum";
import { UserQuerySortEnum } from "../enums/user-query-sort.enum";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static name = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static telephone = joi.string().regex(RegexEnum.TELEPHONE);

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        telephone: this.telephone.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        telephone: this.telephone.required(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        userSearch: joi.string().trim(),
        clinicSearch: joi.string().trim(),
        serviceSearch: joi.string().trim(),
        userSort: joi
            .string()
            .valid(
                ...Object.values(UserQuerySortEnum),
                ...Object.values(UserQuerySortEnum).map((item) => `-${item}`),
            ),
        clinicSort: joi
            .string()
            .valid(
                ...Object.values(ClinicQuerySortEnum),
                ...Object.values(ClinicQuerySortEnum).map((item) => `-${item}`),
            ),
        serviceSort: joi
            .string()
            .valid(
                ...Object.values(ServiceQuerySortEnum),
                ...Object.values(ServiceQuerySortEnum).map(
                    (item) => `-${item}`,
                ),
            ),
    });
}
