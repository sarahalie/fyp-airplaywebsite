<template>
  <div class="home">
    <!-- Hero Section with Parallax and 3D effect -->
    <div class="hero-section" ref="heroSection">
      <div class="hero-content" :style="{ transform: `translateY(${scrollY * 0.5}px)` }">
        <h1 class="hero-title">
          <span class="gradient-text">Enhancing Skills</span>
          <br />Through
          <span class="highlight">AirPlay</span>
        </h1>
        <p class="hero-description">
          Experience the future of learning with our innovative air-drawing platform,
          designed specifically for children with dyslexia.
        </p>
        <div class="cta-container">
          <router-link to="/login" class="cta-button primary">
            <span class="button-text">Try For Free</span>
            <span class="button-icon">→</span>
          </router-link>
          <router-link to="/who-we-help" class="cta-button secondary">
            Learn More
          </router-link>
        </div>
      </div>
      <div class="hero-visual" ref="heroVisual">
        <div class="floating-shapes">
          <div v-for="(shape, index) in shapes" 
               :key="index" 
               class="shape"
               :class="shape.type"
               :style="{
                 '--delay': `${index * 0.5}s`,
                 '--size': `${shape.size}px`,
                 '--color': shape.color,
                 left: `${shape.position.x}%`,
                 top: `${shape.position.y}%`
               }">
          </div>
        </div>
        <img src="@/assets/palette.png" alt="Art Palette" class="palette-image" />
      </div>
    </div>

    <!-- Interactive Features Section -->
    <div class="features-section">
      <h2 class="section-title">
        <span class="gradient-text">Why Choose AirPlay?</span>
      </h2>
      <div class="features-grid">
        <div v-for="(feature, index) in features" 
             :key="index"
             class="feature-card"
             @mouseenter="feature.isHovered = true"
             @mouseleave="feature.isHovered = false"
             :class="{ 'hovered': feature.isHovered }">
          <div class="feature-icon-wrapper">
            <i :class="feature.icon"></i>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
          <div class="feature-background"></div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="cta-section">
      <div class="cta-content">
        <h2 class="gradient-text">Ready to Start Your Journey?</h2>
        <p>Begin your learning adventure with AirPlay today!</p>
        <router-link to="/login" class="cta-button primary large">
          <span class="button-text">Get Started Now</span>
          <span class="button-icon">→</span>
        </router-link>
      </div>
      <div class="cta-background"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Home',
  setup() {
    const scrollY = ref(0)
    const heroSection = ref(null)

    const shapes = [
      { type: 'circle', size: 40, color: '#FF6B6B', position: { x: 20, y: 20 } },
      { type: 'square', size: 35, color: '#4ECDC4', position: { x: 80, y: 40 } },
      { type: 'triangle', size: 45, color: '#45B7D1', position: { x: 60, y: 70 } },
      { type: 'circle', size: 30, color: '#96CEB4', position: { x: 30, y: 60 } },
      { type: 'square', size: 50, color: '#D4A5A5', position: { x: 70, y: 30 } }
    ]

    const features = ref([
      {
        icon: 'fas fa-brain',
        title: 'Cognitive Development',
        description: 'Enhance memory and processing skills through interactive exercises',
        isHovered: false
      },
      {
        icon: 'fas fa-hands',
        title: 'Motor Skills',
        description: 'Improve fine motor skills with engaging air-drawing activities',
        isHovered: false
      },
      {
        icon: 'fas fa-graduation-cap',
        title: 'Learning Made Fun',
        description: 'Game-based approach keeps children motivated and engaged',
        isHovered: false
      },
      {
        icon: 'fas fa-chart-line',
        title: 'Track Progress',
        description: 'Monitor improvement with detailed analytics and insights',
        isHovered: false
      }
    ])

    const handleScroll = () => {
      scrollY.value = window.scrollY
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      scrollY,
      shapes,
      features,
      heroSection
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 8rem;
  position: relative;
  overflow: hidden;
  background: white;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  z-index: 2;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, #96CEB4 0%, #88B7A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.highlight {
  color: #88B7A6;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #96CEB4, #88B7A6);
  border-radius: 2px;
}

.hero-description {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-container {
  display: flex;
  gap: 1rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background: #96CEB4;
  color: white;
  box-shadow: 0 4px 6px rgba(150, 206, 180, 0.3);
}

.cta-button.primary:hover {
  background: #88B7A6;
  transform: translateY(-2px);
}

.cta-button.secondary {
  background: white;
  color: #96CEB4;
  border: 2px solid #96CEB4;
}

.cta-button.secondary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}

.button-text {
  margin-right: 0.5rem;
}

.button-icon {
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(5px);
}

.hero-visual {
  flex: 1;
  position: relative;
  height: 100%;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  animation: float 6s ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: 0.8;
}

.circle {
  width: var(--size);
  height: var(--size);
  background: var(--color);
  border-radius: 50%;
}

.square {
  width: var(--size);
  height: var(--size);
  background: var(--color);
  border-radius: 8px;
  transform: rotate(45deg);
}

.triangle {
  width: 0;
  height: 0;
  border-left: calc(var(--size) * 0.5) solid transparent;
  border-right: calc(var(--size) * 0.5) solid transparent;
  border-bottom: var(--size) solid var(--color);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.palette-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

/* Features Section */
.features-section {
  padding: 8rem 4rem;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: left;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #96CEB4 0%, #88B7A6 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.feature-card.hovered::before {
  opacity: 1;
}

.feature-card.hovered {
  transform: translateY(-10px);
}

.feature-card.hovered h3,
.feature-card.hovered p,
.feature-card.hovered i {
  color: white;
}

.feature-icon-wrapper {
  width: 60px;
  height: 60px;
  background: #e8f0e6;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.feature-icon-wrapper i {
  font-size: 1.5rem;
  color: #88B7A6;
  transition: all 0.3s ease;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.feature-card p {
  color: #4b5563;
  line-height: 1.6;
  transition: all 0.3s ease;
}

/* CTA Section */
.cta-section {
  padding: 4rem;
  text-align: center;
  position: relative;
  background: white;
  border-radius: 0;
  margin-top: 2rem;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  color: #2c3e50;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #4b5563;
}

.cta-button.primary {
  background: #96CEB4;
  color: white;
  box-shadow: 0 4px 6px rgba(150, 206, 180, 0.3);
}

.cta-button.primary:hover {
  background: #88B7A6;
  transform: translateY(-2px);
}

.cta-button.secondary {
  background: white;
  color: #96CEB4;
  border: 2px solid #96CEB4;
}

.cta-button.secondary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}

.cta-button.large {
  padding: 1.25rem 3rem;
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-section {
    padding: 4rem 2rem;
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    margin-bottom: 3rem;
  }

  .cta-container {
    justify-content: center;
  }

  .hero-title {
    font-size: 3rem;
  }

  .features-section,
  .cta-section {
    padding: 4rem 2rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .palette-image {
    max-width: 300px;
  }

  .cta-content h2 {
    font-size: 2rem;
  }
}
</style> 