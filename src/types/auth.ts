/**
 * TypeScript-Interfaces für die Authentifizierung
 */

/**
 * Request-Payload für den Login
 */
export interface LoginRequest {
  username: string;
  password: string;
  authentication_request_id: string;
}

/**
 * Error-Response vom Server
 */
export interface ErrorResponse {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

/**
 * Ergebnis eines Login-Versuchs
 */
export interface LoginResult {
  success: boolean;
  error?: string;
}
