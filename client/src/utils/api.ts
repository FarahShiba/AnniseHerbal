/**
 * API Utility Functions
 * 
 * Centralized API request wrapper with error handling.
 * All API calls should use this utility for consistency.
 */

import { API_BASE_URL } from '../config/api';

/**
 * Standard API response structure from backend
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: Record<string, string>;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;
  details?: Record<string, string>;

  constructor(
    message: string,
    statusCode: number,
    details?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}
/**
 * Makes an API request with error handling
 * 
 * @param endpoint - API endpoint (without base URL, e.g., '/products')
 * @param options - Fetch options (method, body, headers, etc.)
 * @returns Promise with typed response data
 * 
 * @example
 * const data = await apiRequest<Product[]>('/products');
 * const result = await apiRequest('/contact', { method: 'POST', body: JSON.stringify(data) });
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    console.log(`🌐 API Request: ${options.method || 'GET'} ${endpoint}`);
    
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      console.error('❌ API Error:', data);
      throw new ApiError(
        data.error || data.message || 'Request failed',
        response.status,
        data.details
      );
    }

    console.log('✅ API Success:', data);
    return data;
  } catch (error) {
    // If it's already an ApiError, re-throw it
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    console.error('❌ Network Error:', error);
    throw new ApiError(
      'Network error. Please check your connection and try again.',
      0
    );
  }
}
