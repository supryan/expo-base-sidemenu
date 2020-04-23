import { flatten } from '../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

// Media
export const Assets = {};

// Fonts
export const Fonts = {
    ...Ionicons.font,
    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf')
};

// Primarily used on app initialization for gathering assets and caching
// Most likely does not need to be touched
// See App.js _loadResourcesAsync()
export const getCachedAssets = async () => {
    const promises = Object.keys(Assets)
        .map(keys => flatten(Assets[keys]))
        .flat();
    return promises;
};
