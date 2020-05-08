import { ADD_TO_CART, REMOVE_FROM_CART, ADD_ORDER, DELETE_PRODUCT } from '../types.js';
import CartItem from '../../models/cartItemModel.js';

const initialState = {
    items: {},
    totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            let itemToAdd;
            
            if(state.items[addedProduct.id]) {
                // przedmiot znajduje się już w koszyku
                itemToAdd = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice,
                );
            } else {
                // dodaj nowy przedmiot do koszyka
                itemToAdd = new CartItem(1, productPrice, productTitle, productPrice);
            }

            return {
                ...state,
                items: {...state.items, [addedProduct.id]: itemToAdd},
                totalAmount: state.totalAmount + productPrice
            }
        // ----------------------------------------------------------------------------
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId];
            const currentQuantity = selectedCartItem.quantity;
            let updatedCartItems;
            if(currentQuantity > 1) {
                // zmienjsz ilość danego przedmiotu w koszyku
                const updatedItem = new CartItem(
                    selectedCartItem.quantity - 1, 
                    selectedCartItem.productPrice, 
                    selectedCartItem.productTitle, 
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = {...state.items, [action.productId]: updatedItem}
            } else {
                // usuń z koszyka
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.productId];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        // ----------------------------------------------------------------------------
        case ADD_ORDER:
            return initialState
        // ----------------------------------------------------------------------------
        case DELETE_PRODUCT:
            if(!state.items[action.productId]) {
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.productId].sum;
            delete updatedItems[action.productId];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
        // ----------------------------------------------------------------------------
        default:
            return state
    }
};

export default cartReducer;