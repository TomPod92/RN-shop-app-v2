import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, ActivityIndicator, AsyncStorage } from 'react-native';

import { authenticate, setDidTryAutoLogin } from '../redux/actions/authActions.js';
import colors from '../constants/colors.js';

const StartupScreen = (props) => {
    const dispatch = useDispatch();

    // spróbuj zalogować użytkownika
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');

            // jeżeli na urządzeniu nie ma tokena przenieś nas na "Auth screen"
            if(!userData) {
                // props.navigation.navigate('Auth');
                dispatch(setDidTryAutoLogin());
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, userId, expirationDate } = transformedData;
            const expDate = new Date(expirationDate);

            // jeżeli znaleźliśmy token ale już wygasł przenieś nas na "auth screen"
            if(expDate <= new Date() || !token || !userId) {
                // props.navigation.navigate('Auth');
                dispatch(setDidTryAutoLogin());
                return;
            }
            const expiryTime = new Date(expirationDate).getTime() - new Date().getTime();

            // jeżeli znaleźliśmy token i jet on ważny, przenieś nas na "shop screen"
            // props.navigation.navigate('Shop');
            
            // wyslij token do reduxa
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