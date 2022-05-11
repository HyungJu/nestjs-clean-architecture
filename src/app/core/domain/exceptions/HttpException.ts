export declare class HttpException extends Error {
  private readonly response;
  private readonly status;

  constructor(response: string | Record<string, any>, status: number);

  static createBody(objectOrError: object | string, description?: string, statusCode?: number): object;

  initMessage(): void;

  initName(): void;

  getResponse(): string | object;

  getStatus(): number;
}
