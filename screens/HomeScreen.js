import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'expo';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';
import { useStores } from '../utils/hooks';

const HomeContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white};
`;

const HomeScrollView = styled.ScrollView.attrs(({ theme }) => ({
    contentContainerStyle: {
        paddingTop: theme.spacing.l
    }
}))`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white};
`;

const HomeWelcomeText = styled.Text`
    ${({ theme }) => theme.typography.title};
`;

const HomeBodyTitle = styled.Text`
    ${({ theme }) => theme.typography.titleSmall};
    text-align: center;
`;

const HomeBodyText = styled.Text`
    ${({ theme }) => theme.typography.body};
    text-align: center;
`;

const HomeSectionContainer = styled.View`
    align-items: center;
    padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
    margin-bottom: ${({ theme }) => theme.spacing.m}px;
`;

const HomeLinkText = styled.Text`
    ${({ theme }) => theme.typography.body};
    color: blue;
`;

export const HomeScreen = observer(() => {
    const { notifications } = useStores();

    return (
        <HomeContainer>
            <HomeScrollView centerContent={true}>
                <HomeSectionContainer>
                    <HomeWelcomeText>Welcome!</HomeWelcomeText>
                </HomeSectionContainer>

                <HomeSectionContainer>
                    <HomeBodyText>Drag right to open the drawer. Use the links below to test the notification system.</HomeBodyText>
                </HomeSectionContainer>

                <HomeSectionContainer>
                    <HomeBodyTitle>Snackbar</HomeBodyTitle>
                    <TouchableOpacity
                        onPress={() =>
                            notifications.showSnackbar({
                                text: 'Awesome Snackbar!',
                                offset: 30
                            })
                        }>
                        <HomeLinkText>Test Snackbar!</HomeLinkText>
                    </TouchableOpacity>
                </HomeSectionContainer>

                <HomeSectionContainer>
                    <HomeBodyTitle>Loader</HomeBodyTitle>
                    <TouchableOpacity onPress={() => notifications.showLoader()}>
                        <HomeLinkText>Test Loader!</HomeLinkText>
                    </TouchableOpacity>
                </HomeSectionContainer>

                <HomeSectionContainer>
                    <HomeBodyText>Thanks for using this base! See more of my stuff at:</HomeBodyText>
                </HomeSectionContainer>

                <HomeSectionContainer>
                    <TouchableOpacity onPress={() => Linking.openURL('https://supryan.com')}>
                        <HomeLinkText>supryan.com</HomeLinkText>
                    </TouchableOpacity>
                </HomeSectionContainer>
            </HomeScrollView>
        </HomeContainer>
    );
});
