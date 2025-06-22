<!-- Register.vue -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleRegister" ref="form">
              <v-text-field
                v-model="firstName"
                label="First Name"
                name="firstName"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
              />
              <v-text-field
                v-model="lastName"
                label="Last Name"
                name="lastName"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
              />
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
                :rules="[rules.required, rules.minLength]"
                hint="Password must be at least 6 characters long"
              />
              <v-select
                v-model="role"
                :items="roles"
                label="Role"
                prepend-icon="mdi-account-group"
                :rules="[rules.required]"
              />
            </v-form>
            <v-alert
              v-if="error"
              type="error"
              dismissible
              @click="error = ''"
              class="mt-3"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="handleRegister"
              :loading="loading"
              :disabled="loading"
            >
              Register
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center">
            <router-link to="/login">Already have an account? Login here</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authService from '@/services/authService'

export default {
  name: 'UserRegister',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'student',
      roles: ['student', 'parent', 'teacher'],
      loading: false,
      error: '',
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+\..+/.test(v) || 'Email must be valid',
        minLength: v => (v && v.length >= 6) || 'Password must be at least 6 characters'
      }
    }
  },
  methods: {
    async handleRegister() {
      try {
        if (!this.$refs.form.validate()) {
          return
        }

        this.loading = true
        this.error = ''

        const response = await authService.register(
          this.firstName,
          this.lastName,
          this.email,
          this.password,
          this.role
        )

        console.log('Registration response:', response)
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Registration error:', error)
        this.error = error.message || 'Registration failed. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  margin-top: 2rem;
}
</style> 