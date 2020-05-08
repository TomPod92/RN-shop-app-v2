import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Button, Alert, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { deleteProduct } from '../../redux/actions/productsActions.js';
import CustomHeaderButton from '../../components/UI/HeaderButton.js';
import ProductItem from '../../components/shop/ProductItem.js';
import colors from '../../constants/colors.js';

const UserProductsScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const handleEditProductPress = (productId) =>  props.navigation.navigate('EditProduct', { productId });
    // const handleDeleteItem = (productId) => dispatch(deleteProduct(productId));

    const handleDeleteItem = (productId) => {
        Alert.alert("Are you sure?", "Do you really want to delete this item?", [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => dispatch(deleteProduct(productId))},
        ]);
    }

    if(userProducts.length === 0) {
        return (
            <View style={styles.noInfo}>
                <Text>No products found :(</Text>
            </View>
        )
    }

    return (
        <FlatList 
            data={userProducts} 
            keyExtractor={item => item.id} 
            renderItem={itemData => (
                <ProductItem 
                    product={itemData.item}
                    onSelect={() => handleEditProductPress(itemData.item.id)}
                >
                    <Button title="Edit" color={colors.primary} onPress={() => handleEditProductPress(itemData.item.id)}/>
                    {/* <Button title="Delete" color={colors.primary} onPress={() => handleDeleteItem(itemData.item.id)}/> */}
                    <Button title="Delete" color={colors.primary} onPress={() => handleDeleteItem(itemData.item.id)}/>
                </ProductItem>
            )} 
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
        headerLeft: (
            (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
                </HeaderButtons>
            )
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => {navData.navigation.navigate("EditProduct")}} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    noInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductsScreen;
