import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

class SettingsService {
  async updateProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  async updateAppearance(appearanceData) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/appearance`, appearanceData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update appearance');
    }
  }

  async uploadAvatar(file) {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.post(`${API_URL}/users/avatar`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload avatar');
    }
  }
}

export default new SettingsService(); 