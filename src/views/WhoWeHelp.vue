<template>
  <div class="who-we-help">
    <section class="hero">
      <div class="hero-content">
        <h1>Empowering Children with Dyslexia</h1>
        <p class="subtitle">Interactive play and learning activities designed to help children improve essential skills.</p>
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
    </section>

    <section class="main-content">
      <div class="content-grid">
        <div class="content-card">
          <div class="card-image-wrapper">
            <img src="@/assets/childrenpage.png" alt="Children playing with letters" />
            <div class="image-overlay"></div>
          </div>
          <div class="card-content">
            <span class="tag">Learning Support</span>
            <h2>Children with Dyslexia</h2>
            <p>We focus on helping children with dyslexia improve their learning abilities through interactive play. Our goal is to create a fun, engaging, and educational environment for children to develop essential skills.</p>
            <a href="https://www.madebydyslexia.org/kids/" target="_blank" rel="noopener noreferrer" class="cta-button">
              <span>READ MORE</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <div class="content-card">
          <div class="card-image-wrapper">
            <img src="@/assets/whowehelep.png" alt="Parent and child using tablet" />
            <div class="image-overlay"></div>
          </div>
          <div class="card-content">
            <span class="tag">Assessment</span>
            <h2>Does My Child Have Dyslexia?</h2>
            <p>Finding out your child may have a learning disability can be scary, but it's better to know now when there's so much you can do about it. Click on the at-home dyslexia test that best fits your family below.</p>
            <a href="https://www.lexercise.com/tests/dyslexia-test" target="_blank" rel="noopener noreferrer" class="cta-button">
              <span>TRY NOW</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="air-drawing">
      <h2>Air-Drawing Games for Dyslexia</h2>
      <div class="games-grid">
        <div class="game-card">
          <div class="game-preview">
            <img src="@/assets/draw the shape.png" alt="Draw the Shape game preview" />
            <div class="preview-overlay">
              <div class="game-badge">Featured Game</div>
            </div>
          </div>
          <div class="game-content">
            <div class="game-header">
              <h3>1. Draw the Shape</h3>
              <div class="difficulty">
                <span class="dot"></span>
                <span>Beginner Friendly</span>
              </div>
            </div>
            <p>Welcome to Draw the Shape, the fun and interactive game that challenges your creativity and motor skills! Trace the shapes that appear on the screen and earn points based on accuracy.</p>
            <router-link to="/login" class="play-button">
              <span>PLAY NOW</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </router-link>
          </div>
        </div>
        <div class="game-preview-card">
          <div class="preview-content">
            <div class="coming-soon-badge">Coming Soon</div>
            <p class="preview-title">*video demo*</p>
            <div class="progress-bar">
              <div class="progress" style="width: 75%"></div>
            </div>
            <p class="progress-text">Development Progress: 75%</p>
            <button class="play-button" disabled>
              <span>PLAY</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'WhoWeHelp',
  data() {
    return {
      gameUrl: 'http://localhost:3000'
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.user !== null;
    }
  },
  methods: {
    startGame() {
      if (!this.isAuthenticated) {
        // Redirect to login with return URL
        this.$router.push({
          path: '/login',
          query: { redirect: '/dashboard/airplay' }
        });
        return;
      }
      window.open(this.gameUrl, '_blank');
    }
  }
}
</script>

<style scoped>
.who-we-help {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

.hero {
  text-align: center;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(150, 206, 180, 0.1), rgba(0, 102, 255, 0.05));
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(150, 206, 180, 0.2), rgba(0, 102, 255, 0.1));
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: -5s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 10%;
  left: 45%;
  animation-delay: -10s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(100px, 50px) rotate(180deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

.hero h1 {
  font-size: 3.5rem;
  background: linear-gradient(45deg, #333, #0066ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.3rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin: 4rem 0;
}

.content-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
}

.card-image-wrapper img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.content-card:hover {
  transform: translateY(-10px);
}

.content-card:hover .card-image-wrapper img {
  transform: scale(1.05);
}

.content-card:hover .image-overlay {
  opacity: 1;
}

.card-content {
  padding: 2.5rem;
  background: white;
}

.tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(150, 206, 180, 0.1);
  color: #96CEB4;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.card-content h2 {
  color: #333;
  margin-bottom: 1.2rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
}

.card-content p {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #96CEB4, #7fb39b);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1rem;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(150, 206, 180, 0.2);
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(5px);
}

.air-drawing {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 30px;
  margin-top: 2rem;
}

.air-drawing h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #333, #0066ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -1px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.game-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.game-preview {
  position: relative;
  background: linear-gradient(135deg, #f5f5f5, #ffffff);
  padding: 1.5rem;
}

.preview-overlay {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  bottom: 1.5rem;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-start;
  padding: 1rem;
}

.game-badge {
  background: rgba(40, 167, 69, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.game-card:hover .preview-overlay {
  opacity: 1;
}

.game-preview img {
  width: 100%;
  border-radius: 16px;
  transition: transform 0.6s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.game-content {
  padding: 2rem;
  background: white;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.difficulty {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.dot {
  width: 8px;
  height: 8px;
  background: #28a745;
  border-radius: 50%;
}

.game-content h3 {
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
}

.game-content p {
  color: #666;
  margin: 1rem 0 2rem;
  line-height: 1.8;
}

.play-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #28a745, #218838);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.play-button:hover:not([disabled]) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(40, 167, 69, 0.2);
}

.play-button svg {
  transition: transform 0.3s ease;
}

.play-button:hover:not([disabled]) svg {
  transform: translateX(5px);
}

.game-preview-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}

.preview-content {
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.coming-soon-badge {
  background: rgba(0, 102, 255, 0.1);
  color: #0066ff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.preview-title {
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(45deg, #96CEB4, #7fb39b);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #666;
  font-size: 0.9rem;
}

.play-button[disabled] {
  background: linear-gradient(45deg, #ccc, #999);
  cursor: not-allowed;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .content-grid,
  .games-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero {
    padding: 4rem 1rem;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .card-image-wrapper img {
    height: 250px;
  }

  .card-content,
  .game-content,
  .preview-content {
    padding: 2rem;
  }

  .shape {
    display: none;
  }
}
</style>