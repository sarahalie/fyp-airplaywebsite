# AirPlay Website

A Vue.js-based website for the AirPlay platform, designed to help children with dyslexia learn through interactive drawing games.

## Features

- User Authentication (Login/Register)
- Interactive Dashboard
- Game Integration
- Progress Tracking
- Responsive Design
- Dyslexia-friendly Interface

## Tech Stack

- Vue.js 3
- Vuex for State Management
- Vue Router for Navigation
- Vuetify for UI Components
- Node.js Backend Integration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sarahalie/fyp-airplaywebsite.git
cd fyp-airplaywebsite
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory and add necessary environment variables:
```env
VUE_APP_API_URL=http://localhost:5000
VUE_APP_GAME_URL=http://localhost:3000
```

## Development

To run the development server:

```bash
npm run serve
```

The application will be available at http://localhost:8080

## Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
website/
├── public/              # Static files
├── src/                 # Source files
│   ├── assets/         # Images and static resources
│   ├── components/     # Vue components
│   ├── views/          # Vue views/pages
│   ├── router/         # Vue router configuration
│   ├── store/          # Vuex store modules
│   ├── services/       # API services
│   └── plugins/        # Vue plugins
└── tests/              # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 