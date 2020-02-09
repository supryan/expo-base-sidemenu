import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Layout from '../constants/Layout'

import SideMenu from './SideMenu';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Page1: {
      screen: HomeScreen
    },
    Page2: {
      screen: LinksScreen
    },
    Page3: {
      screen: SettingsScreen
    }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Layout.window.width - 100
  }
);

export default createAppContainer(AppDrawerNavigator);
