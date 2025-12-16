import { JWT_CLAIMS } from "@/app/features/auth/constants/jwt-claims.constants";

export interface DecodedToken {
  [JWT_CLAIMS.EMAIL]: string;
  [JWT_CLAIMS.ROLE]: string | string[];
  exp?: number;
  iss?: string;
  aud?: string;
}
