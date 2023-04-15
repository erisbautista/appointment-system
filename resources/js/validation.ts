export interface Status {
    valid: boolean;
    message?: string;
}

type Rule = (value: string, valueTwo?: string) => Status;

export const passwordMatch: Rule = (
    value: string,
    valueTwo?: string
): Status => {
    const result = Boolean(value === valueTwo);
    return {
        valid: result,
        message: result ? undefined : `Password doesn't match`,
    };
};

export function length({ min, max }: { min: number; max: number }): Rule {
    return function (value: string): Status {
        const result = Boolean(value.length >= min && value.length <= max);

        return {
            valid: result,
            message: result
                ? undefined
                : `This field must be between ${min} and ${max}`,
        };
    };
}

export const required: Rule = (value: string): Status => {
    const result = Boolean(value);

    return {
        valid: result,
        message: result ? undefined : `This field is required`,
    };
};

export function validate(
    value: string,
    rules: Rule[],
    valueTwo?: string
): Status {
    for (const rule of rules) {
        const result = rule(value, valueTwo);
        if (result.valid === false) {
            return result;
        }
    }
    return {
        valid: true,
    };
}
