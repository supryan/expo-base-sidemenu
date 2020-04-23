import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { useStores } from '../utils/hooks';

const Base = observer(() => {
    const { notifications } = useStores();
    const { initLoader, initSnackbar } = notifications;

    const BaseView = styled.View`
        position: absolute;
        z-index: 999999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    `;

    return (
        <BaseView pointerEvents="box-none">
            {initLoader}
            {initSnackbar}
        </BaseView>
    );
});

export default Base;
