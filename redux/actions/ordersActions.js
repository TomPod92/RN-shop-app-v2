import { SET_ORDERS, ADD_ORDER, SET_PRODUCTS } from '../types.js';
import Order from '../../models/orderModel.js';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(`https://rn-shop-app-33720.firebaseio.com/orders/${userId}.json`);

            if(!response.ok) {
                throw new Error('Something went wrong :(')
            }

            const responseData = await response.json();

            const loadedOrders = [];
            for(const key in responseData) {
                loadedOrders.push(
                    new Order(
                        key,
                        responseData[key].cartItems,
                        responseData[key].totalAmount,
                        new Date(responseData[key].date)
                    )
                )
            };

            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            })
        } catch(error) {
            // powinno się zrobić więcej
            throw error
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const date = new Date();
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(`https://rn-shop-app-33720.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if(!response.ok) {
            throw new Error('Something went wrong :(')
        }

        const responseData = await response.json();

        dispatch({
            type: ADD_ORDER,
            id: responseData.name,
            cartItems,
            totalAmount,
            date: date
        })
    }
}