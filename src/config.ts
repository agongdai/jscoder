import { HttpStatusCode } from '@joy/types/api';

export const MOBILE_QUERY: string = '(max-width: 768px)';

/** Side bar width in rem */
export const SIDEBAR_WIDTH_DESKTOP: number = 22;
export const SIDEBAR_WIDTH_TABLET: number = 6;

export const PRICE_MAX_DECIMAL_PLACES: number = 8;
export const PRICE_DEFAULT_DECIMAL_PLACES: number = 3;

export const HttpStatusMessage: Record<HttpStatusCode, string> = {
  [HttpStatusCode.Ok]: 'Ok',
  [HttpStatusCode.Created]: 'Created',
  [HttpStatusCode.BadRequest]: 'Bad request',
  [HttpStatusCode.Unauthorized]: 'Unauthorized',
  [HttpStatusCode.NotFound]: 'Not found',
  [HttpStatusCode.InternalServerError]: 'Internal server error',
  [HttpStatusCode.Conflict]: 'Conflict',
  [HttpStatusCode.UnprocessableEntity]: 'Unprocessable entity',
  [HttpStatusCode.TooManyRequests]: 'Too many requests',
  [HttpStatusCode.AlreadyReported]: 'Already reported',
  [HttpStatusCode.Redirect]: 'Redirect',
  [HttpStatusCode.PreconditionFailed]: 'Precondition failed',
  [HttpStatusCode.NotAcceptable]: 'Not acceptable',
  [HttpStatusCode.Forbidden]: 'Forbidden',
};
