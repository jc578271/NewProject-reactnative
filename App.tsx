/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// @ts-ignore
import React, {useEffect} from 'react';
import Router from './src/Router';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const persistor = persistStore(store);
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router />
      </PersistGate>
    </Provider>
  );
};
export default App;
