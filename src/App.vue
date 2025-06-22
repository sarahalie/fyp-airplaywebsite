<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; {{ new Date().getFullYear() }} AirPlay. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap');

:root {
  --font-family-sans-serif: 'OpenDyslexic', Arial, sans-serif;
  --primary-color: #4a90e2;
  --text-color: #2c3e50;
  --background-color: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-sans-serif);
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  padding-top: 80px; /* Space for fixed navbar */
  flex: 1;
}

.footer {
  background-color: white;
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
}

/* High contrast text */
.high-contrast {
  color: #000000 !important;
  background-color: #FFFFFF !important;
}

/* Responsive text sizing */
@media (max-width: 768px) {
  body {
    font-size: 16px;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
:focus {
  outline: 3px solid var(--primary-color);
  outline-offset: 2px;
}

/* Remove focus outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
</style> 