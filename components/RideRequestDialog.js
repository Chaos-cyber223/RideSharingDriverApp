import React from 'react';
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';  

const RideRequestDialog = ({ visible, hideDialog, ride, onAccept, onDecline, onStart, onPickUp, onDropOff }) => {

  const getDialogActions = () => {
    switch (ride.status) {
      case 'pending':
        return (
          <>
            <Button onPress={onAccept} style={styles.button}>Accept</Button>
            <Button onPress={onDecline} style={styles.button}>Decline</Button>
          </>
        );
      case 'accepted':
        return (
          <Button onPress={onStart} style={styles.button}>Start Ride</Button>
        );
      case 'started':
        return (
          <Button onPress={onPickUp} style={styles.button}>Pick Up</Button>
        );
      case 'picked-up':
        return (
          <Button onPress={onDropOff} style={styles.button}>Drop Off</Button>
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
        </Dialog.Content>
        <Dialog.Actions>
          {getDialogActions()}
          <Button onPress={hideDialog} style={styles.button}>Close</Button>
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
  button: {
    marginHorizontal: 5,
  },
});

export default RideRequestDialog;
