import React from 'react';
import { inject, observer } from 'mobx-react/native';
import styled, { ThemeProvider } from 'styled-components/native';
import Theme from '../constants/Theme';

const Base = inject('notifications')(
  observer(({ notifications, children }) => {
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
  })
);

export default Base;
