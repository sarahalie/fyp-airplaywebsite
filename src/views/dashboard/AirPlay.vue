<!-- AirPlay.vue -->
<template>
  <div class="airplay">
    <div class="game-container">
      <div class="game-header">
        <h1>Draw the Shape</h1>
        <p class="game-description">
          Welcome to Draw the Shape! Use your hand to trace the shapes that appear on the screen.
          Let's make learning fun and interactive!
        </p>
      </div>

      <div class="game-preview">
        <img src="@/assets/coverairplay2.jpg" alt="Game Preview" class="preview-image" />
        <div class="preview-overlay">
          <button class="play-button" @click="startGame">
            <i class="fas fa-play"></i>
            Play Now
          </button>
        </div>
      </div>

      <div class="game-controls">
        <button class="control-button tutorial-button" @click="openTutorial" title="How to Play">
          <i class="fas fa-book"></i>
        </button>
      </div>
    </div>

    <div class="game-sidebar">
      <div class="tips-card">
        <h3>Quick Tips</h3>
        <ul class="tips-list">
          <li>Keep your hand steady and visible</li>
          <li>Follow the shape outline carefully</li>
          <li>Take your time for better accuracy</li>
          <li>Make sure you have good lighting</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AirPlay',
  data() {
    return {
      gameUrl: 'http://localhost:3000'
    }
  },
  methods: {
    startGame() {
      // Open the React game in a new tab
      window.open(this.gameUrl, '_blank');
    },
    openTutorial() {
      // Navigate to tutorials page
      this.$router.push('/dashboard/tutorials');
    }
  }
}
</script>

<style scoped>
.airplay {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.game-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.game-header {
  margin-bottom: 2rem;
  text-align: center;
}

.game-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.game-description {
  color: #666;
  line-height: 1.6;
}

.game-preview {
  aspect-ratio: 16/9;
  width: 100%;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-button {
  padding: 1.2rem 2.5rem;
  font-size: 1.4rem;
  background: #96CEB4;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.play-button:hover {
  transform: scale(1.05);
  background: #88B7A6;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.play-button i {
  font-size: 1.6rem;
}

.game-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.control-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #96CEB4;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-button.secondary {
  background: #f0f0f0;
  color: #666;
}

.control-button:hover {
  transform: translateY(-2px);
}

.control-button.secondary:hover {
  background: #e0e0e0;
}

.control-button i {
  font-size: 1.1rem;
}

.control-button.tutorial-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  color: #666;
  transition: all 0.3s ease;
}

.control-button.tutorial-button i {
  font-size: 1.5rem;
}

.control-button.tutorial-button:hover {
  background: #e0e0e0;
  transform: scale(1.1);
}

.game-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tips-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tips-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  color: #666;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tips-list li::before {
  content: '•';
  color: #96CEB4;
  font-size: 1.2rem;
}

@media (max-width: 1200px) {
  .airplay {
    grid-template-columns: 1fr;
  }

  .game-sidebar {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .tips-card {
    flex: 1;
    min-width: 250px;
  }
}

@media (max-width: 768px) {
  .airplay {
    padding: 1rem;
  }

  .game-header h1 {
    font-size: 2rem;
  }

  .game-controls {
    flex-direction: column;
  }

  .control-button {
    width: 100%;
    justify-content: center;
  }

  .play-button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
  }

  .control-button.tutorial-button {
    width: 45px;
    height: 45px;
  }

  .control-button.tutorial-button i {
    font-size: 1.3rem;
  }
}
</style> 