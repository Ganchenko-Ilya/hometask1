import { Resolutions } from '../db/enum';

export const generateUniqueId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

export const createErrorMessage = (fieldName: string, maxLength: number) => {
  return {
    message: `The ${fieldName} should be type string and should not be empty and no more than  ${maxLength} characters!!!`,
    field: fieldName,
  };
};

export const createNewDate = () => {
  const createdAtDate = new Date().toISOString();
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 1);
  const publicationDate = date.toISOString();
  return { createdAtDate, publicationDate };
};

export const createNewVideo = (title: string, author: string, availableResolutions: Resolutions[]) => ({
  id: generateUniqueId(),
  title,
  author,
  canBeDownloaded: false,
  minAgeRestriction: null,
  createdAt: createNewDate().createdAtDate,
  publicationDate: createNewDate().publicationDate,
  availableResolutions,
});

export const regDateISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|([-+]\d{2}:\d{2}))?$/;
