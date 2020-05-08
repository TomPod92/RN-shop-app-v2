import { SET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../types.js';
import Product from '../../models/productModel.js';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(`https://rn-shop-app-33720.firebaseio.com/products.json`);
            if(!response.ok) {
                throw new Error('Something went wrong :(')
            }

            const responseData = await response.json();
            const loadedProducts = [];
            for(const key in responseData) {
                loadedProducts.push(
                    new Product(
                        key, 
                        responseData[key].ownerId, 
                        responseData[key].title, 
                        responseData[key].imageUrl,
                        responseData[key].description,
                        responseData[key].price
                    )
                )
            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(current => current.ownerId === userId)
            });
        } catch(error) {
            // powinno się zrobić więcej
            throw error
        }
        
    }
}

export const addProduct = product => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(`https://rn-shop-app-33720.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const responseData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            product: {...product, id: responseData.name, ownerId: userId}
        });
    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;

        const response = await fetch(`https://rn-shop-app-33720.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE'
        });

        if(!response.ok) {
            throw new Error('Something went wrong :(')
        }

        dispatch({
            type: DELETE_PRODUCT,
            productId
        })
    }
};

export const editProduct = (product, id) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;

        const response = await fetch(`https://rn-shop-app-33720.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: product.title,
                description: product.description,
                imageUrl: product.imageUrl
            })
        });

        if(!response.ok) {
            throw new Error('Something went wrong :(')
        }

        dispatch({
            type: UPDATE_PRODUCT,
            productId: id,
            product: {
                title: product.title,
                description: product.description,
                imageUrl: product.imageUrl
            },
        })
    }
}