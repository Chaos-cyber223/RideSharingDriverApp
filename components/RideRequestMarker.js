import React, { useState } from 'react';
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux'; // 从 Redux 中获取 driverId
import { updateRideRequestStatus } from '../redux/actions';
import RideRequestDialog from './RideRequestDialog';

const RideRequestMarker = ({ ride }) => {
  const dispatch = useDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);
  const driverId = useSelector((state) => state.ride.driverId); // 从 Redux 中获取 driverId

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const handleAcceptRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'accepted', driverId)); // 使用 Redux 中的 driverId
    hideDialog();
  };

  const handleStartRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'started', driverId));
    hideDialog();
  };

  const handlePickUpRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'picked-up', driverId));
    hideDialog();
  };

  const handleDropOffRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'dropped-off', driverId));
    hideDialog();
  };

  const handleDeclineRide = () => {
    dispatch(updateRideRequestStatus(ride.id, 'declined', driverId));
    hideDialog();
  };

  const getPinColor = () => {
    switch (ride.status) {
      case 'accepted':
        return 'green';
      case 'started':
        return 'blue';
      case 'picked-up':
        return 'yellow';
      case 'dropped-off':
        return 'purple';
      case 'declined':
        return 'red';
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
        driverId={driverId} // 传递 Redux 中的 driverId
        onAccept={handleAcceptRide}
        onStart={handleStartRide}
        onPickUp={handlePickUpRide}
        onDropOff={handleDropOffRide}
        onDecline={handleDeclineRide}
      />
    </>
  );
};

export default RideRequestMarker;
