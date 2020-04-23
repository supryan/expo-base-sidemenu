import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';
import { useStores } from '../../utils/hooks';

const AuthLoadingScreenView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const AuthLoadingScreen = observer(({ navigation }) => {
    const { user } = useStores();

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const _bootstrapAsync = async () => {
            await user.init();
            const authState = user.isAuthenticated;
            navigation.navigate(authState ? 'Main' : 'Auth');
        };

        _bootstrapAsync();
    }, []);

    // Render any loading content that you like here
    return (
        <AuthLoadingScreenView>
            <ActivityIndicator />
            <StatusBar barStyle="light-content" />
        </AuthLoadingScreenView>
    );
});

export default AuthLoadingScreen;
