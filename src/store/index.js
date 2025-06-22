import { createStore } from 'vuex';
import authService from '@/services/authService';

export default createStore({
  state: {
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isLoggedIn(),
    authError: null,
    authStatus: ''
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
      state.isAuthenticated = !!userData;
      state.authError = null;
      state.authStatus = 'success';
    },
    setAuthError(state, error) {
      state.authError = error;
      state.authStatus = 'error';
    },
    clearAuthError(state) {
      state.authError = null;
      state.authStatus = '';
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.authError = null;
      state.authStatus = '';
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        commit('clearAuthError');
        const response = await authService.login(email, password);
        commit('setUser', response.user);
        return response;
      } catch (error) {
        commit('setAuthError', error.message);
        throw error;
      }
    },
    async register({ commit }, { firstName, lastName, email, password, role }) {
      try {
        commit('clearAuthError');
        const response = await authService.register(firstName, lastName, email, password, role);
        return response;
      } catch (error) {
        commit('setAuthError', error.message);
        throw error;
      }
    },
    logout({ commit }) {
      authService.logout();
      commit('clearUser');
    },
    clearError({ commit }) {
      commit('clearAuthError');
    },
    checkAuth({ commit }) {
      const user = authService.getCurrentUser();
      if (user) {
        commit('setUser', user);
      } else {
        commit('clearUser');
      }
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
    authError: state => state.authError,
    authStatus: state => state.authStatus
  }
}); 