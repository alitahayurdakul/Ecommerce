import { createSelector } from 'reselect';

const domain = state => state;

export const selectOrderList = () => createSelector(
    domain,
    substate => substate.orderList
);

export const selectLanguage = () => createSelector(
    domain,
    substate => substate.language
);

export const selectTheme = () => createSelector(
    domain,
    substate => substate.theme
 );
 
export const selectUserId = () => createSelector(
    domain,
    substate => substate.userId
);