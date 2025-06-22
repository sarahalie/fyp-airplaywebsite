<template>
  <v-container class="about">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h2 mb-6">About Our Platform</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="mb-6" elevation="2">
          <v-card-text class="text-body-1">
            <p class="mb-4">
              Our platform is dedicated to making learning accessible and enjoyable for children with dyslexia. We understand the unique challenges that dyslexic learners face, and we've designed our platform to provide the support they need to succeed.
            </p>
            <p>
              Through interactive games, personalized learning paths, and constant encouragement, we help children build confidence in their reading and writing abilities.
            </p>
          </v-card-text>
        </v-card>

        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h4">Our Mission</v-card-title>
          <v-card-text class="text-body-1">
            <p>
              To create an inclusive learning environment where every child can discover their potential, regardless of their learning differences.
            </p>
          </v-card-text>
        </v-card>

        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h4">Accessibility Features</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(feature, index) in features" :key="index">
                <v-list-item-icon>
                  <v-icon color="primary">{{ feature.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">{{ feature.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ feature.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Text Size Controls -->
        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h4">Customize Your Reading Experience</v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" sm="6">
                <v-slider
                  v-model="textSize"
                  min="100"
                  max="200"
                  step="10"
                  thumb-label
                  @update:model-value="updateTextSize"
                >
                  <template v-slot:prepend>
                    <v-icon>mdi-format-size</v-icon>
                  </template>
                </v-slider>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn-toggle v-model="lineSpacing" mandatory>
                  <v-btn value="1.4">
                    <v-icon>mdi-format-line-spacing</v-icon>
                    Normal
                  </v-btn>
                  <v-btn value="1.8">
                    <v-icon>mdi-format-line-spacing</v-icon>
                    Wide
                  </v-btn>
                  <v-btn value="2.2">
                    <v-icon>mdi-format-line-spacing</v-icon>
                    Extra Wide
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  data: () => ({
    textSize: 100,
    lineSpacing: '1.8',
    features: [
      {
        icon: 'mdi-format-font',
        title: 'Dyslexia-Friendly Font',
        description: 'Using OpenDyslexic font to improve readability'
      },
      {
        icon: 'mdi-contrast-box',
        title: 'High Contrast Mode',
        description: 'Optimized color combinations for better visibility'
      },
      {
        icon: 'mdi-format-line-spacing',
        title: 'Adjustable Spacing',
        description: 'Customize line spacing for comfortable reading'
      },
      {
        icon: 'mdi-volume-high',
        title: 'Text-to-Speech',
        description: 'Audio support for all text content'
      },
      {
        icon: 'mdi-tune',
        title: 'Personalization',
        description: 'Customize text size and color preferences'
      }
    ]
  }),
  methods: {
    updateTextSize(value) {
      document.documentElement.style.setProperty('--text-scale', `${value}%`)
    },
    watch: {
      lineSpacing(value) {
        document.documentElement.style.setProperty('--line-spacing', value)
      }
    }
  }
}
</script>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
}

/* High contrast and readability improvements */
.text-h2, .text-h4 {
  color: #000000;
  line-height: 1.4;
  margin-bottom: 1.5rem;
}

.text-body-1 {
  line-height: var(--line-spacing, 1.8);
  font-size: 1.2rem;
}

.v-list-item {
  padding: 1rem 0;
}

.v-list-item-title {
  font-size: 1.2rem !important;
  margin-bottom: 0.5rem;
}

.v-list-item-subtitle {
  font-size: 1.1rem !important;
  line-height: 1.6;
}

.v-card {
  padding: 1.5rem;
}

/* Increase touch targets */
.v-btn {
  min-height: 48px;
}

.v-btn-toggle {
  gap: 8px;
}
</style> 