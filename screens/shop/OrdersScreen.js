import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Platform, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrders } from '../../redux/actions/ordersActions.js';
import CustomHeaderButton from '../../components/UI/HeaderButton.js';
import OrderItem from '../../components/shop/OrderItem.js';
import colors from '../../constants/colors.js';

const OrdersScreen = () => {
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(false);
    const orders = useSelector(state => state.orders.orders);

    useEffect(() => {
        setIsLoading(true);

        dispatch(fetchOrders()).then(() => {
            setIsLoading(false);
        });

    }, [dispatch])

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={colors.primary} />
            </View>
        )
    }

    if(orders.length === 0) {
        return (
            <View style={styles.noInfo}>
                <Text>No orders found :(</Text>
            </View>
        )
    }

    return (
        <FlatList data={orders} keyExtractor={item => item.id} renderItem={itemData => <OrderItem order={itemData.item}/>}/>
    );
}

export const ordersScreenOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
            </HeaderButtons>
        ),

    }
}

// export const ordersScreenOptions = navData => {
//     return {
//       headerTitle: 'Your Orders',
//       headerLeft: () => (
//         <HeaderButtons HeaderButtonComponent={HeaderButton}>
//           <Item
//             title="Menu"
//             iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
//             onPress={() => {
//               navData.navigation.toggleDrawer();
//             }}
//           />
//         </HeaderButtons>
//       )
//     };
//   };

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
 
export default OrdersScreen;
