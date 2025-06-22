<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="title">Register</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            required
            class="input"
            placeholder="Enter your first name"
          />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            required
            class="input"
            placeholder="Enter your last name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="input"
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="input"
            placeholder="Enter your password"
          />
        </div>

        <div class="form-group">
          <label for="role">Role</label>
          <select
            id="role"
            v-model="role"
            required
            class="input"
          >
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <button type="submit" class="button is-primary" :disabled="isLoading">
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>

        <p class="login-link">
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import authService from '@/services/authService';

export default {
  name: 'Register',
  setup() {
    const store = useStore();
    const router = useRouter();

    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const role = ref('student');
    const isLoading = ref(false);
    const error = ref('');

    const handleRegister = async () => {
      try {
        isLoading.value = true;
        error.value = '';
        
        await authService.register(
          firstName.value,
          lastName.value,
          email.value,
          password.value,
          role.value
        );

        // Store user data in Vuex store
        store.commit('setUser', {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          role: role.value
        });

        // After successful registration, redirect to login
        router.push('/login');
      } catch (err) {
        console.error('Registration error:', err);
        error.value = err.message || 'Registration failed';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      firstName,
      lastName,
      email,
      password,
      role,
      isLoading,
      error,
      handleRegister
    };
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;
}

.register-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  color: #363636;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #363636;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-size: 1rem;
}

select.input {
  background-color: white;
}

.button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  margin-top: 1rem;
}

.error-message {
  background-color: #ff3860;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: #3273dc;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style> 