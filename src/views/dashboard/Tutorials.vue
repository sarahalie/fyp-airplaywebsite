<!-- Tutorials.vue -->
<template>
  <div class="tutorials">
    <div class="game-path">
      <!-- Step 1: Camera -->
      <div class="tutorial-station" :class="{ active: currentStep === 0 }" @click="setStep(0)">
        <div class="station-content">
          <div class="station-icon">
            <i class="fas fa-video"></i>
          </div>
          <div class="station-label">Camera</div>
          <div class="station-detail" v-if="currentStep === 0">
            <div class="detail-box">
              <i class="fas fa-camera-web fa-3x"></i>
              <span>Click Allow Camera!</span>
            </div>
          </div>
        </div>
        <div class="path-connector"></div>
      </div>

      <!-- Step 2: Shapes -->
      <div class="tutorial-station" :class="{ active: currentStep === 1 }" @click="setStep(1)">
        <div class="station-content">
          <div class="station-icon">
            <i class="fas fa-shapes"></i>
          </div>
          <div class="station-label">Shapes</div>
          <div class="station-detail" v-if="currentStep === 1">
            <div class="shape-grid">
              <div class="shape-item"><i class="fas fa-square"></i></div>
              <div class="shape-item"><i class="fas fa-circle"></i></div>
              <div class="shape-item"><i class="fas fa-star"></i></div>
              <div class="shape-item"><i class="fas fa-heart"></i></div>
            </div>
          </div>
        </div>
        <div class="path-connector"></div>
      </div>

      <!-- Step 3: Colors -->
      <div class="tutorial-station" :class="{ active: currentStep === 2 }" @click="setStep(2)">
        <div class="station-content">
          <div class="station-icon">
            <i class="fas fa-palette"></i>
          </div>
          <div class="station-label">Colors</div>
          <div class="station-detail" v-if="currentStep === 2">
            <div class="color-grid">
              <div class="color-dot" style="background: #FF0000"></div>
              <div class="color-dot" style="background: #00FF00"></div>
              <div class="color-dot" style="background: #0000FF"></div>
              <div class="color-dot" style="background: #FFFF00"></div>
            </div>
          </div>
        </div>
        <div class="path-connector"></div>
      </div>

      <!-- Step 4: Draw -->
      <div class="tutorial-station" :class="{ active: currentStep === 3 }" @click="setStep(3)">
        <div class="station-content">
          <div class="station-icon">
            <i class="fas fa-hand-point-up"></i>
          </div>
          <div class="station-label">Draw</div>
          <div class="station-detail" v-if="currentStep === 3">
            <div class="hand-guide">
              <i class="fas fa-hand-point-up fa-3x"></i>
              <span>Point finger to draw!</span>
            </div>
          </div>
        </div>
        <div class="path-connector"></div>
      </div>

      <!-- Step 5: Clear -->
      <div class="tutorial-station" :class="{ active: currentStep === 4 }" @click="setStep(4)">
        <div class="station-content">
          <div class="station-icon">
            <i class="fas fa-hand-paper"></i>
          </div>
          <div class="station-label">Clear</div>
          <div class="station-detail" v-if="currentStep === 4">
            <div class="hand-guide">
              <i class="fas fa-hand-paper fa-3x"></i>
              <span>Show all fingers to clear!</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="game-controls">
      <button class="control-btn prev" @click="prevStep" :disabled="currentStep === 0">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="play-btn" @click="startGame">
        <i class="fas fa-gamepad"></i>
        Play Game
      </button>
      <button class="control-btn next" @click="nextStep" :disabled="currentStep === 4">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tutorials',
  data() {
    return {
      currentStep: 0
    }
  },
  methods: {
    setStep(step) {
      this.currentStep = step;
    },
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    startGame() {
      window.open('http://localhost:3000/', '_blank');
    }
  }
}
</script>

<style scoped>
.tutorials {
  min-height: 80vh;
  padding: 2rem;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.game-path {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.tutorial-station {
  position: relative;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 15px;
  cursor: pointer;
}

.tutorial-station.active {
  background: #e3f2fd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.station-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.station-icon {
  width: 50px;
  height: 50px;
  background: #96CEB4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.station-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.path-connector {
  position: absolute;
  left: 25px;
  bottom: -1rem;
  width: 2px;
  height: 1rem;
  background: #96CEB4;
}

.station-detail {
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  text-align: center;
}

.detail-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #96CEB4;
}

.detail-box span {
  font-size: 1.1rem;
  color: #2c3e50;
}

.shape-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.shape-item {
  aspect-ratio: 1;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #96CEB4;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.color-dot {
  aspect-ratio: 1;
  border-radius: 50%;
}

.hand-guide {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #96CEB4;
}

.hand-guide span {
  color: #2c3e50;
}

.game-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #96CEB4;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.play-btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 50px;
  background: #96CEB4;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.play-btn i {
  font-size: 1.4rem;
}

@media (max-width: 768px) {
  .tutorials {
    padding: 1rem;
  }

  .game-path {
    padding: 1rem;
  }

  .station-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .station-label {
    font-size: 1rem;
  }

  .play-btn {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
}
</style> 