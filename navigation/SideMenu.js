import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../constants/Layout';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import NavigationService from '../services/NavigationService'

const SideMenuItems = [
  {
    data: [
      {
        name: 'Page 1',
        icon: 'icon1',
        route: 'Page1'
      }
    ]
  },
  {
    title: 'Metadata',
    data: [
      {
        name: 'Page 2',
        icon: 'icon2',
        route: 'Page2'
      },
      {
        name: 'Page 3',
        icon: 'icon3',
        route: 'Page3'
      }
    ]
  }
];

// Go to route
const goTo = (route, params) => {
  NavigationService.navigate(route, params);
};

// Side Menu Item Component
const SideMenuItem = ({ name, icon, route }) => {
  const SideMenuItemView = styled.View`
    flex: 1;
    padding: ${({theme}) => theme.spacing.sm}px ${({theme}) => theme.spacing.s}px;
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
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
