import React from 'react';
import { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { updateRideRequestStatus } from '../redux/actions';
import RideRequestDialog from './RideRequestDialog';

const RideRequestMarker = ({ ride }) => {
  const dispatch = useDispatch();

  const handleAcceptRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'accepted'));
  };

  const handleDeclineRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'declined'));
  };

  const handleMarkerPress = () => {
    RideRequestDialog({
      ride,
      onAccept: handleAcceptRide,
      onDecline: handleDeclineRide,
    });
  };

  const getPinColor = () => {
    switch (ride.status) {
      case 'accepted':
        return 'green';
      case 'declined':
        return 'red';
      default:
        return 'orange'; 
    }
  };

  return (
    <Marker
      coordinate={{
        latitude: ride.pickupLocation.latitude,
        longitude: ride.pickupLocation.longitude,
      }}
      title={`Ride request from ${ride.userId}`}
      description={`Destination: (${ride.destination.latitude}, ${ride.destination.longitude})`}
      pinColor={getPinColor()} 
      onPress={handleMarkerPress} 
    />
  );
};

export default RideRequestMarker;
