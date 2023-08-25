import { createSelector } from 'reselect';

export const searchSelector = (state) => state.group.search;

export const groupSelector = (state) => {
    return state.group.group;
};

export const groupRemainingSelector = createSelector(groupSelector, searchSelector, (groups, search) => {
    return groups.filter((group) => {
        return group.name.toLowerCase().includes(search);
    });
});
