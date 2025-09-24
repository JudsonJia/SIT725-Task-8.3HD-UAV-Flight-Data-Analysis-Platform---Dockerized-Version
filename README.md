# UAV Flight Data Analysis Platform

A comprehensive web-based platform for analyzing UAV flight trajectory data, providing real-time processing, 3D visualization, and detailed performance metrics.

## Features

### Core Functionality
- **Flight Data Upload**: JSON format flight data processing with validation
- **Trajectory Analysis**: Advanced algorithms for path accuracy, stability metrics, and efficiency calculations
- **Progress Tracking**: Socket.io powered live analysis with progress tracking
- **3D Visualization**: Interactive Three.js based trajectory visualization with error indicators
- **User Management**: JWT-based authentication and user-specific data isolation

### Analysis Capabilities
- Position accuracy measurements (average, min, max errors)
- Flight phase analysis (waypoint vs transit performance)
- Speed calculations
- Lantency computation

## Architecture

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time Communication**: Socket.io
- **Authentication**: JWT tokens
- **File Processing**: Multer for file uploads

### Frontend
- **UI Framework**: Materialize CSS
- **3D Graphics**: Three.js with OrbitControls
- **Real-time Updates**: Socket.io client
- **Visualization**: Interactive 3D trajectory playback

### Key Components
```
├── models/
│   ├── FlightData.js          # MongoDB schema for flight data
│   ├── AnalysisReport.js      # Analysis results storage
│   ├── TrajectoryAnalyzer.js  # Core analysis algorithms
│   └── UAVDataProcessor.js    # Data processing pipeline
├── routes/
│   ├── auth.js               # Authentication endpoints
│   ├── flights.js            # Flight data management
│   ├── dashboard.js          # Dashboard data APIs
│   └── analysis.js           # Analysis report management
├── views/
│   ├── dashboard.html        # Main dashboard
│   ├── visualization.html    # 3D visualization
│   ├── analysis.html         # Analysis reports
│   └── flights.html          # Flight history management
└── public/
    └── js/
        └── flights.js        # Frontend flight management
```

## Data Format

### Input JSON Structure
```json
{
  "timestamp": "20250513_194215",
  "response_time": 10.557384014129639,
  "sequence": [[0, 0, 0.3], [0, 0, 0.6], [0, 0, 0.9]],
  "position_data": [
    {
      "x": 0.03792250156402588,
      "y": 0.014045102521777153,
      "z": 0.3062497675418854,
      "time": 1747129326.1983385,
      "target": {"x": 0.0, "y": 0.0, "z": 0.6},
      "phase": "transit",
      "stabilized": false,
      "error": 0.04043984458081876
    }
  ],
  "command_stats": {
    "sent": 1620,
    "dropped": 0,
    "total_attempts": 1620
  }
}
```

### Required Fields
- `timestamp`: Flight session identifier
- `position_data`: Array of position measurements
  - `x`, `y`, `z`: 3D coordinates (meters)
  - `time`: Unix timestamp
  - `error`: Position error (meters)
  - `phase`: Flight phase ("waypoint" or "transit")
  - `stabilized`: Boolean stability indicator

## Usage

### Basic Workflow

1. **User Registration/Login**
   - Navigate to `/register` or `/login`
   - Create account or authenticate

2. **Upload Flight Data**
   - Go to Dashboard (`/dashboard`)
   - Use file upload form to submit JSON data
   - System validates and processes data automatically

3. **View Analysis Results**
   - Flight data appears in recent flights table
   - Click "Analysis" to generate detailed reports
   - View real-time analysis progress via Socket.io

4. **3D Visualization**
   - Click "Visualization" for any flight
   - Interactive 3D trajectory playback
   - Error indicators and network quality overlays

## API Documentation

### Authentication
All API endpoints require JWT authentication via `Authorization: Bearer <token>` header.

### Key Endpoints

#### Flight Management
```
POST /api/flights/upload          # Upload flight data
GET  /api/flights/history         # Get user's flight history  
GET  /api/flights/:id            # Get specific flight details
PUT  /api/flights/:id            # Update flight metadata
DELETE /api/flights/:id          # Delete flight data
```

#### Analysis
```
GET  /api/analysis/reports       # Get analysis reports
DELETE /api/analysis/reports/:id # Delete analysis report
```

#### Dashboard
```
GET /api/dashboard/data          # Get dashboard statistics
GET /api/dashboard/activity      # Get activity timeline
```

### Socket.io Events
```javascript
// Start analysis
socket.emit('startAnalysis', { flightId, userId });

// Listen for progress
socket.on('analysisProgress', (data) => {
  console.log(data.message, data.progress);
});

// Analysis completion
socket.on('analysisComplete', (result) => {
  console.log('Analysis finished:', result.report);
});
```

## Docker Deployment
### Prerequisites
```
Docker installed on your machine
Docker Compose installed (comes with Docker Desktop)
```

### Quick Start with Docker
#### Clone the repository
```
https://github.com/JudsonJia/SIT725-Task-8.3HD-UAV-Flight-Data-Analysis-Platform---Dockerized-Version.git
cd SIT725-Task-8.3HD-UAV-Flight-Data-Analysis-Platform---Dockerized-Version
```

#### Start the application with Docker Compose
```
docker-compose up --build
```
#### Access the application
```
Main application: http://localhost:3000
Student API: http://localhost:3000/api/student
```
#### Stop the Application
```
docker-compose down
```

### How to Build and Run Docker Container (Alternative Method)
#### How to Build the Image
```
docker build -t uav-analysis-app .
```
#### How to Run the Container
```
docker run -p 3000:3000 uav-analysis-app
```
### Verification
```
# Check if container is running
docker ps

# Test student API
curl http://localhost:3000/api/student
```

### Expected /api/student Output
```
{
"name": "Disen Jia",
"studentId": "223314816"
}
```
---

**Built with ❤️ for UAV research and analysis**
