<!-- Reports.vue -->
<template>
  <div class="reports">
    <div class="reports-header">
      <h1>Your Gaming Journey</h1>
      <p class="subtitle">Track your progress and see how you're improving!</p>
    </div>

    <!-- Time Tracking -->
    <div class="stats-grid">
      <div class="stat-card time-played">
        <div class="stat-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-content">
          <h3>Total Time Played</h3>
          <div class="stat-value">{{ formatTime(totalMinutes) }}</div>
          <p class="stat-trend">
            <i class="fas fa-arrow-up"></i>
            +{{ weeklyGrowth }}% from last week
          </p>
        </div>
      </div>

      <div class="stat-card accuracy">
        <div class="stat-icon">
          <i class="fas fa-bullseye"></i>
        </div>
        <div class="stat-content">
          <h3>Average Accuracy</h3>
          <div class="stat-value">{{ averageAccuracy }}%</div>
          <div class="accuracy-bar">
            <div :style="{ width: `${averageAccuracy}%` }" class="accuracy-fill"></div>
          </div>
        </div>
      </div>

      <div class="stat-card sessions">
        <div class="stat-icon">
          <i class="fas fa-calendar-check"></i>
        </div>
        <div class="stat-content">
          <h3>Practice Sessions</h3>
          <div class="stat-value">{{ totalSessions }}</div>
          <p class="stat-detail">Last session: {{ lastSession }}</p>
        </div>
      </div>
    </div>

    <!-- Favorite Shapes Analysis -->
    <div class="shapes-analysis">
      <h2>Your Favorite Shapes</h2>
      <div class="shapes-grid">
        <div v-for="shape in favoriteShapes" :key="shape.name" class="shape-card">
          <div class="shape-icon" :class="shape.class">
            <i :class="shape.icon"></i>
          </div>
          <h4>{{ shape.name }}</h4>
          <div class="shape-stats">
            <div class="stat">
              <span class="label">Times Drawn</span>
              <span class="value">{{ shape.timesDrawn }}</span>
            </div>
            <div class="stat">
              <span class="label">Avg. Accuracy</span>
              <span class="value">{{ shape.accuracy }}%</span>
            </div>
          </div>
          <div class="progress-bar">
            <div :style="{ width: `${shape.mastery}%` }" class="progress-fill"></div>
          </div>
          <span class="mastery-label">Mastery: {{ shape.mastery }}%</span>
        </div>
      </div>
    </div>

    <!-- Weekly Progress Chart -->
    <div class="progress-chart">
      <h2>Weekly Progress</h2>
      <div class="chart-container">
        <canvas ref="weeklyChart"></canvas>
      </div>
    </div>

    <!-- Achievement Timeline -->
    <div class="achievement-timeline">
      <h2>Achievement Timeline</h2>
      <div class="timeline">
        <div v-for="achievement in achievements" :key="achievement.id" class="timeline-item">
          <div class="timeline-icon" :class="{ 'completed': achievement.completed }">
            <i :class="achievement.icon"></i>
          </div>
          <div class="timeline-content">
            <h4>{{ achievement.title }}</h4>
            <p>{{ achievement.description }}</p>
            <span class="timeline-date">{{ achievement.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'Reports',
  setup() {
    const weeklyChart = ref(null);
    const totalMinutes = ref(480); // 8 hours
    const weeklyGrowth = ref(15);
    const averageAccuracy = ref(85);
    const totalSessions = ref(24);
    const lastSession = ref('Today at 2:30 PM');

    const favoriteShapes = ref([
      {
        name: 'Circle',
        icon: 'fas fa-circle',
        class: 'circle',
        timesDrawn: 45,
        accuracy: 92,
        mastery: 95
      },
      {
        name: 'Square',
        icon: 'fas fa-square',
        class: 'square',
        timesDrawn: 38,
        accuracy: 88,
        mastery: 85
      },
      {
        name: 'Triangle',
        icon: 'fas fa-play',
        class: 'triangle',
        timesDrawn: 32,
        accuracy: 82,
        mastery: 78
      },
      {
        name: 'Star',
        icon: 'fas fa-star',
        class: 'star',
        timesDrawn: 28,
        accuracy: 75,
        mastery: 70
      }
    ]);

    const achievements = ref([
      {
        id: 1,
        title: 'First Perfect Circle',
        description: 'Drew your first circle with 100% accuracy',
        date: 'March 15, 2024',
        icon: 'fas fa-circle',
        completed: true
      },
      {
        id: 2,
        title: 'Shape Master',
        description: 'Completed 50 shapes with over 90% accuracy',
        date: 'March 18, 2024',
        icon: 'fas fa-award',
        completed: true
      },
      {
        id: 3,
        title: 'Practice Makes Perfect',
        description: 'Practiced for 5 days in a row',
        date: 'March 20, 2024',
        icon: 'fas fa-calendar-check',
        completed: false
      }
    ]);

    const formatTime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    };

    onMounted(() => {
      const ctx = weeklyChart.value.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Time Played (minutes)',
              data: [45, 60, 75, 90, 60, 120, 90],
              borderColor: '#96CEB4',
              tension: 0.4,
              fill: true,
              backgroundColor: 'rgba(150, 206, 180, 0.1)'
            },
            {
              label: 'Accuracy (%)',
              data: [75, 80, 82, 88, 85, 92, 90],
              borderColor: '#4A90E2',
              tension: 0.4,
              fill: true,
              backgroundColor: 'rgba(74, 144, 226, 0.1)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            }
          }
        }
      });
    });

    return {
      weeklyChart,
      totalMinutes,
      weeklyGrowth,
      averageAccuracy,
      totalSessions,
      lastSession,
      favoriteShapes,
      achievements,
      formatTime
    };
  }
};
</script>

