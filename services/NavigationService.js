import { NavigationActions, StackActions, DrawerActions } from 'react-navigation';

let _navigator;

const setTopLevelNavigator = navigatorRef => {
    _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
};

const replace = (routeName, params) => {
    _navigator.dispatch(
        StackActions.replace({
            routeName,
            params
        })
    );
};

const goBack = () => {
    _navigator.dispatch(NavigationActions.back());
};

const getCurrentRoute = navState => {
    const navigationState = navState || _navigator.state.nav;
    const route = navigationState ? navigationState.routes[navigationState.index] : null;
    return route.routes ? getCurrentRoute(route) : route.routeName;
};

const toggleDrawer = () => {
    _navigator.dispatch(DrawerActions.toggleDrawer());
};

const closeDrawer = () => {
    _navigator.dispatch(DrawerActions.closeDrawer());
};

export default {
    navigate,
    goBack,
    replace,
    setTopLevelNavigator,
    getCurrentRoute,
    toggleDrawer,
    closeDrawer
};
