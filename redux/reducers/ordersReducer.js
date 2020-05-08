import { SET_ORDERS, ADD_ORDER } from '../types.js';

import Order from '../../models/orderModel.js';

const initialState = {
    orders: []
};

const ordersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ORDERS:
            return {
                orders: action.orders
            }
        case ADD_ORDER:
            const newOrder = new Order(
                action.id,
                action.cartItems,
                action.totalAmount,
                action.date
            );
            
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
        default:
            return state
    }
};

export default ordersReducer;