<style scoped>
.reports {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.reports-header {
  text-align: center;
  margin-bottom: 3rem;
}

.reports-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.time-played .stat-icon {
  background: rgba(150, 206, 180, 0.1);
  color: #96CEB4;
}

.accuracy .stat-icon {
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
}

.sessions .stat-icon {
  background: rgba(255, 107, 107, 0.1);
  color: #FF6B6B;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.stat-trend {
  color: #4caf50;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.accuracy-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.accuracy-fill {
  height: 100%;
  background: #4A90E2;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.shapes-analysis {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.shapes-analysis h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.shapes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.shape-card {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.shape-card:hover {
  transform: translateY(-5px);
}

.shape-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1rem;
}

.shape-icon.circle { background: rgba(150, 206, 180, 0.1); color: #96CEB4; }
.shape-icon.square { background: rgba(74, 144, 226, 0.1); color: #4A90E2; }
.shape-icon.triangle { background: rgba(255, 107, 107, 0.1); color: #FF6B6B; }
.shape-icon.star { background: rgba(255, 193, 7, 0.1); color: #FFC107; }

.shape-stats {
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.8rem;
  color: #666;
}

.value {
  font-weight: bold;
  color: #2c3e50;
}

.progress-bar {
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.progress-fill {
  height: 100%;
  background: #96CEB4;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.mastery-label {
  font-size: 0.9rem;
  color: #666;
}

.progress-chart {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-chart h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.chart-container {
  height: 300px;
}

.achievement-timeline {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.achievement-timeline h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #f0f0f0;
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-icon {
  position: absolute;
  left: -2.5rem;
  width: 32px;
  height: 32px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.timeline-icon.completed {
  background: #96CEB4;
  color: white;
}

.timeline-content {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.timeline-content h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.timeline-date {
  font-size: 0.8rem;
  color: #999;
}

@media (max-width: 768px) {
  .reports {
    padding: 1rem;
  }

  .reports-header h1 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .shapes-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style> 