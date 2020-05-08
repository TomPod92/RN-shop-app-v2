import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator.js';

const NavigationContainer = (props) => {
    const isAuthenticated = useSelector(state => !!state.auth.token);

    const navRef = useRef();

    // za każdym razem jak sie wylogujemy, przełącza na inny ekran
    useEffect(() => {
        if(!isAuthenticated) {
            navRef.current.dispatch(NavigationActions.navigate({routeName: "Auth"}));
        }
    }, [isAuthenticated]);

    return (
        <ShopNavigator ref={navRef} /> 
    )
}

export default NavigationContainer;
