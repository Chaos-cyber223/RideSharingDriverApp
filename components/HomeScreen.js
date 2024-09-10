import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { setDriverLocation, setRideRequests } from '../redux/actions';
import { selectDriverLocation, selectRideRequests } from '../redux/selectors';
import RideRequestMarker from './RideRequestMarker'; 

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

    dispatch(setRideRequests(newRideRequests));
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
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
          <RideRequestMarker key={ride.id} ride={ride} />
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
