export const RegexEnum = {
    PASSWORD: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/,
    NAME: /^[A-Z][a-z]{1,19}$/,
    TELEPHONE: /^\+380\d{9}$/,
    CLINIC: /^(?=.{1,40}$)([A-Za-z]+(-[A-Za-z]+)?)( [A-Za-z]+(-[A-Za-z]+)?)*$/,
    SPECIALIZATION:
        /^(?=.{1,20}$)([A-Za-z]+(-[A-Za-z]+)?)( [A-Za-z]+(-[A-Za-z]+)?)*$/,
};
