<template>
  <div class="contact-page">
    <div class="hero-section">
      <h1>Get in Touch</h1>
      <p>We're here to help! Choose the best way to connect with us.</p>
    </div>

    <div class="carousel-container">
      <!-- Navigation Arrows -->
      <button class="nav-button prev" @click="prevSlide" :disabled="currentIndex === 0">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="carousel-wrapper">
        <transition-group name="slide" tag="div" class="carousel">
          <div v-for="(slide, index) in slides" 
               :key="slide.id"
               class="contact-card"
               v-show="currentIndex === index">
            <div class="icon-wrapper">
              <i :class="slide.icon"></i>
            </div>
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
            <div class="contact-details">
              <p class="contact-value">{{ slide.value }}</p>
              <p class="response-time">{{ slide.responseTime }}</p>
            </div>
            <component 
              :is="slide.buttonType"
              :href="slide.buttonLink"
              :class="['contact-button', { 'social-grid': slide.id === 'social' }]"
              @click="slide.id === 'chat' ? startChat() : null"
            >
              <template v-if="slide.id === 'social'">
                <a v-for="social in slide.socialLinks" 
                   :key="social.name"
                   :href="social.link" 
                   class="social-button"
                   target="_blank"
                   rel="noopener noreferrer">
                  <i :class="social.icon"></i>
                </a>
              </template>
              <template v-else>
                {{ slide.buttonText }}
              </template>
            </component>
          </div>
        </transition-group>
      </div>

      <button class="nav-button next" @click="nextSlide" :disabled="currentIndex === slides.length - 1">
        <i class="fas fa-chevron-right"></i>
      </button>

      <!-- Carousel Indicators -->
      <div class="carousel-indicators">
        <button 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          class="indicator"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
          :aria-label="'Go to slide ' + (index + 1)">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      currentIndex: 0,
      slides: [
        {
          id: 'email',
          icon: 'fas fa-envelope',
          title: 'Email Us',
          description: 'Send us your questions anytime',
          value: 'support@airplay.com',
          responseTime: 'We usually respond within 24 hours',
          buttonType: 'a',
          buttonLink: 'mailto:support@airplay.com',
          buttonText: 'Send Email'
        },
        {
          id: 'phone',
          icon: 'fas fa-phone',
          title: 'Call Us',
          description: 'Speak with our support team',
          value: '+1 (555) 123-4567',
          responseTime: 'Monday - Friday, 9AM - 5PM EST',
          buttonType: 'a',
          buttonLink: 'tel:+15551234567',
          buttonText: 'Call Now'
        },
        {
          id: 'chat',
          icon: 'fas fa-comments',
          title: 'Live Chat',
          description: 'Chat with our friendly team',
          value: 'Available Now',
          responseTime: 'Average response time: 5 minutes',
          buttonType: 'button',
          buttonLink: null,
          buttonText: 'Start Chat'
        },
        {
          id: 'social',
          icon: 'fas fa-users',
          title: 'Follow Us',
          description: 'Join our community',
          value: 'Connect on social media',
          responseTime: 'Follow us for updates and news',
          buttonType: 'div',
          socialLinks: [
            { name: 'Facebook', icon: 'fab fa-facebook', link: '#' },
            { name: 'Twitter', icon: 'fab fa-twitter', link: '#' },
            { name: 'Instagram', icon: 'fab fa-instagram', link: '#' },
            { name: 'YouTube', icon: 'fab fa-youtube', link: '#' }
          ]
        }
      ]
    }
  },
  methods: {
    startChat() {
      console.log('Starting chat...')
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length
    },
    prevSlide() {
      this.currentIndex = this.currentIndex === 0 
        ? this.slides.length - 1 
        : this.currentIndex - 1
    },
    goToSlide(index) {
      this.currentIndex = index
    }
  },
  mounted() {
    // Add keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide()
      if (e.key === 'ArrowRight') this.nextSlide()
    })
  },
  beforeUnmount() {
    // Clean up event listener
    window.removeEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide()
      if (e.key === 'ArrowRight') this.nextSlide()
    })
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
}

.hero-section {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  padding: 2rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #2196F3;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
}

.carousel-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 3rem;
}

.carousel-wrapper {
  overflow: hidden;
  position: relative;
}

.carousel {
  position: relative;
  height: 500px;
}

.contact-card {
  position: absolute;
  width: 100%;
  background: white;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.icon-wrapper i {
  font-size: 2rem;
  color: #2196F3;
}

.contact-card h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.contact-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.contact-details {
  margin-bottom: 1.5rem;
}

.contact-value {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.response-time {
  font-size: 0.9rem;
  color: #666;
}

.contact-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-button:hover {
  background: #45a049;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1;
}

.nav-button:hover:not(:disabled) {
  background: #2196F3;
  color: white;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e0e0e0;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #2196F3;
  transform: scale(1.2);
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 0 1rem;
}

.social-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e3f2fd;
  color: #2196F3;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-button:hover {
  background: #2196F3;
  color: white;
  transform: translateY(-2px);
}

/* Transition animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .carousel-container {
    padding: 0 2rem;
  }

  .contact-card {
    padding: 1.5rem;
  }

  .social-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}
</style> 