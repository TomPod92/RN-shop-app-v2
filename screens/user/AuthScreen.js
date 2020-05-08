import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import { signup, login } from '../../redux/actions/authActions.js'
import Card from '../../components/UI/Card.js'
import Input from '../../components/UI/Input.js';
import colors from '../../constants/colors.js';

const formReducer = (state, action) => {
    if(action.type === "UPDATE") {
        const updatedValues = {
            ...state.inputValues,
            [action.inputId]: action.value
        };

        const updatedValidities = {
            ...state.inputValidities,
            [action.inputId]: action.isValid
        }

        let updatedFormIsValid = true;

        for(const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        }
    }
    return state
};

const AuthScreen = (props) => {
    const [ isSignup, setIsSignup ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();
    const dispatch = useDispatch();
//----------------------------------------------------------------------
    useEffect(() => {
        if(error) {
            Alert.alert("An error occured!", error, [{text: 'Okey'}])
        }
    }, [error]);
//----------------------------------------------------------------------
    const [ formState, dispatchFormState ] = useReducer(formReducer, { 
        inputValues: {
            email: '',
            password: ''
        }, 
        inputValidities: {
            email: false,
            password: false,
        }, 
        formIsValid: false
    });
//----------------------------------------------------------------------
    const handleInputChange = useCallback((inputId, inputValue, inputValidity ) => {
        dispatchFormState({
            type: 'UPDATE',
            value: inputValue,
            isValid: inputValidity,
            inputId: inputId
        });
    }, [dispatchFormState]); // wykład 191
//----------------------------------------------------------------------
    const handleAuth = async () => {
        
        let action;

        if(isSignup) {
            action = signup(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = login(formState.inputValues.email, formState.inputValues.password);
        }

        setIsLoading(true);
        setError(null)

        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }

    }
//----------------------------------------------------------------------
    return (
        // <KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={50} >
        <View style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id="email"
                            label="email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email adress"
                            onInputChange={handleInputChange}
                            initialvalue=""
                        />

                        <Input 
                            id="password"
                            label="password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLenght={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password"
                            onInputChange={handleInputChange}
                            initialvalue=""
                        />

                        <View style={styles.buttonContainer}>
                            <Button 
                                title={isSignup ? 'Sign up' : 'Login'} 
                                color={colors.primary} 
                                onPress={handleAuth}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={colors.primary}/>
                            ) : (
                                <Button 
                                    title={`Switch to ${isSignup ? 'login' : 'Sign Up'}`} 
                                    color={colors.accent} 
                                    onPress={() => setIsSignup( prevState => !prevState)}
                                />
                            )}
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </View>
        // </KeyboardAvoidingView>
    )
};

AuthScreen.navigationOptions = {
    headerTitle: "Authenticate"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 15
    },
    buttonContainer: {
        marginTop: 10
    },
});

export default AuthScreen;
