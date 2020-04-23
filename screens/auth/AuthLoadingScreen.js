import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const AuthLoadingScreenView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const authState = true;
        this.props.navigation.navigate(authState ? 'Main' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <AuthLoadingScreenView>
                <ActivityIndicator />
                <StatusBar barStyle="light-content" />
            </AuthLoadingScreenView>
        );
    }
}
