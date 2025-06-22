<template>
  <div class="dashboard-container">
    <Sidebar />
    <div class="dashboard-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Dashboard',
  components: {
    Sidebar
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

.dashboard-content {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  background: #f8f9fa;
}

.sidebar.collapsed + .dashboard-content {
  margin-left: 70px;
}

@media (max-width: 768px) {
  .dashboard-content {
    margin-left: 70px;
  }
}
</style> 