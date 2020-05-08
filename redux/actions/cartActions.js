import { ADD_TO_CART, REMOVE_FROM_CART } from '../types.js';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product
    }
};

export const removeFromCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        productId: productId
    }
};