import joi from "joi";

import { ClinicQuerySortEnum } from "../enums/clinic-query-sort.enum";
import { RegexEnum } from "../enums/regex.enum";

export class ClinicValidator {
    private static name = joi.string().regex(RegexEnum.CLINIC);

    public static create = joi.object({
        name: this.name.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim(),
        sort: joi
            .string()
            .valid(
                ...Object.values(ClinicQuerySortEnum),
                ...Object.values(ClinicQuerySortEnum).map((item) => `-${item}`),
            ),
    });
}
