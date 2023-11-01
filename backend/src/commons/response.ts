export class ResponseError {
  constructor(infoMessage: string, error?: any) {
    this.statusCode = error.status || 500;
    this.success = false;
    this.message = infoMessage;
    this.error = error.response || error.message || error;
  }

  message: string;
  data: any[];
  error: any;
  success: boolean;
  statusCode: number;
}

export class ResponseSuccess {
  constructor(infoMessage: string, data?: any, statusCode?: number) {
    this.statusCode = statusCode || 200;
    this.success = true;
    this.message = infoMessage;
    this.data = data;
  }
  message: string;
  data: any[];
  success: boolean;
  statusCode: number;
}
