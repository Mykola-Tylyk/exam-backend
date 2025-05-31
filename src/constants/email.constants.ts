import { EmailEnum } from "../enums/email.enum";

type IEmailData = {
    subject: string;
    template: string;
};

type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: IEmailData;
};

export const emailConstants: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.ACTIVATE]: { subject: "Activate", template: "activate" },
    [EmailEnum.RECOVERY]: { subject: "Recovery", template: "recovery" },
};

export type { IEmailConstants, IEmailData };
