// src/app/features/auth/utils/token.utils.ts
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/app/features/auth/models/decoded-token.interface';
import { JWT_CLAIMS } from '@/app/features/auth/constants/jwt-claims.constants';

export class TokenUtils {
  static decode(token: string): DecodedToken | null {
    try {
      const cleanToken = token.replace('Bearer ', '');
      return jwtDecode<DecodedToken>(cleanToken);
    } catch {
      return null;
    }
  }

  static isExpired(decodedToken: DecodedToken): boolean {
    if (!decodedToken.exp) return true;
    const expirationDate = decodedToken.exp * 1000;
    return expirationDate < Date.now();
  }

  static getRoles(decodedToken: DecodedToken): string[] {
    const roles = decodedToken[JWT_CLAIMS.ROLE];
    if (!roles) return [];
    return Array.isArray(roles) ? roles : [roles];
  }

  static getEmail(decodedToken: DecodedToken): string {
    return decodedToken[JWT_CLAIMS.EMAIL];
  }

  static hasRole(decodedToken: DecodedToken, role: string): boolean {
    return this.getRoles(decodedToken).includes(role);
  }
}
