import * as constants from './constants';


const initialState = {
    userId: null,
    orderList: [],
    language: "tr",
    theme: true
}

export default function store(state = initialState, action){
    const actions = action;

    switch(actions.type){

        case constants.SET_USER_ID: {
            return {
                ...state,
                userId: action.payload
            }
        }

        case constants.SET_LANGUAGE: {
            return{
                ...state,
                language: action.payload
            }
        }

        case constants.SET_THEME: {
            return{
                ...state,
                theme: action.payload
            }
        }

        case constants.ADD_ORDER_TO_LIST:{
            const productIndex = state.orderList.map((item) => item.order.id).indexOf(action.payload.id);
            const order = action.payload;
            if(productIndex === -1){
                return {
                    ...state,
                    orderList: [...state.orderList, { order, count: 1}]
                }
            }
            else {
                const copyList = state.orderList.slice();
                copyList[productIndex].count +=1;
                return{
                    ...state,
                    orderList:copyList
                }
            }
        }

        case constants.RESET_LIST: {
            return {
                ...state,
                orderList: action.payload
            }
        }

        case constants.REMOVE_ORDER_FROM_LIST: {
            const newOrderList = state.orderList.filter(item => item.order.id !== action.payload);

            return {
                ...state,
                orderList: newOrderList
            }
        };

        case constants.INCREASE_ORDER_COUNT: {
            const productIndex = state.orderList.map((item) => item.order.id).indexOf(action.payload);
            const copyOrderList = state.orderList.slice();
            copyOrderList[productIndex].count +=1;
           
            return {
                ...state,
                orderList: copyOrderList
            }
        }

        case constants.DECREASE_ORDER_COUNT: {
            const productIndex = state.orderList.map((item) => item.order.id).indexOf(action.payload);
            const copyOrderList = state.orderList.slice();
            copyOrderList[productIndex].count -=1;

            return {
                ...state,
                orderList: copyOrderList
            }
        }

        default:
            return state;
    }

}