export class ApiError extends Error {
  isOperational: boolean = true;
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
  }
}
