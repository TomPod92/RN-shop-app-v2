import { SIGNUP, LOGIN, LOGOUT, AUTHENTICATE, SET_DID_TRY_AUTOLOGIN } from '../types.js';

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                didTryAutoLogin: true
            }
        case SET_DID_TRY_AUTOLOGIN:
            return {
                ...state,
                didTryAutoLogin: true
            }
        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            }
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