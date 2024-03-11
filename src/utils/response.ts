import { ResponseT } from '../interfaces/response';
import { Response } from 'express';

export const customResponse = <T>({
  data,
  success,
  error,
  message,
  status,
}: ResponseT<T>) => {
  return {
    success,
    error,
    message,
    status,
    data,
  };
};

export const sendResponse = <T>(
  res: Response,
  data?: any,
  message: string = '',
  status: number = 200,
  error: boolean = false,
  success: boolean = true
): void => {
  const response: ResponseT<T> = {
    success,
    error,
    message,
    status,
    data,
  };

  res.status(status).send(response);
};
