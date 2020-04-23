import React from 'react';
import styled from 'styled-components/native';
import Button from 'react-native-button';
import { Assets } from '../constants/Assets';

const HeaderContainer = styled.View`
    flex: 1;
    align-items: center;
    padding-bottom: ${({ theme }) => theme.spacing.s}px;
    position: relative;
    z-index: 1;
`;

const HeaderLogoButton = styled(Button).attrs(() => ({
    containerStyle: {
        width: 60,
        height: 60
    }
}))`
    overflow: visible;
`;

const HeaderLogoImage = styled.Image`
    width: 100%;
    height: 100%;
`;

export const Header = ({ navigation }) => {
    return (
        <HeaderContainer>
            <HeaderLogoButton onPress={() => navigation.navigate('Home')}>
                <HeaderLogoImage source={Assets.elements.logo} />
            </HeaderLogoButton>
        </HeaderContainer>
    );
};
