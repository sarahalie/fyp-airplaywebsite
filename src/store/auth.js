import authService from '../services/authService';

export const auth = {
  namespaced: true,
  state: {
    user: authService.getCurrentUser(),
    status: '',
    error: null
  },
  getters: {
    isLoggedIn: state => !!state.user,
    currentUser: state => state.user,
    authError: state => state.error,
    authStatus: state => state.status
  },
  mutations: {
    loginSuccess(state, user) {
      state.status = 'success';
      state.user = user;
      state.error = null;
    },
    loginFailure(state, error) {
      state.status = 'error';
      state.user = null;
      state.error = error;
    },
    logout(state) {
      state.status = '';
      state.user = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        commit('clearError');
        const user = await authService.login(email, password);
        commit('loginSuccess', user);
        return user;
      } catch (error) {
        commit('loginFailure', error.message || 'Login failed');
        throw error;
      }
    },
    logout({ commit }) {
      authService.logout();
      commit('logout');
    },
    clearError({ commit }) {
      commit('clearError');
    }
  }
}; 