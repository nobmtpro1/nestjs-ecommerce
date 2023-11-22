export class ResponseError {
  constructor(message: string, statusCode?: any) {
    this.statusCode = statusCode || 500;
    this.success = false;
    this.message = message;
  }

  message: string;
  success: boolean;
  statusCode: number;
}

export class ResponseSuccess {
  constructor(message: string, data?: any, statusCode?: number) {
    this.statusCode = statusCode || 200;
    this.success = true;
    this.message = message;
    this.data = data;
  }
  message: string;
  data: any[];
  success: boolean;
  statusCode: number;
}
