import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const CartItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.product.quantity} </Text>
                <Text style={styles.text}>{props.product.productTitle}</Text>
            </View>

            <View style={styles.itemData}>
                <Text style={styles.text}>{props.product.sum.toFixed(2)}</Text>
                {props.deletable && (
                    <TouchableCmp style={styles.deleteButton} onPress={props.handleRemove}>
                        <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color='red' />
                    </TouchableCmp>
                )}
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 20,
        backgroundColor: 'white',
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    text: {
        fontFamily: 'open-sans-bold',
        // color: '#888',
        fontSize: 16,
        marginRight: 20
    },
    deleteButton: {
        marginLeft: 20,
    }
});
 
export default CartItem;