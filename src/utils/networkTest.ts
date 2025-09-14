import axios from 'axios';
import base_url from '../constants/urlEndpoint';

export const testNetworkConnection = async () => {
  try {
    console.log('Testing network connection to:', base_url);
    const response = await axios.get(`${base_url}movies?language=english`, {
      timeout: 10000, // 10 second timeout
    });
    console.log('✅ Network test successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Network test failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        }
      });
    }
    return { success: false, error };
  }
};