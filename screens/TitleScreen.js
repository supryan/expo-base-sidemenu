import React from 'react';
import { Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { Assets } from '../constants/Assets';

const TitleScreenView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const TitleScreen = () => {
    return (
        <TitleScreenView>
            <Image style={{ width: 100, height: 100, marginBottom: 20 }} source={Assets.elements.logo} />
            <Text>Title</Text>
        </TitleScreenView>
    );
};
