import React from 'react';
import { storesContext } from '../stores/StoreContext';
import { useEffect, useRef } from 'react';

export const usePrevious = value => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export const useStores = () => React.useContext(storesContext);
