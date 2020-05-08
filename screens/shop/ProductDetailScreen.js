import React from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { addToCart } from '../../redux/actions/cartActions.js';
import colors from '../../constants/colors.js';

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(current => current.id === productId));
    const dispatch = useDispatch();

    const handleAddToCart = (product) => dispatch(addToCart(selectedProduct))

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button title="Add to Card" color={colors.primary} onPress={handleAddToCart} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    actions: {
        alignItems: 'center',
        marginVertical: 10
    },
    price: {
        marginVertical: 20,
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    },
    description: {
        marginHorizontal: 20,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'open-sans'
    },
})
 
export default ProductDetailScreen;