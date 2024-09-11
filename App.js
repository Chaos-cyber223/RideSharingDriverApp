import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './redux/store';  
import HomeScreen from './components/HomeScreen';  

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <HomeScreen />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;

