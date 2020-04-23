import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, DeviceEventEmitter, AppState } from 'react-native';
import { getCachedAssets, Fonts } from './constants/Assets';

// https://github.com/mobxjs/mobx-react-lite#observer-batching
import 'mobx-react-lite/batchingForReactNative';

// Main Components
import Base from './components/Base';
import AppNavigator from './navigation/AppNavigator';

// Services
import NavigationService from './services/NavigationService';

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

    const _handleAppStateChange = async nextAppState => {
        DeviceEventEmitter.emit('app:state', nextAppState);
    };

    // Emit route change events to all children components in context
    const _handleStateChanges = (prevState, currentState) => {
        const getActiveRouteName = navigationState => {
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
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <Base>
                {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
                <AppNavigator
                    onNavigationStateChange={_handleStateChanges}
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Base>
        );
    }
}

async function loadResourcesAsync() {
    const assets = await getCachedAssets();
    await Promise.all([Asset.loadAsync(assets), Font.loadAsync(Fonts)]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}
