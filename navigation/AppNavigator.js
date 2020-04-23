import { createDrawerNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import Layout from '../constants/Layout';
import SideMenu from './SideMenu';
import { Header } from './Header';
import { HomeScreen } from '../screens/HomeScreen';
import { TitleScreen } from '../screens/TitleScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';

const AuthStack = createStackNavigator(
    {
        Title: {
            screen: TitleScreen
        },
        Login: {
            screen: LoginScreen
        },
        SignUp: {
            screen: SignUpScreen
        }
    },
    {
        initialRouteName: 'Title',
        defaultNavigationOptions: {
            header: null
        }
    }
);

const AppStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        }
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => ({
            title: navigation.state.routeName || 'My App',
            headerTitle: Header
        })
    }
);

const DrawerStack = createDrawerNavigator(
    {
        Main: {
            screen: AppStack
        }
    },
    {
        initialRouteName: 'Main',
        contentComponent: SideMenu,
        drawerWidth: Layout.window.width * 0.75,
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        drawerType: Layout.window.width >= 768 ? 'permanent' : Platform.OS === 'ios' ? 'slide' : 'front'
    }
);

const MainNavigation = createSwitchNavigator(
    {
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: {
            screen: AuthLoadingScreen,
            path: ''
        },
        Auth: {
            screen: AuthStack,
            path: ''
        },
        Main: {
            screen: DrawerStack,
            path: ''
        }
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default createAppContainer(MainNavigation);
