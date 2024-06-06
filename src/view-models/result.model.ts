export class Result<T, E = string[]> {
  message: string;
  success: boolean;
  data: T;
  error?: E;

  constructor(message: string, success: boolean, data: T, error?: E) {
    this.message = message;
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
