import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native'; // 引入 Image 组件
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { setDriverLocation, setRideRequests } from '../redux/actions';
import RideRequestMarker from './RideRequestMarker';
import driverIcon from '../assets/driverIcon.png';  // 引入司机的图标

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
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
            {/* 在 Marker 内部使用 Image 显示自定义图标 */}
            <Image 
              source={driverIcon}
              style={{ width: 40, height: 40 }} // 设置图标的大小
            />
          </Marker>
        )}

        {rideRequests.map((ride) => (
          <RideRequestMarker key={ride.id} ride={ride} driverId={driverId} />
        ))}
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
});

export default HomeScreen;
