import { isAxiosError } from 'axios';

interface BackendErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = 'Something went wrong',
): string => {
  if (isAxiosError<BackendErrorResponse>(error)) {
    const data = error.response?.data;

    if (data?.message) {
      if (Array.isArray(data.message)) {
        return data.message.join(', ');
      }
      return data.message;
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return defaultMessage;
};
