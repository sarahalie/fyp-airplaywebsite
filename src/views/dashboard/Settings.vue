<!-- Settings.vue -->
<template>
  <div class="settings">
    <div class="settings-header">
      <h1>Your Fun Space</h1>
      <p class="subtitle">Customize your experience and make it uniquely yours!</p>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
      <div class="profile-header">
        <div class="profile-avatar">
          <img :src="profile.avatar" alt="Profile Avatar" v-if="profile.avatar" />
          <div class="avatar-placeholder" v-else>
            {{ getInitials(profile.name) }}
          </div>
          <div class="avatar-upload">
            <label for="avatar-input">
              <i class="fas fa-camera"></i>
            </label>
            <input type="file" id="avatar-input" hidden @change="handleAvatarUpload" />
          </div>
        </div>
        <div class="profile-info">
          <h2>{{ profile.name }}</h2>
          <p class="profile-status">{{ profile.status }}</p>
          <div class="achievement-badges">
            <div v-for="badge in profile.badges" :key="badge.id" class="badge" :title="badge.name">
              <i :class="badge.icon"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Stats -->
      <div class="profile-stats">
        <div class="stat-item">
          <div class="stat-value">{{ profile.daysStreak }}</div>
          <div class="stat-label">Day Streak</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ profile.shapesDrawn }}</div>
          <div class="stat-label">Shapes Drawn</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ profile.accuracy }}%</div>
          <div class="stat-label">Accuracy</div>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-error">
      <i class="fas fa-exclamation-circle"></i>
      {{ error }}
    </div>

    <!-- Success Alert -->
    <div v-if="successMessage" class="alert alert-success">
      <i class="fas fa-check-circle"></i>
      {{ successMessage }}
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <!-- Settings Sections -->
    <div class="settings-grid">
      <!-- Personal Info -->
      <div class="settings-card">
        <div class="card-header">
          <i class="fas fa-user"></i>
          <h3>Personal Info</h3>
        </div>
        <div class="card-content">
          <div class="form-group">
            <label>Display Name</label>
            <input type="text" v-model="profile.name" placeholder="Your display name" />
          </div>
          <div class="form-group">
            <label>Status Message</label>
            <input type="text" v-model="profile.status" placeholder="What's on your mind?" />
          </div>
          <div class="form-group">
            <label>Birthday</label>
            <input type="date" v-model="profile.birthday" />
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="settings-card">
        <div class="card-header">
          <i class="fas fa-paint-brush"></i>
          <h3>Appearance</h3>
        </div>
        <div class="card-content">
          <div class="form-group">
            <label>Theme Color</label>
            <div class="color-options">
              <div v-for="color in themeColors" 
                   :key="color.value"
                   :class="['color-option', { active: preferences.theme === color.value }]"
                   :style="{ backgroundColor: color.code }"
                   @click="preferences.theme = color.value">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Cursor Style</label>
            <div class="cursor-options">
              <div v-for="cursor in cursorStyles" 
                   :key="cursor.value"
                   :class="['cursor-option', { active: preferences.cursor === cursor.value }]"
                   @click="preferences.cursor = cursor.value">
                <i :class="cursor.icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="save-section">
      <button class="save-button" @click="saveSettings" :disabled="loading">
        <i class="fas" :class="loading ? 'fa-spinner fa-spin' : 'fa-save'"></i>
        {{ loading ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>
  </div>
</template>

<script>
import settingsService from '@/services/settingsService';

export default {
  name: 'Settings',
  data() {
    return {
      profile: {
        name: '',
        status: '',
        avatar: null,
        daysStreak: 0,
        shapesDrawn: 0,
        accuracy: 0,
        birthday: '',
        badges: []
      },
      preferences: {
        theme: 'green',
        cursor: 'star'
      },
      themeColors: [
        { value: 'green', code: '#96CEB4' },
        { value: 'blue', code: '#4A90E2' },
        { value: 'purple', code: '#9B59B6' },
        { value: 'orange', code: '#E67E22' }
      ],
      cursorStyles: [
        { value: 'star', icon: 'fas fa-star' },
        { value: 'hand', icon: 'fas fa-hand-pointer' },
        { value: 'pencil', icon: 'fas fa-pencil-alt' },
        { value: 'magic', icon: 'fas fa-magic' }
      ],
      loading: false,
      error: null,
      successMessage: null
    };
  },
  async created() {
    await this.loadUserProfile();
  },
  methods: {
    getInitials(name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    },
    async loadUserProfile() {
      try {
        this.loading = true;
        // Get user data from localStorage or Vuex store
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          this.profile = {
            ...this.profile,
            name: userData.name || '',
            status: userData.status || '',
            avatar: userData.avatar || null,
            birthday: userData.birthday || '',
            badges: userData.badges || [],
            daysStreak: userData.daysStreak || 0,
            shapesDrawn: userData.shapesDrawn || 0,
            accuracy: userData.accuracy || 0
          };
          this.preferences = {
            ...this.preferences,
            theme: userData.theme || 'green',
            cursor: userData.cursor || 'star'
          };
        }
      } catch (error) {
        this.error = 'Failed to load profile data';
        console.error('Error loading profile:', error);
      } finally {
        this.loading = false;
      }
    },
    async handleAvatarUpload(event) {
      try {
        const file = event.target.files[0];
        if (file) {
          this.loading = true;
          const response = await settingsService.uploadAvatar(file);
          this.profile.avatar = response.avatarUrl;
          this.showSuccessMessage('Avatar updated successfully!');
          
          // Update local storage
          const userData = JSON.parse(localStorage.getItem('user'));
          userData.avatar = response.avatarUrl;
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        this.error = 'Failed to upload avatar';
        console.error('Error uploading avatar:', error);
      } finally {
        this.loading = false;
      }
    },
    async saveSettings() {
      try {
        this.loading = true;
        this.error = null;

        // Save profile data
        const profileData = {
          name: this.profile.name,
          status: this.profile.status,
          birthday: this.profile.birthday
        };
        await settingsService.updateProfile(profileData);

        // Save appearance preferences
        const appearanceData = {
          theme: this.preferences.theme,
          cursor: this.preferences.cursor
        };
        await settingsService.updateAppearance(appearanceData);

        // Update local storage
        const userData = JSON.parse(localStorage.getItem('user'));
        const updatedUserData = {
          ...userData,
          ...profileData,
          ...appearanceData
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));

        this.showSuccessMessage('Settings saved successfully!');
      } catch (error) {
        this.error = error.message || 'Failed to save settings';
        console.error('Error saving settings:', error);
      } finally {
        this.loading = false;
      }
    },
    showSuccessMessage(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.settings {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.settings-header {
  text-align: center;
  margin-bottom: 3rem;
}

.settings-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.profile-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: #96CEB4;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
}

.avatar-upload {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.avatar-upload i {
  color: #96CEB4;
}

.profile-info h2 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.profile-status {
  color: #666;
  margin-bottom: 1rem;
}

.achievement-badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  width: 32px;
  height: 32px;
  background: rgba(150, 206, 180, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #96CEB4;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  text-align: center;
}

.stat-item {
  padding: 1rem;
  background: rgba(150, 206, 180, 0.1);
  border-radius: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #96CEB4;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.settings-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: #f8f9fa;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-header i {
  color: #96CEB4;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
}

.card-content {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 500;
}

input[type="text"],
input[type="date"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.color-options,
.cursor-options {
  display: flex;
  gap: 1rem;
}

.color-option {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border: 2px solid white;
  box-shadow: 0 0 0 2px #96CEB4;
}

.cursor-option {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cursor-option:hover {
  background: #e0e0e0;
}

.cursor-option.active {
  background: #96CEB4;
  color: white;
}

.save-section {
  text-align: center;
}

.save-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #96CEB4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button:hover {
  background: #88B7A6;
  transform: translateY(-2px);
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-error {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.alert-success {
  background-color: #dcfce7;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #96CEB4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .settings {
    padding: 1rem;
  }

  .settings-header h1 {
    font-size: 2rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-avatar {
    margin: 0 auto;
  }

  .achievement-badges {
    justify-content: center;
  }
}
</style> 