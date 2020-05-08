import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { fetchProducts } from '../../redux/actions/productsActions.js';
import { addToCart } from '../../redux/actions/cartActions.js';
import ProductItem from '../../components/shop/ProductItem.js';
import CustomHeaderButton from '../../components/UI/HeaderButton.js';
import colors from '../../constants/colors.js';

const ProductsOverviewScreen = (props) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
// ----------------------------------------------------------------------------
    const loadProducts = useCallback(
        async () => {
            setError(null);
            setIsRefreshing(true);
            try {
                await dispatch(fetchProducts());
            } catch(error) {
                setError(error.message);
            }
            setIsRefreshing(false)
        }, [dispatch, setIsLoading, setError]
    );
// ----------------------------------------------------------------------------
    useEffect(() => {
        const willFocus = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocus.remove();
        }

    }, [loadProducts]);
// ----------------------------------------------------------------------------
    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        })
    }, [dispatch, loadProducts])
// ----------------------------------------------------------------------------
    const handleViewDetails = (product) => props.navigation.navigate('ProductDetail', { productId: product.id, productTitle: product.title });
// ----------------------------------------------------------------------------
    const handleAddToCart = (product) => dispatch(addToCart(product));
// ----------------------------------------------------------------------------
    if(error) {
        return (
            <View style={styles.centered}>
                <Text>Error occured :(</Text>
                <Button title="Try again" onPress={loadProducts} color={colors.primary} />
            </View>
        )
    }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary}/>
            </View>
        )
    }

    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found :(</Text>
            </View>
        )
    }

    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            renderItem={itemData => (
                <ProductItem product={itemData.item} onSelect={() => handleViewDetails(itemData.item)}>
                    <Button title="View Details" color={colors.primary} onPress={() => handleViewDetails(itemData.item)}/>
                    <Button title="Add to Cart" color={colors.primary} onPress={() => handleAddToCart(itemData.item)}/>
                </ProductItem>
            )}
        />
    );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All products',
        headerLeft: (
            (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
                </HeaderButtons>
            )
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Cart" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {navData.navigation.navigate("Cart")}} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;