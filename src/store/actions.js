import * as constants from './constants';

export const setUserId = userId => ({
    type: constants.SET_USER_ID,
    payload: userId,
});

export const setLanguage = language => ({
    type: constants.SET_LANGUAGE,
    payload: language
});

export const setTheme = theme => ({
    type: constants.SET_THEME,
    payload: theme
});

export const resetOrderList = order => ({
    type: constants.RESET_LIST,
    payload: order
});

export const addOrderToList = order => ({
    type: constants.ADD_ORDER_TO_LIST,
    payload: order
});

export const removeOrderFromList = orderId => ({
    type: constants.REMOVE_ORDER_FROM_LIST,
    payload: orderId
});

export const increaseOrderCount = orderId => ({
    type: constants.INCREASE_ORDER_COUNT,
    payload: orderId
});

export const decreaseOrderCount = orderId => ({
    type: constants.DECREASE_ORDER_COUNT,
    payload: orderId
});