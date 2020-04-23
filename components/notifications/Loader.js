import React, { useState, useEffect, useCallback } from 'react';
import { Animated, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { PropTypes } from 'prop-types';

const LoaderView = styled.View`
    align-items: center;
    background-color: ${props => (props.overlay !== false ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)')};
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 99999;
`;

const LoaderViewBox = styled.View`
    background-color: ${({ theme }) => theme.colors.base};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.sm}px;
`;

const LoaderIndicator = styled(ActivityIndicator).attrs(props => ({
    color: props.theme.colors.primary
}))``;

const AnimatedLoaderView = Animated.createAnimatedComponent(LoaderView);

export const Loader = ({ loading, overlay }) => {
    const [animation] = useState(new Animated.Value(0));

    const playAnimation = useCallback(reverse => {
        Animated.timing(animation, {
            toValue: reverse ? 0 : 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, []);

    useEffect(() => {
        playAnimation(!loading);
    }, [loading]);

    return (
        <AnimatedLoaderView style={{ opacity: animation }} overlay={overlay} pointerEvents={loading ? 'auto' : 'none'}>
            <LoaderViewBox>
                <LoaderIndicator size="large" />
            </LoaderViewBox>
        </AnimatedLoaderView>
    );
};

Loader.propTypes = {
    loading: PropTypes.bool.isRequired,
    overlay: PropTypes.bool
};
