import {Resolutions} from "../db/enum";
import {ERRORS} from "../variables/errors";
import {errors} from "../db/db";
import {createErrorMessage} from "./libFunc";


const isValidInputFunc = (fieldName: string, value: string, maxLength: number) => {
    if (value) {
        const valueLength = value.trim().length
        if (valueLength < maxLength && valueLength > 0) {
            return true
        } else {
            errors.errorsMessages.push(createErrorMessage(fieldName, maxLength))
            return false
        }
    } else {
        errors.errorsMessages.push(createErrorMessage(fieldName, maxLength))
        return false
    }

}

const errorMessageREsolutionsFunc = () => {
    errors.errorsMessages.push({
        message: `At least one resolution should be added: ${Object.values(Resolutions).join(',')}`,
        field: 'availableResolutions'

    })
}

const isValidResolutionsFunc = (availableResolutions: Resolutions[]) => {

    if (availableResolutions.length) {
        const isValidResolutions = !availableResolutions.some(el => !Object.values(Resolutions).includes(el))
        if (isValidResolutions) {
            return true
        } else {
            errorMessageREsolutionsFunc()
            return false
        }

    } else {
        errorMessageREsolutionsFunc()
        return false
    }
}


export const isCreateVideoRequestValid = (title: string, author: string, availableResolutions: Resolutions[]) => {
    const isValidTitle = isValidInputFunc('title', title, ERRORS.MAX_LENGTH.TITLE)
    const isValidAuthor = isValidInputFunc('author', author, ERRORS.MAX_LENGTH.AUTHOR)
    const isValidResolutions = isValidResolutionsFunc(availableResolutions);
    return isValidTitle && isValidAuthor && isValidResolutions

}

