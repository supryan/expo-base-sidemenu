import { NavigationActions } from 'react-navigation';
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

const goBack = () => {
  _navigator.dispatch(NavigationActions.back());
};

const getCurrentRoute = navState => {
  const navigationState = navState || _navigator.state.nav;
  const route = navigationState
    ? navigationState.routes[navigationState.index]
    : null;
  return route.routes ? getCurrentRoute(route) : route.routeName;
};

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  getCurrentRoute
};
