import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { setDriverLocation, setRideRequests } from '../redux/actions';
import RideRequestMarker from './RideRequestMarker';
import driverIcon from '../assets/driverIcon.png';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const driverLocation = useSelector((state) => state.ride.driverLocation);
  const rideRequests = useSelector((state) => state.ride.rideRequests);
  const driverId = useSelector((state) => state.ride.driverId);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const generateNearbyRideRequests = (currentLocation) => {
    const { latitude, longitude } = currentLocation.coords;
  
    const newRideRequests = Array.from({ length: 4 }, (_, i) => ({
      id: `${i + 1}`,
      userId: `user${i + 1}`,
      driverId: null,
      pickupLocation: {
        latitude: latitude + (Math.random() * 0.05 - 0.025), 
        longitude: longitude + (Math.random() * 0.05 - 0.025), 
      },
      destination: {
        latitude: latitude + (Math.random() * 0.1 - 0.05), 
        longitude: longitude + (Math.random() * 0.1 - 0.05), 
      },
      status: 'pending',
      pickupTime: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    }));
  
    if (newRideRequests.length > 0) {
      dispatch(setRideRequests(newRideRequests));
    } else {
      setErrorMsg('No nearby ride requests found.');
    }
  };
  

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        dispatch(setDriverLocation(currentLocation.coords));

        generateNearbyRideRequests(currentLocation);
        setLoading(false);
      } catch (error) {
        setErrorMsg('Error fetching location. Please try again.');
        setLoading(false);
      }
    })();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
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
          >
            <Image 
              source={driverIcon}
              style={{ width: 40, height: 40 }} 
            />
          </Marker>
        )}

        {rideRequests.length > 0 ? (
          rideRequests.map((ride) => (
            <RideRequestMarker key={ride.id} ride={ride} driverId={driverId} />
          ))
        ) : (
          <Text style={styles.noRequestsText}>No nearby ride requests available</Text>
        )}
      </MapView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  noRequestsText: {
    fontSize: 16,
    color: 'gray',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default HomeScreen;
