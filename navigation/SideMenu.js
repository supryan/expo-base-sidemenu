import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../constants/Layout';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import NavigationService from '../services/NavigationService';

const SideMenuItems = [
    {
        data: [
            {
                name: 'Home',
                route: 'Home'
            }
        ]
    }
];

// Go to route
const goTo = (route, params) => {
    NavigationService.navigate(route, params);
};

// Side Menu Item Component
const SideMenuItem = ({ name, route }) => {
    const SideMenuItemView = styled.View`
        flex: 1;
        padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.s}px;
    `;

    return (
        name && (
            <SideMenuItemView>
                <Text onPress={() => goTo(route)}>{name}</Text>
            </SideMenuItemView>
        )
    );
};

const SideMenu = () => {
    const SideMenuView = styled.SafeAreaView`
        flex: 1;
        padding: ${Layout.headerHeight}px 0;
    `;

    const SideMenuSectionList = styled.SectionList`
        flex: 1;
    `;

    return (
        <SideMenuView>
            <View>
                <Text>This is my fixed header</Text>
            </View>
            <SideMenuSectionList
                sections={SideMenuItems}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <SideMenuItem {...item} />}
                renderSectionHeader={({ section: { title } }) => <Text>{title || ''}</Text>}
            />
            <View>
                <Text>This is my fixed footer</Text>
            </View>
        </SideMenuView>
    );
};

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;
