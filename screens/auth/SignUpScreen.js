import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const SignUpScreenView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const SignUpScreen = () => {
    return (
        <SignUpScreenView>
            <Text>Sign Up</Text>
        </SignUpScreenView>
    );
};
