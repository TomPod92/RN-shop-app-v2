import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { ShopNavigator, AuthNavigator, } from './ShopNavigator.js';
import StartupScreen from '../screens/StartupScreen.js';


const AppNavigator = (props) => {
    const isAuthenticated = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    return (
        <NavigationContainer>
            { isAuthenticated && <ShopNavigator /> }
            { !isAuthenticated && didTryAutoLogin && <AuthNavigator /> }
            { !isAuthenticated && !didTryAutoLogin && <StartupScreen /> }
        </NavigationContainer>
    )
}

export default AppNavigator;
