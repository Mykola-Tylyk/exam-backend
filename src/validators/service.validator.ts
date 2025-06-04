import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";
import { ServiceQuerySortEnum } from "../enums/service-query-sort.enum";

export class ServiceValidator {
    private static specialization = joi
        .string()
        .regex(RegexEnum.SPECIALIZATION);
    private static clinicId = joi
        .string()
        .regex(RegexEnum.OBJECT_ID)
        .required();

    public static create = joi.object({
        specialization: this.specialization.required(),
        clinicId: this.clinicId,
    });

    public static update = joi.object({
        specialization: this.specialization.required(),
        clinicId: this.clinicId,
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        serviceSearch: joi.string().trim(),
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
