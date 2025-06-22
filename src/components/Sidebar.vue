<!-- Sidebar.vue -->
<template>
  <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <!-- Logo Section -->
    <div class="logo-section">
      <img src="@/assets/airplaylogo.png" alt="AirPlay Logo" class="logo" />
      <button class="collapse-btn" @click="toggleCollapse">
        <i class="fas" :class="isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'"></i>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="nav-menu">
      <router-link 
        to="/dashboard/airplay" 
        class="nav-item" 
        :class="{ 'active': $route.name === 'airplay' || $route.name === 'dashboard' }"
      >
        <i class="fas fa-gamepad"></i>
        <span v-if="!isCollapsed">AirPlay</span>
      </router-link>

      <router-link 
        to="/dashboard/reports" 
        class="nav-item"
        :class="{ 'active': $route.name === 'reports' }"
      >
        <i class="fas fa-chart-bar"></i>
        <span v-if="!isCollapsed">Reports</span>
      </router-link>

      <router-link 
        to="/dashboard/tutorials" 
        class="nav-item"
        :class="{ 'active': $route.name === 'tutorials' }"
      >
        <i class="fas fa-book"></i>
        <span v-if="!isCollapsed">Tutorials</span>
      </router-link>

      <router-link 
        to="/dashboard/settings" 
        class="nav-item"
        :class="{ 'active': $route.name === 'settings' }"
      >
        <i class="fas fa-cog"></i>
        <span v-if="!isCollapsed">Settings</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar.collapsed {
  width: 70px;
}

.logo-section {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

.logo {
  height: 40px;
  width: auto;
  transition: all 0.3s ease;
}

.collapsed .logo {
  width: 30px;
  height: 30px;
}

.collapse-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background: #e0e0e0;
}

.nav-menu {
  padding: 1rem 0;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
  gap: 1rem;
}

.nav-item:hover {
  background: rgba(150, 206, 180, 0.1);
  color: #96CEB4;
}

.nav-item.active {
  background: rgba(150, 206, 180, 0.1);
  color: #96CEB4;
  border-left: 4px solid #96CEB4;
}

.nav-item i {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.nav-item span {
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }

  .sidebar.expanded {
    width: 250px;
  }

  .nav-item span {
    display: none;
  }

  .sidebar.expanded .nav-item span {
    display: block;
  }
}
</style> 