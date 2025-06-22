import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:3001/api';

// Add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class ProgressService {
  async getUserProgress(userId) {
    try {
      const response = await axios.get(`${API_URL}/progress/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch progress');
    }
  }

  async saveProgress(progressData) {
    try {
      const response = await axios.post(`${API_URL}/progress`, {
        userId: authService.getCurrentUser().user.id,
        ...progressData
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to save progress');
    }
  }

  async getUserStatistics(userId) {
    try {
      const response = await axios.get(`${API_URL}/progress/stats/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
    }
  }

  // Helper method to format progress data
  formatProgressData(gameType, level, score, timeSpent) {
    return {
      gameType,
      level,
      score,
      timeSpent
    };
  }
}

export default new ProgressService(); 