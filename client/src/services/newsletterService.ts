export const subscribeToNewsletter = async (email: string): Promise<void> => {
  try {
    console.log(`📧 Subscribing to newsletter with email: ${email}`);
  } catch (error) {
    console.error('❌ Error subscribing to newsletter:', error);
    throw error;
  } finally {
    console.log('📧 Newsletter subscription process completed');
  }
}