/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// @ts-ignore
import React from 'react';
import Router from './src/Router';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


const App = () => {
  return (
      <Provider store={store}>
        <Router />
      </Provider>
  )
};
export default App;
