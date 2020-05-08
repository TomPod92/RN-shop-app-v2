import PRODUCTS from '../../data/dummy-data.js';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../types.js';

import Product from '../../models/productModel.js';

const initialState = {
    availableProducts: [],
    userProducts: []
};

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case CREATE_PRODUCT:
            // const { title, description, imageUrl, price } = action.product;
            const newProduct = new Product(
                action.product.id, 
                action.product.ownerId, 
                action.product.title, 
                action.product.imageUrl, 
                action.product.description, 
                action.product.price
            );

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }
        // ----------------------------------------------------------------------------
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(current => current.id !== action.productId),
                availableProducts: state.availableProducts.filter(current => current.id !== action.productId)
            }
        // ----------------------------------------------------------------------------
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(current => current.id === action.productId);
            const updatedProduct = new Product(
                action.productId, 
                state.userProducts[productIndex].ownerId, 
                action.product.title, 
                action.product.imageUrl, 
                action.product.description, 
                state.userProducts[productIndex].price
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            const availableProductsIndex = state.availableProducts.findIndex(current => current.id === action.productId);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductsIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        // ----------------------------------------------------------------------------
        default:
            return state
    }
};

export default productsReducer;