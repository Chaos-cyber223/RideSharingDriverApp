import { configureStore } from '@reduxjs/toolkit';
import { rideReducer } from './reducers/rideReducer';

const store = configureStore({
  reducer: {
    ride: rideReducer,
  },
});

export default store;
