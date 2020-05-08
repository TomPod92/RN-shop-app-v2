import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, ActivityIndicator, AsyncStorage } from 'react-native';

import { authenticate } from '../redux/actions/authActions.js';
import colors from '../constants/colors.js';

const StartupScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');

            if(!userData) {
                props.navigation.navigate('Auth');
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, userId, expirationDate } = transformedData;
            const expDate = new Date(expirationDate);

            if(expDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            const expiryTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');
            
            dispatch(authenticate(userId, token, expiryTime));
        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default StartupScreen;