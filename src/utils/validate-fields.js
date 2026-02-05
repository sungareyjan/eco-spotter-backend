const validateFields = (data, rules) => {
    const errors = [];

    for (const field in rules) {
        const value = data[field];
        const rule = rules[field];

        if (rule.required && (value === undefined || value === null || value === '')) {
            errors.push(field);
            continue;
        }

        if (rule.type === 'string' && typeof value !== 'string') {
            errors.push(field);
            continue;
        }

        if (rule.type === 'number' && typeof value !== 'number') {
            errors.push(field);
            continue;
        }

        if (rule.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
            errors.push(field);
            continue;
        }

        if (rule.enum && !rule.enum.includes(value)) {
            errors.push(field);
        }
    }

    return errors;
};

module.exports = validateFields;
