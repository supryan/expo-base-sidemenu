import React from 'react';
import { NotificationStore } from './NotificationStore';

export const storesContext = React.createContext({
    notifications: new NotificationStore()
});
