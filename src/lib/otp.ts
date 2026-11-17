import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

const DOWNLOAD_SECRET = new TextEncoder().encode(
  process.env.DOWNLOAD_JWT_SECRET || 'compete-academy-download-token-secret-salt-2026'
);

export interface DownloadTokenPayload {
  studentId: string;
  studentName: string;
  mobile: string;
  resourceId: string;
  downloadType: string;
  examCategory?: string;
  accessMethod?: 'academy_download' | 'external_link';
  destinationUrl?: string;
}

/**
 * Generate a cryptographically secure random 6-digit OTP string
 */
export function generateSixDigitOtp(): string {
  // crypto.randomInt ensures uniform distribution without modulo bias
  const num = crypto.randomInt(100000, 999999);
  return num.toString();
}

/**
 * Hash an OTP using SHA-256 with a salt so plaintext OTP is never persisted
 */
export function hashOtp(otp: string, mobile: string): string {
  const salt = process.env.OTP_HASH_SALT || 'compete-otp-salt-hash-secret-2026';
  return crypto.createHmac('sha256', salt).update(`${mobile}:${otp}`).digest('hex');
}

/**
 * Create a short-lived (15-minute) resource-specific download authorization token
 */
export async function createDownloadToken(payload: DownloadTokenPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(DOWNLOAD_SECRET);
}

/**
 * Verify and decode download authorization token
 */
export async function verifyDownloadToken(token: string): Promise<DownloadTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, DOWNLOAD_SECRET);
    return {
      studentId: payload.studentId as string,
      studentName: payload.studentName as string,
      mobile: payload.mobile as string,
      resourceId: payload.resourceId as string,
      downloadType: payload.downloadType as string,
      examCategory: payload.examCategory as string | undefined,
      accessMethod: payload.accessMethod as 'academy_download' | 'external_link' | undefined,
      destinationUrl: payload.destinationUrl as string | undefined,
    };
  } catch {
    return null;
  }
}
