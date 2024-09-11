const initialState = {
  driverLocation: null,
  driverId: 'driver123', 
  rideRequests: [],
};

export const rideReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DRIVER_LOCATION':
      return {
        ...state,
        driverLocation: action.payload,
      };
    case 'SET_RIDE_REQUESTS':
      return {
        ...state,
        rideRequests: action.payload,
      };
    case 'UPDATE_RIDE_REQUEST_STATUS':
      return {
        ...state,
        rideRequests: state.rideRequests.map((ride) =>
          ride.id === action.payload.rideId
            ? { 
                ...ride, 
                status: action.payload.status, 
                driverId: action.payload.driverId 
              }
            : ride
        ),
      };
    default:
      return state;
  }
};
