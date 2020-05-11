import { SIGNUP, LOGIN, LOGOUT, AUTHENTICATE, SET_DID_TRY_AUTOLOGIN } from '../types.js';
import { AsyncStorage } from 'react-native';

import env from '../../env.js';

let timer;

export const setDidTryAutoLogin = () => {
  return {
    type: SET_DID_TRY_AUTOLOGIN
  }
}

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime)); // ustaw sprawdzenie ważności tokena
    
    // zaloguj usera
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token
    })
  }
}

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch( `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email already exists';
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch(authenticate(
      responseData.localId,
      responseData.idToken,
      parseInt(responseData.expiresIn) * 1000
    ));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.firebaseKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
        message = 'Invalid credentials';
      }

      throw new Error(message);
    }

    const responseData = await response.json();
    
    dispatch(authenticate(
      responseData.localId,
      responseData.idToken,
      parseInt(responseData.expiresIn) * 1000
    ));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expirationDate: expirationDate.toISOString()
  }));
}

export const logout = () => {
  clearLogoutTimer();

  AsyncStorage.removeItem('userData');

  return {
    type: LOGOUT
  }
};

const clearLogoutTimer = () => {
  if(timer) {
    clearTimeout(timer);
  }
}

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime)
  }
}