# Movie Booking System 🎬🎫

A full-stack movie ticket booking application built with React Native for mobile and Go for backend services.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Development](#development)
- [Building for Production](#building-for-production)
- [License](#license)

---

## 🎯 Project Overview

Movie Booking System is a comprehensive mobile application that allows users to:
- Browse available movies and theaters
- View detailed movie information
- Select show times and theaters
- Choose seats interactively
- Book tickets and view booking history

The system uses a **Go backend API** for server-side operations and a **React Native + Redux** frontend for cross-platform mobile support.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│     React Native Mobile App             │
│  (iOS & Android via React Native)       │
│  - Redux State Management               │
│  - Redux-Observable Middleware          │
│  - Axios HTTP Client                    │
└────────────┬────────────────────────────┘
             │
             │ HTTP REST API
             │
┌────────────▼────────────────────────────┐
│  Go Backend Service (Port 8080)         │
│  - Database Connection Management       │
│  - API Endpoints                        │
│  - Business Logic                       │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│     Database Layer                      │
│  (SQL-based via migrations)             │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **React Native** (v0.75.4) - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **Redux** - Predictable state management
- **Redux-Observable** - RxJS-based middleware for async actions

### Backend
- **Go (Golang)** - Backend API service
- **Database** - SQL-based (PostgreSQL/MySQL)
- **Docker** - Containerization

---

## ✨ Features

### User Features
- 🎬 **Movie Discovery**: Browse all available movies with filtering
- 🏢 **Theater Selection**: View theaters and their details
- 📺 **Show Management**: See available show times and dates
- 💺 **Interactive Seat Selection**: Visual seat map with real-time availability
- 🎫 **Ticket Booking**: Complete booking workflow with confirmation
- 📱 **My Bookings**: View all previous bookings and ticket details
- 🔍 **Search**: Find movies by name

### Technical Features
- 📱 Cross-platform mobile support (iOS & Android)
- 🔄 State management with Redux
- 🌐 RESTful API integration
- 📊 Responsive UI components
- 🎨 Consistent theming system
- ♿ Accessible UI components

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** >= 18
- **npm** or **yarn** package manager
- **Java Development Kit (JDK)** 11+ for Android
- **Xcode** 14+ for iOS (macOS only)
- **Android Studio** or **Android SDK** for Android development
- **Go** 1.22+ (for backend development)

### Step 1: Clone the Repository

```bash
git clone https://github.com/bhumikabiyani/movie-booking-system.git
cd movie-booking-system
```

### Step 2: Install Dependencies

```bash
npm install
# OR
yarn install
```

### Step 3: Install Pod Dependencies (iOS only)

```bash
cd ios
pod install
cd ..
```

---

## 🏃 Getting Started

### Step 1: Start the Metro Bundler

The Metro bundler must be running in a dedicated terminal:

```bash
npm start
# OR
yarn start
```

You should see output like:
```
┌────────────────────────────────────────────────────────────────┐
│  Welcome to Metro v0.xx.x                                      │
│  Fast - Scalable - Integrated                                  │
└────────────────────────────────────────────────────────────────┘
```

### Step 2: Run the Application

Keep the Metro bundler running and open a new terminal to run the app.

#### For Android

```bash
npm run android
# OR
yarn android
```

Alternatively, open the project in Android Studio and run from there.

#### For iOS

```bash
npm run ios
# OR
yarn ios
```

Alternatively, open `ios/project_mbs.xcworkspace` in Xcode and run from there.

### Step 3: Verify the App

- The app should launch in your emulator/simulator
- You should see the home page with movies and theaters
- Try browsing a movie and selecting seats

---

## 🔧 Backend Setup

### Starting the Go Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend/golang/my-golang-service
   ```

2. **Install Go dependencies:**
   ```bash
   go mod download
   ```

3. **Configure the backend:**
   - Edit `config.yaml` with your database credentials
   - Update the API endpoint in `src/constants/urlEndpoint.ts`

4. **Run the backend:**
   ```bash
   go run main.go
   ```

   The server will start on `http://localhost:8080`

### Docker Setup (Optional)

```bash
cd backend/golang/my-golang-service
docker build -t movie-booking-api .
docker run -p 8080:8080 movie-booking-api
```

### Database Migrations

Database migrations are located in `backend/db-migration/mbs/`:

```bash
# Run migrations based on your database setup
psql -U postgres < backend/db-migration/mbs/20241024101518_main.sql
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server (Metro bundler)
npm start

# Run Android app
npm run android

# Run iOS app
npm run ios

# Run tests
npm test

# Run linter
npm run lint

# Generate Android APK
bash generateAPK.bash
```

---

## 🐛 Troubleshooting

### Metro Bundler Issues
- Clear cache: `npm start -- --reset-cache`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Android Issues
- Clear Gradle cache: `cd android && ./gradlew clean && cd ..`
- Rebuild: `npm run android`

### iOS Issues
- Clear Pod cache: `cd ios && rm -rf Pods && pod install && cd ..`
- Clear Xcode cache: Cmd + Shift + K in Xcode

### Backend Connection Issues
- Verify backend is running on port 8080
- Check URL endpoint in `src/constants/urlEndpoint.ts`
- For Android emulator use `10.0.2.2:8080`
- For iOS simulator use `localhost:8080`

---

## 📚 Resources

- [React Native Documentation](https://reactnative.dev)
- [Redux Documentation](https://redux.js.org)
- [Redux-Observable Documentation](https://redux-observable.js.org)
- [React Navigation](https://reactnavigation.org)
- [Go Documentation](https://golang.org/doc)
- [Axios Documentation](https://axios-http.com)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Copyright © 2025 Bhumika Biyani**
