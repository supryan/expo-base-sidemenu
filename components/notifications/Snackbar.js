import React from 'react';
import { Animated, Easing, DeviceEventEmitter } from 'react-native';
import styled from 'styled-components/native';
import Layout from '../../constants/Layout';
import Button from 'react-native-button';
import NavigationService from '../../services/NavigationService';
import { PropTypes } from 'prop-types';

const DELAY = 5000;
const TABBAR_MARGIN = 10;

const SnackbarContainerView = styled.View`
  position: absolute;
  overflow: hidden;
  width: 100%;
  z-index: 99999;
`;

const SnackbarView = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.variables.boxShadow};
  position: absolute;
  flex-direction: row;
  bottom: 0;
  margin-left: ${({ theme }) => theme.spacing.s}px;
  margin-right: ${({ theme }) => theme.spacing.s}px;
  width: ${({ theme }) => Layout.window.width - theme.spacing.s * 2};
  z-index: 99999;
`;

const SnackbarInnerView = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const SnackbarText = styled.Text`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 18px;
  padding-vertical: ${({ theme }) => theme.spacing.bumper}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  text-align: ${props => (props.align ? 'left' : 'center')};
  flex-shrink: 1;
`;

const SnackbarButton = styled(Button).attrs(props => ({
  containerStyle: {
    display: 'flex',
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: props.theme.spacing.s,
    paddingVertical: props.theme.spacing.bumper,
    flexGrow: 1,
    flexBasis: 75
  }
}))`
  ${({ theme }) => theme.typography.button};
  color: ${({ theme }) => theme.colors.contrast};
  letter-spacing: 1.2px;
  text-align: center;
  margin: auto;
`;

const AnimatedSnackbarView = Animated.createAnimatedComponent(SnackbarView);

export class Snackbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      end: -TABBAR_MARGIN,
      start: Layout.headerHeight + Layout.statusBarHeight + (props.tabsHeight || 0),
      overflow: props.overflow ? 'hidden' : 'visible',
      tabsHeight: (props.tabsHeight || 0),
      snackbar: new Animated.Value(0),
      offset: (props.tabsHeight || 0),
    };
  }

  componentDidMount() {
    this.toggle();
  }

  _handleButtonPress = async () => {
    const { route, params } = this.props;
    NavigationService.navigate(route || 'Home', params);
  };

  toggle = () => {
    Animated.timing(this.state.snackbar, {
      toValue: 1,
      delay: 400,
      easing: Easing.out(Easing.cubic),
      duration: 400,
      useNativeDriver: true
    }).start(() => {
      this.snackbarTimeout = setTimeout(
        () => {
          clearTimeout(this.snackbarTimeout);
          this.hide();
        },
        this.props.delay ? this.props.delay : DELAY + 400
      );
    });
  };

  hide() {
    Animated.timing(this.state.snackbar, {
      toValue: 0,
      duration: 400,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true
    }).start();
  }

  render() {
    return (
      <SnackbarContainerView
        pointerEvents="box-none"
        style={{
          height: this.state.height + TABBAR_MARGIN + this.state.offset,
          bottom: this.state.offset,
          overflow: this.state.overflow
        }}>
        <AnimatedSnackbarView
          pointerEvents="box-none"
          onLayout={event =>
            this.setState({ height: event.nativeEvent.layout.height })
          }
          style={{
            transform: [
              {
                translateY: this.state.snackbar.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.start, this.state.end]
                })
              }
            ]
          }}>
          <SnackbarInnerView>
            <SnackbarText
              align={this.props.button}
              numberOfLines={this.props.button ? 2 : 1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.7}>
              {this.props.message ? this.props.message : ''}
            </SnackbarText>
            {this.props.button && (
              <SnackbarButton
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.85}
                onPress={() => {
                  this.hide();
                  this._handleButtonPress();
                }}>
                {this.props.button ? this.props.button : 'OK'}
              </SnackbarButton>
            )}
          </SnackbarInnerView>
        </AnimatedSnackbarView>
      </SnackbarContainerView>
    );
  }
}

Snackbar.propTypes = {
  button: PropTypes.string,
  message: PropTypes.string.isRequired,
  autoHide: PropTypes.bool,
  route: PropTypes.string,
  delay: PropTypes.number,
  tabsHeight: PropTypes.number,
  onButtonPress: PropTypes.func
};
