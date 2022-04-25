import { registerRootComponent } from 'expo';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native-web';
import HorizontalScrollView from './components/HorizontalScrollView';
import CameraPage from './components/CameraPage';

import App from './App';

AppRegistry.registerComponent(HorizontalScrollView);
AppRegistry.registerComponent(CameraPage)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
