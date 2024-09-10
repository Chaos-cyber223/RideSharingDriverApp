import { Alert } from 'react-native';

const RideRequestDialog = ({ ride, onAccept, onDecline }) => {
  Alert.alert(
    `Ride request from ${ride.userId}`,
    `Pickup Location: (${ride.pickupLocation.latitude}, ${ride.pickupLocation.longitude})\nDestination: (${ride.destination.latitude}, ${ride.destination.longitude})\nPickup Time: ${new Date(ride.pickupTime).toLocaleString()}\n\nUser ID: ${ride.userId}`,
    [
      { text: 'Decline', onPress: onDecline, style: 'destructive' },
      { text: 'Accept', onPress: onAccept },
      { text: 'Cancel', style: 'cancel' },
    ]
  );
};

export default RideRequestDialog;
