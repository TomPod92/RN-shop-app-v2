import { SIGNUP, LOGIN, LOGOUT, AUTHENTICATE } from '../types.js';

const initialState = {
    token: null,
    userId: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            return initialState;
        // case SIGNUP:
        //     return {
        //         token: action.token,
        //         userID: action.userID
        //     } 
        // case LOGIN:
        //     return {
        //         token: action.token,
        //         userID: action.userID
        //     } 
        default:
            return state
    }
}

export default authReducer;