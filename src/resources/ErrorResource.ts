export interface IErrorResource {
  message: string;
  status: number;
}

export default class ErrorResource {
  private message: string;
  private code: number;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
