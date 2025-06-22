import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Add request interceptor for error handling
axios.interceptors.request.use(
  config => {
    // Add any request headers if needed
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Response error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'An error occurred');
  }
);

class AuthService {
  constructor() {
    this.setupAxiosInterceptors();
  }

  async login(email, password) {
    try {
      console.log('Attempting login with:', { email }); // Add logging
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      console.log('Login response:', response.data); // Add logging
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.setupAxiosInterceptors();
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response || error); // Improved error logging
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Login failed. Please try again later.');
      }
    }
  }

  async register(firstName, lastName, email, password, role = 'student') {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        role
      });
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 409) {
        throw new Error('Email already exists');
      } else {
        throw new Error('Registration failed. Please try again later.');
      }
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    this.setupAxiosInterceptors(); // Clear token from headers
  }

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  isLoggedIn() {
    const user = this.getCurrentUser();
    return !!user && !!user.token;
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.token;
  }

  // Add token to all axios requests
  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Handle 401 responses globally
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && this.isLoggedIn()) {
          // Token expired or invalid
          this.logout();
          window.location.href = '/login?session=expired';
        }
        return Promise.reject(error);
      }
    );
  }
}

export default new AuthService(); 