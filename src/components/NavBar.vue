<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="navbar-content">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/airplaylogo.png" alt="AirPlay Logo" class="navbar-logo" />
        <div class="brand-glow"></div>
      </router-link>

      <div class="navbar-links" :class="{ 'active': isMobileMenuOpen }">
        <router-link to="/" class="nav-link" v-slot="{ isActive }">
          <span class="link-content">
            <i class="fas fa-home"></i>
            <span class="link-text">Home</span>
          </span>
          <span class="link-indicator" :class="{ 'active': isActive }"></span>
        </router-link>

        <router-link to="/who-we-help" class="nav-link" v-slot="{ isActive }">
          <span class="link-content">
            <i class="fas fa-users"></i>
            <span class="link-text">Who We Help</span>
          </span>
          <span class="link-indicator" :class="{ 'active': isActive }"></span>
        </router-link>

        <router-link to="/contact" class="nav-link" v-slot="{ isActive }">
          <span class="link-content">
            <i class="fas fa-envelope"></i>
            <span class="link-text">Contact Us</span>
          </span>
          <span class="link-indicator" :class="{ 'active': isActive }"></span>
        </router-link>
      </div>

      <div class="navbar-auth">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="auth-btn login-btn">
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </router-link>
        </template>
        <template v-else>
          <router-link to="/dashboard" class="nav-link dashboard-link" v-slot="{ isActive }">
            <span class="link-content">
              <i class="fas fa-chart-bar"></i>
              <span class="link-text">Dashboard</span>
            </span>
            <span class="link-indicator" :class="{ 'active': isActive }"></span>
          </router-link>
          <button @click="handleLogout" class="auth-btn logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </template>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
        <span class="menu-icon-line"></span>
        <span class="menu-icon-line"></span>
        <span class="menu-icon-line"></span>
      </button>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const handleLogout = async () => {
      await store.dispatch('logout');
      router.push('/login');
    };

    return {
      isAuthenticated,
      handleLogout
    };
  },
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.75rem 2rem;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(150, 206, 180, 0.1);
}

.navbar-scrolled {
  box-shadow: 0 4px 20px rgba(150, 206, 180, 0.15);
  background: rgba(255, 255, 255, 0.98);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
}

.navbar-logo {
  height: 40px;
  width: auto;
  position: relative;
  z-index: 1;
}

.brand-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(150, 206, 180, 0.2) 0%, rgba(150, 206, 180, 0) 70%);
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.navbar-brand:hover .brand-glow {
  opacity: 1;
}

.navbar-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  position: relative;
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.link-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

.link-content i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.nav-link:hover i {
  transform: translateY(-2px);
}

.link-text {
  position: relative;
}

.link-indicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #96CEB4;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.link-indicator.active,
.nav-link:hover .link-indicator {
  width: 100%;
}

.navbar-auth {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.auth-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.login-btn {
  background: #96CEB4;
  color: white;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(150, 206, 180, 0.3);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(150, 206, 180, 0.4);
}

.logout-btn {
  background: #ff6b6b;
  color: white;
}

.logout-btn:hover {
  transform: translateY(-2px);
  background: #ff5252;
}

.dashboard-link {
  color: #96CEB4;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  width: 30px;
  height: 30px;
}

.menu-icon-line {
  display: block;
  width: 100%;
  height: 2px;
  background: #2c3e50;
  margin: 6px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-menu-btn.active .menu-icon-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-btn.active .menu-icon-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .menu-icon-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .mobile-menu-btn {
    display: block;
    z-index: 100;
  }

  .navbar-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 80%;
    max-width: 300px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 5rem 2rem;
    gap: 2rem;
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  }

  .navbar-links.active {
    right: 0;
  }

  .nav-link {
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
  }

  .nav-link:hover {
    background: rgba(150, 206, 180, 0.1);
  }

  .navbar-auth {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .auth-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Animation for mobile menu items */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.navbar-links.active .nav-link {
  animation: slideIn 0.3s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
}
</style> 