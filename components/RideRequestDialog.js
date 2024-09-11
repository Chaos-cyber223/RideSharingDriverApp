import React from 'react';
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

const RideRequestDialog = ({ visible, hideDialog, ride, driverId, onAccept, onDecline, onStart, onPickUp, onDropOff }) => {

  const getDialogActions = () => {
    switch (ride.status) {
      case 'pending':
        return (
          <>
            <Button onPress={onAccept}>Accept</Button>
            <Button onPress={onDecline}>Decline</Button>
          </>
        );
      case 'accepted':
        return (
          <Button onPress={onStart}>Start Ride</Button>
        );
      case 'started':
        return (
          <Button onPress={onPickUp}>Pick Up</Button>
        );
      case 'picked-up':
        return (
          <Button onPress={onDropOff}>Drop Off</Button>
        );
      default:
        return null;
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{`Ride Request from ${ride.userId}`}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            <Text style={styles.label}>Pickup Location:</Text> {ride.pickupLocation.latitude}, {ride.pickupLocation.longitude}
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Destination:</Text> {ride.destination.latitude}, {ride.destination.longitude}
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Current Status:</Text> {ride.status}
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Driver ID:</Text> 
            {ride.status === 'pending' ? 'Not Assigned Yet' : driverId} 
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {getDialogActions()}
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default RideRequestDialog;
