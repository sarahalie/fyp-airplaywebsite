<!-- Login.vue -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                :rules="[rules.required, rules.email]"
              />
              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[rules.required]"
              />
            </v-form>
            <v-alert
              v-if="error"
              type="error"
              dismissible
              @click="error = ''"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="handleLogin"
              :loading="loading"
            >
              Login
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center">
            <router-link to="/register">Don't have an account? Register here</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authService from '@/services/authService';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: '',
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+\..+/.test(v) || 'Email must be valid'
      }
    };
  },
  methods: {
    async handleLogin() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      this.error = '';

      try {
        await authService.login(this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 2rem;
}
</style> 