export const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
}

export const createErrorMessage = (fieldName: string, maxLength: number) => {
    return {
        message: `The ${fieldName} should not be empty and no more than  ${maxLength} characters!!!`,
        field: fieldName
    }
}

export const createNewDate = () => new Date().toISOString()