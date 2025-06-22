<!-- Overview.vue -->
<template>
  <div class="overview">
    <h1 class="dashboard-title">Welcome Back, {{ user?.firstName }}!</h1>

    <!-- Analytics Overview -->
    <div class="analytics-grid">
      <div class="analytics-card">
        <div class="analytics-icon">
          <i class="fas fa-gamepad"></i>
        </div>
        <div class="analytics-content">
          <h3>Total Games Played</h3>
          <p class="analytics-value">{{ stats.totalGames }}</p>
          <p class="analytics-trend">
            <span class="trend-up" v-if="stats.gamesIncrease">↑</span>
            <span class="trend-down" v-else>↓</span>
            {{ stats.gamesChange }}% from last week
          </p>
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="analytics-content">
          <h3>Play Time</h3>
          <p class="analytics-value">{{ stats.totalPlayTime }}h</p>
          <p class="analytics-trend">
            <span class="trend-up" v-if="stats.timeIncrease">↑</span>
            <span class="trend-down" v-else>↓</span>
            {{ stats.timeChange }}% from last week
          </p>
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-icon">
          <i class="fas fa-heart"></i>
        </div>
        <div class="analytics-content">
          <h3>Love Badges</h3>
          <p class="analytics-value">{{ stats.totalBadges }}</p>
          <p class="analytics-trend">Latest badge: {{ stats.latestBadge }}</p>
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-icon">
          <i class="fas fa-star"></i>
        </div>
        <div class="analytics-content">
          <h3>Average Score</h3>
          <p class="analytics-value">{{ stats.averageScore }}%</p>
          <p class="analytics-trend">
            <span class="trend-up" v-if="stats.scoreIncrease">↑</span>
            <span class="trend-down" v-else>↓</span>
            {{ stats.scoreChange }}% from last week
          </p>
        </div>
      </div>
    </div>

    <!-- Activity Chart -->
    <div class="chart-section">
      <h2>Weekly Activity</h2>
      <div class="chart-container">
        <canvas ref="activityChart"></canvas>
      </div>
    </div>

    <!-- Badges Collection -->
    <div class="badges-section">
      <h2>Your Badges Collection</h2>
      <div class="badges-grid">
        <div v-for="badge in badges" :key="badge.id" class="badge-card">
          <div class="badge-icon" :class="{ 'badge-locked': !badge.earned }">
            <i :class="badge.icon"></i>
          </div>
          <h4>{{ badge.name }}</h4>
          <p>{{ badge.description }}</p>
          <span class="badge-date" v-if="badge.earned">Earned: {{ badge.earnedDate }}</span>
          <span class="badge-locked-text" v-else>Keep playing to unlock!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import Chart from 'chart.js/auto';

export default {
  name: 'DashboardOverview',
  setup() {
    const store = useStore();
    const activityChart = ref(null);
    const user = computed(() => store.state.user);

    // Simulated data - replace with actual API calls
    const stats = ref({
      totalGames: 45,
      gamesIncrease: true,
      gamesChange: 12,
      totalPlayTime: 23,
      timeIncrease: true,
      timeChange: 8,
      totalBadges: 12,
      latestBadge: 'Super Learner',
      averageScore: 85,
      scoreIncrease: true,
      scoreChange: 5
    });

    const badges = ref([
      {
        id: 1,
        name: 'First Steps',
        description: 'Complete your first game',
        icon: 'fas fa-shoe-prints',
        earned: true,
        earnedDate: '2024-02-01'
      },
      {
        id: 2,
        name: 'Super Learner',
        description: 'Play 5 days in a row',
        icon: 'fas fa-graduation-cap',
        earned: true,
        earnedDate: '2024-02-05'
      },
      {
        id: 3,
        name: 'Perfect Score',
        description: 'Get 100% in any game',
        icon: 'fas fa-star',
        earned: false
      }
    ]);

    onMounted(() => {
      // Wait for next tick to ensure canvas is mounted
      nextTick(() => {
        const ctx = activityChart.value.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Games Played',
              data: [4, 6, 3, 5, 7, 4, 6],
              borderColor: '#4a90e2',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
      });
    });

    return {
      user,
      stats,
      badges,
      activityChart
    };
  }
};
</script>

<style scoped>
.overview {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.analytics-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.analytics-icon {
  background: #4a90e2;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.analytics-content h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.analytics-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.analytics-trend {
  font-size: 0.9rem;
  color: #666;
}

.trend-up {
  color: #4caf50;
}

.trend-down {
  color: #f44336;
}

.chart-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-section h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.chart-container {
  height: 300px;
}

.badges-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.badges-section h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.badge-card {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.badge-icon {
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 1rem;
}

.badge-locked {
  color: #ccc;
}

.badge-card h4 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.badge-card p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.badge-date {
  font-size: 0.8rem;
  color: #4a90e2;
}

.badge-locked-text {
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .overview {
    padding: 1rem;
  }

  .analytics-grid {
    grid-template-columns: 1fr;
  }

  .badges-grid {
    grid-template-columns: 1fr;
  }
}
</style> 