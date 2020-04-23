import React from 'react';
import { observer } from 'mobx-react';
import styled, { ThemeProvider } from 'styled-components/native';
import Theme from '../constants/Theme';
import { useStores } from '../utils/hooks';

const Base = observer(({ children }) => {
    const { notifications } = useStores();
    const { initLoader, initSnackbar } = notifications;

    const BaseView = styled.View`
        flex: 1;
    `;

    return (
        <ThemeProvider theme={Theme}>
            <BaseView>
                {children}
                {initLoader}
                {initSnackbar}
            </BaseView>
        </ThemeProvider>
    );
});

export default Base;
