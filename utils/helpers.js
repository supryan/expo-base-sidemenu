export const flatten = array => {
    return Object.keys(array).reduce((r, k) => {
        return r.concat(array[k]);
    }, []);
};
