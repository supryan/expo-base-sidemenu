import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import Layout from '../constants/Layout';
import SideMenu from './SideMenu';
import { HomeScreen } from '../screens/HomeScreen';

const drawerType = Layout.window.width >= 768 ? 'permanent' : Platform.OS === 'ios' ? 'slide' : 'front';

const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        }
    },
    {
        contentComponent: SideMenu,
        drawerWidth: Layout.window.width * 0.75,
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        drawerType
    }
);

export default createAppContainer(AppDrawerNavigator);
