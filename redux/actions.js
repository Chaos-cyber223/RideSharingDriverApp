

// action to set driver's location
export const setDriverLocation = (location) => ({
    type: 'SET_DRIVER_LOCATION',
    payload: location,
  });
  
  // actions to set ride requests
  export const setRideRequests = (rideRequests) => ({
    type: 'SET_RIDE_REQUESTS',
    payload: rideRequests,
  });
  
  // actions to update ride requests
  export const updateRideRequestStatus = (rideId, status) => ({
    type: 'UPDATE_RIDE_REQUEST_STATUS',
    payload: { rideId, status },
  });


  