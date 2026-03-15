/**
 * API Configuration
 * 
 * Centralized configuration for API endpoints and keys.
 * Uses Vite environment variables (must start with VITE_)
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '';

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    baseURL: API_BASE_URL,
    midtransKey: MIDTRANS_CLIENT_KEY ? 'Set ✅' : 'Not set ⚠️'
  });
}
