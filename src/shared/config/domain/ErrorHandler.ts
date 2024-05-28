export class ErrorHandler extends Error {
  constructor(public statusCode: number, public code: number, public message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.code = code;
  }
}
