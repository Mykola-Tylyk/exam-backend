import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";
import { ServiceQuerySortEnum } from "../enums/service-query-sort.enum";

export class ServiceValidator {
    private static specialization = joi
        .string()
        .regex(RegexEnum.SPECIALIZATION);

    public static create = joi.object({
        specialization: this.specialization.required(),
    });

    public static update = joi.object({
        specialization: this.specialization.required(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim(),
        sort: joi
            .string()
            .valid(
                ...Object.values(ServiceQuerySortEnum),
                ...Object.values(ServiceQuerySortEnum).map(
                    (item) => `-${item}`,
                ),
            ),
    });
}
