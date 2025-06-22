<template>
  <div class="auth-container">
    <!-- Notification -->
    <div v-if="notification.show" 
         class="notification" 
         :class="notification.type"
         @click="notification.show = false">
      <span class="notification-message">{{ notification.message }}</span>
      <button class="notification-close">&times;</button>
    </div>

    <div class="auth-card" :class="{ 'show-register': isRegisterMode }">
      <div class="card-flip">
        <!-- Login Form -->
        <div class="form-side login-side">
          <div class="auth-header">
            <img src="@/assets/airplaylogo.png" alt="Logo" class="auth-logo" />
            <h2>Welcome Back!</h2>
            <p class="subtitle">Continue your learning journey</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="form-group">
              <label for="login-email">Email</label>
              <div class="input-wrapper" :class="{ 'error': loginErrors.email }">
                <i class="fas fa-envelope"></i>
                <input 
                  id="login-email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  @input="validateLoginEmail"
                />
              </div>
              <span class="error-message" v-if="loginErrors.email">{{ loginErrors.email }}</span>
            </div>

            <div class="form-group">
              <label for="login-password">Password</label>
              <div class="input-wrapper" :class="{ 'error': loginErrors.password }">
                <i class="fas fa-lock"></i>
                <input
                  id="login-password"
                  v-model="loginForm.password"
                  :type="showLoginPassword ? 'text' : 'password'"
                  required
                  placeholder="Enter your password"
                  @input="validateLoginPassword"
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="showLoginPassword = !showLoginPassword"
                >
                  <i :class="showLoginPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <span class="error-message" v-if="loginErrors.password">{{ loginErrors.password }}</span>
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" v-model="loginForm.rememberMe">
                <span class="checkmark"></span>
                <span>Remember me</span>
              </label>
              <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">
                Forgot Password?
              </a>
            </div>

            <button type="submit" class="auth-button" :disabled="isLoading || !isLoginFormValid">
              <span v-if="!isLoading">Login</span>
              <div v-else class="spinner"></div>
            </button>
          </form>

          <div class="social-auth">
            <p>Or login with</p>
            <div class="social-buttons">
              <button class="social-button google">
                <i class="fab fa-google"></i>
              </button>
              <button class="social-button facebook">
                <i class="fab fa-facebook-f"></i>
              </button>
              <button class="social-button apple">
                <i class="fab fa-apple"></i>
              </button>
            </div>
          </div>

          <p class="switch-mode">
            Don't have an account? 
            <a href="#" @click.prevent="toggleMode">Register here</a>
          </p>
        </div>

        <!-- Register Form -->
        <div class="form-side register-side">
          <div class="auth-header">
            <img src="@/assets/airplaylogo.png" alt="Logo" class="auth-logo" />
            <h2>Create Account</h2>
            <p class="subtitle">Start your learning journey today</p>
          </div>

          <form @submit.prevent="handleRegister" class="auth-form">
            <div class="form-row">
              <div class="form-group">
                <label for="register-firstName">First Name</label>
                <div class="input-wrapper" :class="{ 'error': registerErrors.firstName }">
                  <i class="fas fa-user"></i>
                  <input
                    id="register-firstName"
                    v-model="registerForm.firstName"
                    type="text"
                    required
                    placeholder="First name"
                    @input="validateRegisterFirstName"
                  />
                </div>
                <span class="error-message" v-if="registerErrors.firstName">{{ registerErrors.firstName }}</span>
              </div>

              <div class="form-group">
                <label for="register-lastName">Last Name</label>
                <div class="input-wrapper" :class="{ 'error': registerErrors.lastName }">
                  <i class="fas fa-user"></i>
                  <input
                    id="register-lastName"
                    v-model="registerForm.lastName"
                    type="text"
                    required
                    placeholder="Last name"
                    @input="validateRegisterLastName"
                  />
                </div>
                <span class="error-message" v-if="registerErrors.lastName">{{ registerErrors.lastName }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="register-email">Email</label>
              <div class="input-wrapper" :class="{ 'error': registerErrors.email }">
                <i class="fas fa-envelope"></i>
                <input
                  id="register-email"
                  v-model="registerForm.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  @input="validateRegisterEmail"
                />
              </div>
              <span class="error-message" v-if="registerErrors.email">{{ registerErrors.email }}</span>
            </div>

            <div class="form-group">
              <label for="register-password">Password</label>
              <div class="input-wrapper" :class="{ 'error': registerErrors.password }">
                <i class="fas fa-lock"></i>
                <input
                  id="register-password"
                  v-model="registerForm.password"
                  :type="showRegisterPassword ? 'text' : 'password'"
                  required
                  placeholder="Create a password"
                  @input="validateRegisterPassword"
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="showRegisterPassword = !showRegisterPassword"
                >
                  <i :class="showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <span class="error-message" v-if="registerErrors.password">{{ registerErrors.password }}</span>
              <div class="password-strength" v-if="registerForm.password">
                <div class="strength-meter">
                  <div 
                    class="strength-bar" 
                    :style="{ width: passwordStrength + '%' }"
                    :class="passwordStrengthClass"
                  ></div>
                </div>
                <span class="strength-text" :class="passwordStrengthClass">
                  {{ passwordStrengthText }}
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="register-role">I am a</label>
              <div class="role-selector">
                <label 
                  v-for="role in roles" 
                  :key="role.value" 
                  class="role-option"
                  :class="{ 'selected': registerForm.role === role.value }"
                >
                  <input 
                    type="radio" 
                    :value="role.value" 
                    v-model="registerForm.role"
                    name="role"
                  />
                  <i :class="role.icon"></i>
                  <span>{{ role.label }}</span>
                </label>
              </div>
            </div>

            <div class="form-group terms">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="registerForm.acceptTerms"
                  @change="validateTerms"
                />
                <span class="checkmark"></span>
                <span>
                  I agree to the 
                  <a href="#" @click.prevent="showTerms">Terms of Service</a>
                  and
                  <a href="#" @click.prevent="showPrivacy">Privacy Policy</a>
                </span>
              </label>
              <span class="error-message" v-if="registerErrors.terms">{{ registerErrors.terms }}</span>
            </div>

            <button type="submit" class="auth-button" :disabled="isLoading || !isRegisterFormValid">
              <span v-if="!isLoading">Create Account</span>
              <div v-else class="spinner"></div>
            </button>
          </form>

          <p class="switch-mode">
            Already have an account? 
            <a href="#" @click.prevent="toggleMode">Login here</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import authService from '@/services/authService'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const store = useStore()
    const isRegisterMode = ref(false)
    const isLoading = ref(false)
    const showLoginPassword = ref(false)
    const showRegisterPassword = ref(false)

    const notification = reactive({
      show: false,
      message: '',
      type: 'success'
    })

    const loginForm = reactive({
      email: '',
      password: '',
      rememberMe: false
    })

    const registerForm = reactive({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'student',
      acceptTerms: false
    })

    const loginErrors = reactive({
      email: '',
      password: ''
    })

    const registerErrors = reactive({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: ''
    })

    const roles = [
      { value: 'student', label: 'Student', icon: 'fas fa-user-graduate' },
      { value: 'parent', label: 'Parent', icon: 'fas fa-user-friends' },
      { value: 'teacher', label: 'Teacher', icon: 'fas fa-chalkboard-teacher' }
    ]

    // Validation functions
    const validateLoginEmail = () => {
      loginErrors.email = !loginForm.email ? 'Email is required' :
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email) ? 'Invalid email format' : ''
    }

    const validateLoginPassword = () => {
      loginErrors.password = !loginForm.password ? 'Password is required' : ''
    }

    const validateRegisterFirstName = () => {
      registerErrors.firstName = !registerForm.firstName ? 'First name is required' : ''
    }

    const validateRegisterLastName = () => {
      registerErrors.lastName = !registerForm.lastName ? 'Last name is required' : ''
    }

    const validateRegisterEmail = () => {
      registerErrors.email = !registerForm.email ? 'Email is required' :
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email) ? 'Invalid email format' : ''
    }

    const validateRegisterPassword = () => {
      const password = registerForm.password
      registerErrors.password = !password ? 'Password is required' :
        password.length < 8 ? 'Password must be at least 8 characters' : ''
    }

    const validateTerms = () => {
      registerErrors.terms = !registerForm.acceptTerms ? 'You must accept the terms and conditions' : ''
    }

    // Password strength
    const passwordStrength = computed(() => {
      const password = registerForm.password
      if (!password) return 0
      
      let strength = 0
      if (password.length >= 8) strength += 25
      if (/[A-Z]/.test(password)) strength += 25
      if (/[0-9]/.test(password)) strength += 25
      if (/[^A-Za-z0-9]/.test(password)) strength += 25
      
      return strength
    })

    const passwordStrengthClass = computed(() => {
      const strength = passwordStrength.value
      if (strength <= 25) return 'weak'
      if (strength <= 50) return 'medium'
      if (strength <= 75) return 'good'
      return 'strong'
    })

    const passwordStrengthText = computed(() => {
      const strength = passwordStrength.value
      if (strength <= 25) return 'Weak'
      if (strength <= 50) return 'Medium'
      if (strength <= 75) return 'Good'
      return 'Strong'
    })

    // Form validation
    const isLoginFormValid = computed(() => {
      return !loginErrors.email && !loginErrors.password &&
        loginForm.email && loginForm.password
    })

    const isRegisterFormValid = computed(() => {
      return !registerErrors.firstName && !registerErrors.lastName &&
        !registerErrors.email && !registerErrors.password &&
        !registerErrors.terms && registerForm.acceptTerms &&
        registerForm.firstName && registerForm.lastName &&
        registerForm.email && registerForm.password
    })

    const showNotification = (message, type = 'success') => {
      notification.message = message
      notification.type = type
      notification.show = true
      setTimeout(() => {
        notification.show = false
      }, 5000)
    }

    const toggleMode = () => {
      isRegisterMode.value = !isRegisterMode.value
      // Clear forms and errors
      Object.keys(loginForm).forEach(key => loginForm[key] = '')
      Object.keys(registerForm).forEach(key => {
        if (key === 'role') registerForm[key] = 'student'
        else if (key === 'acceptTerms') registerForm[key] = false
        else registerForm[key] = ''
      })
      Object.keys(loginErrors).forEach(key => loginErrors[key] = '')
      Object.keys(registerErrors).forEach(key => registerErrors[key] = '')
    }

    const handleLogin = async () => {
      try {
        validateLoginEmail()
        validateLoginPassword()
        
        if (!isLoginFormValid.value) return

        isLoading.value = true
        const response = await authService.login(loginForm.email, loginForm.password)
        
        if (loginForm.rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }

        store.commit('setUser', response.user)
        showNotification('Login successful!')
        
        const redirectPath = router.currentRoute.value.query.redirect || '/dashboard'
        router.push(redirectPath)
      } catch (error) {
        showNotification(error.message || 'Invalid credentials. Please try again.', 'error')
      } finally {
        isLoading.value = false
      }
    }

    const handleRegister = async () => {
      try {
        validateRegisterFirstName()
        validateRegisterLastName()
        validateRegisterEmail()
        validateRegisterPassword()
        validateTerms()

        if (!isRegisterFormValid.value) return

        isLoading.value = true
        await authService.register(
          registerForm.firstName,
          registerForm.lastName,
          registerForm.email,
          registerForm.password,
          registerForm.role
        )

        showNotification('Registration successful! Please log in.')
        isRegisterMode.value = false
      } catch (error) {
        showNotification(error.message || 'Registration failed. Please try again.', 'error')
      } finally {
        isLoading.value = false
      }
    }

    const handleForgotPassword = () => {
      showNotification('Password reset functionality coming soon!', 'info')
    }

    const showTerms = () => {
      showNotification('Terms of Service will be available soon!', 'info')
    }

    const showPrivacy = () => {
      showNotification('Privacy Policy will be available soon!', 'info')
    }

    return {
      isRegisterMode,
      isLoading,
      notification,
      loginForm,
      registerForm,
      loginErrors,
      registerErrors,
      roles,
      showLoginPassword,
      showRegisterPassword,
      passwordStrength,
      passwordStrengthClass,
      passwordStrengthText,
      isLoginFormValid,
      isRegisterFormValid,
      toggleMode,
      handleLogin,
      handleRegister,
      handleForgotPassword,
      showTerms,
      showPrivacy
    }
  }
}
</script>

