import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const LoginScreenView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const LoginScreen = () => {
    return (
        <LoginScreenView>
            <Text>Login</Text>
        </LoginScreenView>
    );
};
