/**
 * Midtrans Snap SDK Global Type Declaration
 * Provides TypeScript support for window.snap object
 */

interface SnapPaymentCallbacks {
  onSuccess?: (result: SnapSuccessResponse) => void;
  onPending?: (result: SnapPendingResponse) => void;
  onError?: (result: SnapErrorResponse) => void;
  onClose?: () => void;
}

interface SnapSuccessResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  payment_type: string;
  signature_key: string;
  bank: string;
  via: string;
  eci: string;
  channel_response_code: string;
  channel_response_message: string;
  payment_amount: number;
}

interface SnapPendingResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  payment_type: string;
  gross_amount: string;
}

interface SnapErrorResponse {
  status_code: string;
  status_message: string;
  id: string;
}

interface SnapSDK {
  pay: (token: string, options?: SnapPaymentCallbacks) => void;
  embed: (token: string, options?: Record<string, unknown>) => void;
  redirect: (token: string) => void;
}

declare global {
  interface Window {
    snap?: SnapSDK;
  }
}

export {};
