import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, DeviceEventEmitter, AppState } from 'react-native';
import { Provider as MobXProvider } from 'mobx-react/native';
import { Ionicons } from '@expo/vector-icons';

// Main Components
import Base from './components/Base';
import AppNavigator from './navigation/AppNavigator';

// Services
import NavigationService from './services/NavigationService';

// Stores
import NotifcationStore from './stores/NotificationStore';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    _loadListeners();

    return () => _removeListeners();
  }, []);

  const _loadListeners = () => {
    AppState.addEventListener('change', _handleAppStateChange);
  };

  const _removeListeners = () => {
    AppState.removeEventListener('change', _handleAppStateChange);
  };

  const _handleAppStateChange = async (nextAppState) => {
    DeviceEventEmitter.emit('app:state', nextAppState);
  };

  // Emit route change events to all children components in context
  const _handleStateChanges = (prevState, currentState) => {
    const getActiveRouteName = (navigationState) => {
      const route = navigationState ? navigationState.routes[navigationState.index] : null;
      return route.routes ? getActiveRouteName(route) : route.routeName;
    };

    const current = getActiveRouteName(currentState);
    const prev = getActiveRouteName(prevState);
    if (prev !== current && current !== 'Title') {
      DeviceEventEmitter.emit('route:change', { current, prev });
    }
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <AppLoading startAsync={loadResourcesAsync} onError={handleLoadingError} onFinish={() => handleFinishLoading(setLoadingComplete)} />;
  } else {
    return (
      <MobXProvider notifications={NotifcationStore}>
        <Base>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          <AppNavigator
            onNavigationStateChange={_handleStateChanges}
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Base>
      </MobXProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
