/**
 * Generate Unique Contact ID
 * 
 * Format: contact_{timestamp}_{random}
 * Example: contact_1709028600000_a1b2c3
 * 
 * Why this format?
 * - Prefix identifies document type
 * - Timestamp ensures chronological ordering
 * - Random suffix prevents collisions
 * 
 * @returns Unique contact ID string
 */

export const generateUniqueContactId = (): string =>{
    const timestamp = Date.now(); // Get current timestamp
     
  // Generate random 6-character string
  // .toString(36) converts to base-36 (0-9, a-z)
  // .substring(2, 8) takes 6 characters
    const randomSuffix = Math.random().toString(36).substring(2, 8); // Generate random string
    return `contact_${timestamp}_${randomSuffix}`; // Combine to form unique ID
}