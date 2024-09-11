# Ride-Sharing Driver Mobile App

This is a simplified ride-sharing driver mobile application developed using **React Native** and **Redux** for state management. The app allows drivers to view nearby ride requests on a map, select a request, and either accept or decline it.

## Features

- Displays the driver's current location on a map.
- Fetches and displays nearby ride requests using dummy data.
- Allows the driver to select a ride request and view details such as pickup location, destination, and user information.
- Drivers can accept or decline ride requests.
- Ride requests' statuses (e.g., pending, accepted, declined) are managed through **Redux**.
- Dynamic marker colors on the map based on the ride request status.

## Requirements

- [Node.js](https://nodejs.org/) (under v17)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- An iOS or Android device running Expo Go

## Installation

1. Clone this repository:
git clone https://github.com/Chaos-cyber223/RideSharingDriverApp.git

# Navigate to the project directory:
```bash
cd RideSharingDriverApp
```

# Install the dependencies:
```bash
npm install
```

# Running the App

1. Start the Expo development server:
```bash
npm start
```

2. Open the app using the Expo Go app on your physical device:
- iOS: Use your iPhone's camera to scan the QR code displayed in the terminal after running npm start. This will open the Expo Go app, where the app will load.
- Android: Open the Expo Go app on your Android phone and use the in-app QR code scanner to scan the QR code displayed in the terminal after running npm start.
- Ensure you have the Expo Go app installed on your physical device (available from the App Store or Google Play).