<style scoped>
.auth-container {
  min-height: calc(100vh - 60px);
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.auth-card {
  width: 100%;
  max-width: 480px;
  perspective: 1000px;
  margin: 0 auto;
  position: relative;
}

.card-flip {
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
}

.auth-card.show-register .card-flip {
  transform: rotateY(180deg);
}

.form-side {
  padding: 2.5rem;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.register-side {
  transform: rotateY(180deg);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

h2 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  transition: all 0.3s ease;
}

.input-wrapper i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #96CEB4;
}

.input-wrapper input,
.input-wrapper select {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e1e1e1;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.input-wrapper.error input,
.input-wrapper.error select {
  border-color: #ff6b6b;
}

.input-wrapper input:focus,
.input-wrapper select:focus {
  border-color: #96CEB4;
  outline: none;
  box-shadow: 0 0 0 3px rgba(150, 206, 180, 0.2);
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #e1e1e1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.checkbox-label input:checked + .checkmark {
  background: #96CEB4;
  border-color: #96CEB4;
}

.checkbox-label input:checked + .checkmark::after {
  content: '\2714';
  color: white;
  font-size: 12px;
}

.forgot-password {
  color: #96CEB4;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #7ba994;
}

.auth-button {
  background: linear-gradient(45deg, #96CEB4, #7ba994);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(150, 206, 180, 0.2);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.social-auth {
  margin-top: 2rem;
  text-align: center;
}

.social-auth p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  position: relative;
}

.social-auth p::before,
.social-auth p::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 25%;
  height: 1px;
  background: #e1e1e1;
}

.social-auth p::before {
  left: 0;
}

.social-auth p::after {
  right: 0;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-button:hover {
  transform: translateY(-2px);
}

.social-button.google {
  background: #DB4437;
}

.social-button.facebook {
  background: #4267B2;
}

.social-button.apple {
  background: #000000;
}

.switch-mode {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.switch-mode a {
  color: #96CEB4;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.switch-mode a:hover {
  color: #7ba994;
}

.role-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.role-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.role-option input {
  display: none;
}

.role-option i {
  font-size: 1.5rem;
  color: #666;
}

.role-option span {
  font-size: 0.9rem;
  color: #666;
}

.role-option.selected {
  border-color: #96CEB4;
  background: rgba(150, 206, 180, 0.1);
}

.role-option.selected i,
.role-option.selected span {
  color: #96CEB4;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-meter {
  height: 4px;
  background: #e1e1e1;
  border-radius: 2px;
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  transition: all 0.3s ease;
}

.strength-bar.weak { background: #ff6b6b; }
.strength-bar.medium { background: #ffd93d; }
.strength-bar.good { background: #6bcb77; }
.strength-bar.strong { background: #4d96ff; }

.strength-text {
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.strength-text.weak { color: #ff6b6b; }
.strength-text.medium { color: #ffd93d; }
.strength-text.good { color: #6bcb77; }
.strength-text.strong { color: #4d96ff; }

.notification {
  position: fixed;
  top: 80px;
  right: 20px;
  padding: 1rem 2.5rem 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  animation: slideIn 0.3s ease forwards;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification-close {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
}

.notification.success {
  background: linear-gradient(45deg, #96CEB4, #7ba994);
}

.notification.error {
  background: linear-gradient(45deg, #ff6b6b, #ff8585);
}

.notification.info {
  background: linear-gradient(45deg, #4d96ff, #6ba6ff);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.terms a {
  color: #96CEB4;
  text-decoration: none;
  font-weight: 500;
}

.terms a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 1rem;
    min-height: calc(100vh - 60px);
    height: calc(100vh - 60px);
  }

  .notification {
    top: 70px;
    right: 10px;
    left: 10px;
    width: auto;
  }

  .auth-card {
    margin: 0 auto;
  }

  .form-side {
    padding: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .role-selector {
    grid-template-columns: 1fr;
  }
}
</style> 