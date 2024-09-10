import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { setDriverLocation, setRideRequests } from '../redux/actions';
import { selectDriverLocation, selectRideRequests } from '../redux/selectors';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const driverLocation = useSelector(selectDriverLocation);
  const rideRequests = useSelector(selectRideRequests);
  const [errorMsg, setErrorMsg] = useState(null);

  const generateNearbyRideRequests = (currentLocation) => {
    const { latitude, longitude } = currentLocation.coords;

    const newRideRequests = Array.from({ length: 4 }, (_, i) => ({
      id: `${i + 1}`,
      userId: `user${i + 1}`,
      driverId: null,
      pickupLocation: {
        latitude: latitude + (Math.random() * 0.01 - 0.005),
        longitude: longitude + (Math.random() * 0.01 - 0.005),
      },
      destination: {
        latitude: latitude + (Math.random() * 0.02 - 0.01),
        longitude: longitude + (Math.random() * 0.02 - 0.01),
      },
      status: 'pending',
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    }));

    // console.log('Generated Ride Requests:', newRideRequests); 
    dispatch(setRideRequests(newRideRequests));
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        // console.log('Location permission denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      // console.log('Current Location:', currentLocation);
      dispatch(setDriverLocation(currentLocation.coords));

      generateNearbyRideRequests(currentLocation);
    })();
  }, []);

  if (!driverLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading current location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {driverLocation && (
          <Marker
            coordinate={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
            }}
            title="Driver's Location"
            pinColor="blue"
          />
        )}

        {rideRequests.map((ride) => (
          <Marker
            key={ride.id}
            coordinate={{
              latitude: ride.pickupLocation.latitude,
              longitude: ride.pickupLocation.longitude,
            }}
            title={`Ride request from ${ride.userId}`}
            description={`Destination: (${ride.destination.latitude}, ${ride.destination.longitude})`}
          />
        ))}
      </MapView>
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
