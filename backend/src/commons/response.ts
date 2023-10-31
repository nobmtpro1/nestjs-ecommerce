import { HttpException } from '@nestjs/common';

export interface BaseResponse<T> {
  // status: number;
  data: T;
  // errors: [];
}

export class ResponseError {
  constructor(infoMessage: string, error?: any) {
    this.statusCode = error.status || 500;
    this.success = false;
    this.message = infoMessage;
    this.error = error.response || error.message || error;
  }

  message: string;
  data: any[];
  errorMessage: any;
  error: any;
  success: boolean;
  statusCode: number;
}

export class HttpExceptionResponse extends HttpException {
  constructor(infoMessage: string, exception: string | object | any) {
    super(new ResponseError(infoMessage, exception), exception.status || 500);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class ResponseSuccess {
  constructor(infoMessage: string, data?: any, statusCode?: number) {
    this.statusCode = statusCode || 200;
    this.success = true;
    this.message = infoMessage;
    this.data = data;
  }
  message: string;
  data: any[];
  errorMessage: any;
  error: any;
  success: boolean;
  statusCode: number;
}
