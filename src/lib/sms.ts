/**
 * SMS Provider Abstraction Service for Compete Academy
 *
 * Supports:
 * 1. MSG91 (Flow / Template based)
 * 2. 2Factor (TSMS / OTP based - popular in India)
 * 3. Twilio (Global / India)
 * 4. Fast2SMS (India Quick SMS)
 *
 * Strict Rules:
 * - Does not simulate OTP delivery or pretend delivery succeeded if provider is not configured or failed.
 * - Throws clear, structured errors when credentials are unset or provider rejects request.
 */

export interface SendSmsResult {
  success: boolean;
  provider: string;
  messageId?: string;
  error?: string;
}

export class SmsGatewayService {
  /**
   * Normalize an Indian mobile number to 10 digits
   */
  static normalizeIndianMobile(mobile: string): string {
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length === 10) return cleaned;
    if (cleaned.length === 12 && cleaned.startsWith('91')) return cleaned.slice(2);
    if (cleaned.length === 11 && cleaned.startsWith('0')) return cleaned.slice(1);
    return cleaned;
  }

  /**
   * Validate Indian 10-digit mobile number format (starts with 6, 7, 8, or 9)
   */
  static isValidIndianMobile(mobile: string): boolean {
    const normalized = this.normalizeIndianMobile(mobile);
    return /^[6-9]\d{9}$/.test(normalized);
  }

  /**
   * Dispatch OTP SMS via configured SMS provider
   */
  static async sendOtpSms(mobile: string, otp: string): Promise<SendSmsResult> {
    const normalized = this.normalizeIndianMobile(mobile);
    if (!this.isValidIndianMobile(normalized)) {
      return {
        success: false,
        provider: 'validator',
        error: 'Invalid 10-digit Indian mobile number. Must start with 6, 7, 8, or 9.',
      };
    }

    const provider = (process.env.SMS_PROVIDER || '').toLowerCase().trim();

    // 1. MSG91 Provider
    if (provider === 'msg91') {
      const authKey = process.env.MSG91_AUTH_KEY;
      const templateId = process.env.MSG91_OTP_TEMPLATE_ID;
      if (!authKey || !templateId) {
        return {
          success: false,
          provider: 'msg91',
          error: 'MSG91 is configured as SMS provider but MSG91_AUTH_KEY or MSG91_OTP_TEMPLATE_ID is missing in environment variables.',
        };
      }

      try {
        const response = await fetch(
          `https://control.msg91.com/api/v5/otp?template_id=${encodeURIComponent(templateId)}&mobile=91${normalized}&otp=${otp}`,
          {
            method: 'POST',
            headers: {
              authkey: authKey,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (response.ok && data.type === 'success') {
          return { success: true, provider: 'msg91', messageId: data.request_id || 'msg91-ok' };
        }
        return { success: false, provider: 'msg91', error: data.message || 'MSG91 dispatch rejected.' };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return { success: false, provider: 'msg91', error: `MSG91 network error: ${message}` };
      }
    }

    // 2. 2Factor Provider (Very common for Indian OTP SMS)
    if (provider === '2factor') {
      const apiKey = process.env.TWO_FACTOR_API_KEY;
      if (!apiKey) {
        return {
          success: false,
          provider: '2factor',
          error: '2Factor is selected as SMS provider but TWO_FACTOR_API_KEY is not configured.',
        };
      }

      try {
        const res = await fetch(
          `https://2factor.in/API/V1/${encodeURIComponent(apiKey)}/SMS/${normalized}/${otp}/CompeteAcademyOTP`,
          { method: 'GET' }
        );
        const data = await res.json();
        if (data.Status === 'Success') {
          return { success: true, provider: '2factor', messageId: data.Details };
        }
        return { success: false, provider: '2factor', error: data.Details || '2Factor dispatch failed.' };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return { success: false, provider: '2factor', error: `2Factor network error: ${message}` };
      }
    }

    // 3. Twilio Provider
    if (provider === 'twilio') {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_FROM_NUMBER;

      if (!accountSid || !authToken || !fromNumber) {
        return {
          success: false,
          provider: 'twilio',
          error: 'Twilio is selected as SMS provider but TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_FROM_NUMBER is missing.',
        };
      }

      try {
        const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
        const bodyParams = new URLSearchParams({
          To: `+91${normalized}`,
          From: fromNumber,
          Body: `Your Compete Academy academic resource download verification code is ${otp}. Valid for 5 minutes. Do not share this code.`,
        });

        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${auth}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyParams.toString(),
          }
        );

        const data = await res.json();
        if (res.ok && data.sid) {
          return { success: true, provider: 'twilio', messageId: data.sid };
        }
        return { success: false, provider: 'twilio', error: data.message || 'Twilio SMS failed.' };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return { success: false, provider: 'twilio', error: `Twilio network error: ${message}` };
      }
    }

    // 4. Fast2SMS Provider
    if (provider === 'fast2sms') {
      const apiKey = process.env.FAST2SMS_API_KEY;
      if (!apiKey) {
        return {
          success: false,
          provider: 'fast2sms',
          error: 'Fast2SMS is selected as SMS provider but FAST2SMS_API_KEY is missing.',
        };
      }

      try {
        const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            authorization: apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            variables_values: otp,
            route: 'otp',
            numbers: normalized,
          }),
        });
        const data = await res.json();
        if (data.return) {
          return { success: true, provider: 'fast2sms', messageId: data.request_id };
        }
        return { success: false, provider: 'fast2sms', error: data.message || 'Fast2SMS dispatch failed.' };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return { success: false, provider: 'fast2sms', error: `Fast2SMS network error: ${message}` };
      }
    }

    // 5. Default: No provider configured
    return {
      success: false,
      provider: 'none',
      error: 'No SMS provider configured. Please set SMS_PROVIDER in .env.local to "msg91", "2factor", "twilio", or "fast2sms" along with credentials.',
    };
  }
}
