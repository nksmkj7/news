import { ErrorCode } from './error-code';

export class ErrorException extends Error {
  public status = 500;
  public message = 'Something went wrong.';
  constructor(
    code: string = ErrorCode.UnknownError,
    message = 'Something went wrong.',
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 500;
    this.message = message;
    switch (code) {
      case ErrorCode.AsyncError:
        this.status = 400;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      case ErrorCode.BadRequest:
        this.status = 400;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
