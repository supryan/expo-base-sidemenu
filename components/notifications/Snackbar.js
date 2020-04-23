import React, { useEffect, useCallback, useState } from 'react';
import { Animated, Easing } from 'react-native';
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
    width: 100%;
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

export const Snackbar = ({ tabsHeight = 0, overflow = true, delay = DELAY + 400, button = 'OK', message, route, onSnackBarHide }) => {
    const [height, setHeight] = useState(0);
    const [end] = useState(-TABBAR_MARGIN);
    const [start] = useState(Layout.headerHeight + Layout.statusBarHeight + (tabsHeight || 0));
    const [snackbar] = useState(new Animated.Value(0));
    const [offset] = useState(tabsHeight);
    let snackbarTimeout = null;

    const _handleButtonPress = async () => {
        NavigationService.navigate(route || 'Home');
    };

    const toggle = useCallback(() => {
        if (snackbarTimeout) {
            clearTimeout(snackbarTimeout);
        }

        Animated.timing(snackbar, {
            toValue: 1,
            delay: 400,
            easing: Easing.out(Easing.cubic),
            duration: 400,
            useNativeDriver: true
        }).start(() => {
            snackbarTimeout = setTimeout(() => {
                hide();
            }, delay);
        });
    }, []);

    const hide = useCallback(() => {
        Animated.timing(snackbar, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true
        }).start(() => {
            onSnackBarHide();
        });
    }, []);

    useEffect(() => {
        toggle();
    }, [toggle]);

    return (
        <SnackbarContainerView
            pointerEvents="box-none"
            style={{
                height: height + TABBAR_MARGIN + offset,
                bottom: offset,
                overflow
            }}>
            <AnimatedSnackbarView
                pointerEvents="box-none"
                onLayout={event => setHeight(event.nativeEvent.layout.height)}
                style={{
                    transform: [
                        {
                            translateY: snackbar.interpolate({
                                inputRange: [0, 1],
                                outputRange: [start, end]
                            })
                        }
                    ]
                }}>
                <SnackbarInnerView>
                    <SnackbarText align={button} numberOfLines={button ? 2 : 1} adjustsFontSizeToFit={true} minimumFontScale={0.7}>
                        {message ? message : ''}
                    </SnackbarText>
                    {button && (
                        <SnackbarButton
                            numberOfLines={1}
                            adjustsFontSizeToFit={true}
                            minimumFontScale={0.85}
                            onPress={() => {
                                hide();
                                _handleButtonPress();
                            }}>
                            {button}
                        </SnackbarButton>
                    )}
                </SnackbarInnerView>
            </AnimatedSnackbarView>
        </SnackbarContainerView>
    );
};

Snackbar.propTypes = {
    button: PropTypes.string,
    message: PropTypes.string.isRequired,
    route: PropTypes.string,
    delay: PropTypes.number,
    tabsHeight: PropTypes.number,
    onSnackBarHide: PropTypes.func.isRequired
};
