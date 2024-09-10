import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import HomeScreen from './components/HomeScreen'; 

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
