import { Resolutions } from '../db/enum';
import { ERRORS } from '../variables/errors';
import { errors, getErrors } from '../db/db';
import { createErrorMessage } from './libFunc';
import { ReqPutType } from '../db/types';

const isValidInputFunc = (fieldName: string, value: string, maxLength: number) => {
  if (value) {
    const valueLength = value.trim().length;
    if (valueLength < maxLength && valueLength > 0) {
      return true;
    } else {
      errors.errorsMessages.push(createErrorMessage(fieldName, maxLength));
      return false;
    }
  } else {
    errors.errorsMessages.push(createErrorMessage(fieldName, maxLength));
    return false;
  }
};

const errorMessageREsolutionsFunc = () => {
  errors.errorsMessages.push({
    message: `At least one resolution should be added: ${Object.values(Resolutions).join(',')}`,
    field: 'availableResolutions',
  });
};

const isValidResolutionsFunc = (availableResolutions: Resolutions[]) => {
  if (availableResolutions.length) {
    const isValidResolutions = !availableResolutions.some((el) => !Object.values(Resolutions).includes(el));
    if (isValidResolutions) {
      return true;
    } else {
      errorMessageREsolutionsFunc();
      return false;
    }
  } else {
    errorMessageREsolutionsFunc();
    return false;
  }
};

const isValidMinAgeRestriction = (age: number | null) => {
  if (typeof age === 'object') {
    return true;
  }
  const numberAge = +age;
  if (typeof numberAge === 'number' && age <= 18 && age > 0) {
    return true;
  } else {
    errors.errorsMessages.push({
      message: 'Age from 1 to 18 inclusive, or without restriction.',
      field: 'minAgeRestriction',
    });
    return false;
  }
};

export const isCreateVideoRequestValid = (title: string, author: string, availableResolutions: Resolutions[]) => {
  const isValidTitle = isValidInputFunc('title', title, ERRORS.MAX_LENGTH.TITLE);
  const isValidAuthor = isValidInputFunc('author', author, ERRORS.MAX_LENGTH.AUTHOR);
  const isValidResolutions = isValidResolutionsFunc(availableResolutions);
  return isValidTitle && isValidAuthor && isValidResolutions;
};

const isBoolean = (value: any) => {
  if (typeof value === 'boolean') {
    return true;
  } else {
    errors.errorsMessages.push({
      message: "The value must be either 'true' or 'false'",
      field: 'canBeDownloaded',
    });
    return false;
  }
};

const isPublicationDateValid = (publicationDate: string) => {
  const reg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|([-+]\d{2}:\d{2}))?$/;

  if (reg.test(publicationDate)) {
    return true;
  } else {
    errors.errorsMessages.push({
      message: 'Need ISO format',
      field: 'publicationDate',
    });
  }
};

export const isChangeVideoRequestValid = (body: ReqPutType) => {
  const { minAgeRestriction, canBeDownloaded, author, availableResolutions, title, publicationDate } = body;
  isCreateVideoRequestValid(title, author, availableResolutions);
  isValidMinAgeRestriction(minAgeRestriction);
  isBoolean(canBeDownloaded);
  isPublicationDateValid(publicationDate);
  return !getErrors().errorsMessages.length;
};
