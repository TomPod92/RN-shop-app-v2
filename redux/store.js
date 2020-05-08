import {createStore, combineReducers} from 'redux';

import productsReducer from './reducers/productsReducer.js';
import cartReducer from './reducers/cartReducer.js';
import ordersReducer from './reducers/ordersReducer.js';
import authReducer from './reducers/authReducer.js';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
});

export default rootReducer;