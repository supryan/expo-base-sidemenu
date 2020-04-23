import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Layout from '../constants/Layout';

import SideMenu from './SideMenu';

import { HomeScreen } from '../screens/HomeScreen';

const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        }
    },
    {
        contentComponent: SideMenu,
        drawerWidth: Layout.window.width - 100
    }
);

export default createAppContainer(AppDrawerNavigator);
