// API Configuration
export const API_CONFIG = {
  // Development - use your computer's IP address
  BASE_URL: 'http://192.168.100.25:3001/api/v1',
  
  // Fallback URLs if the main one doesn't work
  FALLBACK_URLS: [
    'http://localhost:3001/api/v1',
    'http://10.0.2.2:3001/api/v1', // Android emulator
    'http://127.0.0.1:3001/api/v1',
  ],
  
  // Alternative URLs for different environments
  // LOCALHOST: 'http://localhost:3001/api/v1',
  // PRODUCTION: 'https://api.fitconnect.com/api/v1',
  
  // Timeout settings
  TIMEOUT: 10000, // 10 seconds
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Helper function to get the current API URL
export const getApiUrl = () => {
  return API_CONFIG.BASE_URL;
}; 