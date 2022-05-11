export interface JwtService {
  sign(payload: unknown): string;
}
