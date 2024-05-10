import { HttpStatusMessage } from '@joy/config';
import { HttpStatusCode } from '@joy/types/api';

export const apiSuccess = <T>(data: T) => ({
  data,
  success: true,
  message: HttpStatusMessage[HttpStatusCode.Ok],
});

export const restApiSuccess = <T>(data: T) =>
  Response.json({
    data,
    success: true,
    message: HttpStatusMessage[HttpStatusCode.Ok],
  });

export const apiFailure = (status = HttpStatusCode.InternalServerError, message?: string) => ({
  message:
    message || HttpStatusMessage[status] || HttpStatusMessage[HttpStatusCode.InternalServerError],
  status,
  success: false,
});

export const restApiFailure = (status = HttpStatusCode.InternalServerError, message?: string) =>
  Response.json({
    message:
      message || HttpStatusMessage[status] || HttpStatusMessage[HttpStatusCode.InternalServerError],
    status,
    success: false,
  });
