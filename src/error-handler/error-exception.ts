import { ErrorCode } from './error-code';

export class ErrorException extends Error {
  public status: number = 500;
  public message: string = "Something went wrong."
  constructor(code: string = ErrorCode.UnknownError, message: string = "Something went wrong.",metaData: any = null) {
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
      default:
        this.status = 500;
        break;
    }
  }
}