import joi from "joi";

export class DoctorValidator {
    private static name = joi.string().min(3).max(10).trim();
    private static surname = joi.string().regex(/^[A-Z][a-z]{1,9}$/);

    public static create = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
    });
}
