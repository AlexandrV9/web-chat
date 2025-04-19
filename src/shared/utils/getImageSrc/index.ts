import { HOST_RESOURCES } from '@/shared/constants';

export const getImageSrc = (path: string) => {
  return `${HOST_RESOURCES}/${path}`;
};
