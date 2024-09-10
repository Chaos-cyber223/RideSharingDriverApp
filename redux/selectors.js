// get driver's location
export const selectDriverLocation = (state) => state.ride.driverLocation;

// get the list of ride requests
export const selectRideRequests = (state) => state.ride.rideRequests;

// get the status of rdie requests
export const selectRideRequestStatus = (state, rideId) => {
  const ride = state.ride.rideRequests.find((r) => r.id === rideId);
  return ride ? ride.status : 'pending';
};
