import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Alert, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton.js';
import Input from '../../components/UI/Input.js';
import { addProduct, editProduct } from '../../redux/actions/productsActions.js';
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

const EditProductScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const productToEdit = useSelector(state => state.products.userProducts.find(current => current.id === productId));
    const dispatch = useDispatch();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();
    //----------------------------------------------------------------------
    useEffect(() => {
        if(error) {
            Alert.alert('An error occured :(', error, [{text: 'OK'}])
        }
    }, [error])
    //----------------------------------------------------------------------
    const [ formState, dispatchFormState ] = useReducer(formReducer, { 
        inputValues: {
            title: productToEdit ? productToEdit.title : '',
            description: productToEdit ? productToEdit.description : '',
            imageUrl: productToEdit ? productToEdit.imageUrl : '',
            price: ''
        }, 
        inputValidities: {
            title:  productToEdit ? true : false,
            description:  productToEdit ? true : false,
            imageUrl:  productToEdit ? true : false,
            price:  productToEdit ? true : false,
        }, 
        formIsValid: productToEdit ? true : false
    });
    //----------------------------------------------------------------------
    const handleSubmitForm = useCallback(async () => {
        const product = { 
            title: formState.inputValues.title, 
            imageUrl: formState.inputValues.imageUrl, 
            price: +formState.inputValues.price,
            description: formState.inputValues.description,
        };

        if(!formState.formIsValid) {
            Alert.alert("Wrong input", "Please check errors in the form", [
                { text: 'Ok' }
            ])
            return;
        }

        setIsLoading(true);
        setError(null)

        try {
            if(productToEdit) {
                await dispatch(editProduct(product));
            } else {
                await dispatch(addProduct(product, productId));
            }

            props.navigation.goBack();
        } catch(error) {
            setError(error.message);
        }
        
        setIsLoading(false);

    }, [dispatch, productId, formState]);
    //----------------------------------------------------------------------
    useEffect(() => {
        props.navigation.setParams({ submit: handleSubmitForm });
    }, [handleSubmitForm]);
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
    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id="title"
                    label="Title"
                    errorText="Please enter a valid title!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    onInputChange={handleInputChange}
                    initialValue={productToEdit ? productToEdit.title : ''}
                    initiallyValid={!!productToEdit}
                    required
                />

                <Input
                    id="imageUrl"
                    label="Image Url"
                    errorText="Please enter a valid image url!"
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={handleInputChange}
                    initialValue={productToEdit ? productToEdit.imageUrl : ''}
                    initiallyValid={!!productToEdit}
                    required
                />

                {productToEdit ? null : (
                    <Input
                        id="price"
                        label="Price"
                        errorText="Please enter a valid price!"
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        onInputChange={handleInputChange}
                        required
                        min={0.1}
                    />
                )}

                <Input
                    id="description"
                    label="Description"
                    errorText="Please enter a valid description!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    // multiline
                    // numberOfLines={3}
                    onInputChange={handleInputChange}
                    initialValue={productToEdit ? productToEdit.description : ''}
                    initiallyValid={!!productToEdit}
                    required
                    minLength={5}
                />
            </View>
        </ScrollView>
    )
};

EditProductScreen.navigationOptions = navData => {
    const submit = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Save" iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={submit} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        margin: 20,
    },
   
});

export default EditProductScreen;