import React, { useState } from 'react';
import { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { updateRideRequestStatus } from '../redux/actions';
import RideRequestDialog from './RideRequestDialog';

const RideRequestMarker = ({ ride }) => {
  const dispatch = useDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const handleAcceptRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'accepted', ride.driverId));
    hideDialog();
  };

  const handleStartRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'started', ride.driverId));
    hideDialog();
  };

  const handleDeclineRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'declined', ride.driverId));
    hideDialog();
  };

  const handlePickUpRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'picked-up', ride.driverId));
    hideDialog();
  };

  const handleDropOffRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'dropped-off', ride.driverId));
    hideDialog();
  };

  const getPinColor = () => {
    switch (ride.status) {
      case 'accepted':
        return 'green';
      case 'declined':
        return 'red';
      case 'picked-up':
        return 'yellow';
      case 'dropped-off':
        return 'blue';
      default:
        return 'orange';
    }
  };

  return (
    <>
      <Marker
        coordinate={{
          latitude: ride.pickupLocation.latitude,
          longitude: ride.pickupLocation.longitude,
        }}
        title={`Ride request from ${ride.userId}`}
        description={`Destination: (${ride.destination.latitude}, ${ride.destination.longitude})`}
        pinColor={getPinColor()}
        onPress={showDialog}
      />

      <RideRequestDialog
        visible={dialogVisible}
        hideDialog={hideDialog}
        ride={ride}
        onAccept={handleAcceptRide}
        onDecline={handleDeclineRide}
        onStart={handleStartRide}
        onPickUp={handlePickUpRide}
        onDropOff={handleDropOffRide}
      />
    </>
  );
};

export default RideRequestMarker;
