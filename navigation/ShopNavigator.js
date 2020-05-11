import React from 'react';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Platform, View, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen, { productsOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen.js';
import ProductDetailScreen, { productDetailsScreenOptions} from '../screens/shop/ProductDetailScreen';
import CartScreen, { cartScreenOptions} from '../screens/shop/CartScreen.js';
import OrdersScreen, { ordersScreenOptions } from '../screens/shop/OrdersScreen.js';
import UserProductsScreen, { userProductsScreenOptions } from '../screens/user/UserProductsScreen.js';
import EditProductScreen, { editProductScreenOptions } from '../screens/user/EditProductScreen.js';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen.js';
import StartupScreen from '../screens/StartupScreen.js';
import { logout } from '../redux/actions/authActions.js';
import colors from '../constants/colors.js';

// globalna konfiguracja navigatora
const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
}

//--------------------------------------------------------------------------------
// tworzymy komponent z navigatorem
const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions} >
            <ProductsStackNavigator.Screen name="ProductsOverview" component={ProductsOverviewScreen} options={productsOverviewScreenOptions} />
            <ProductsStackNavigator.Screen name="ProductDetail" component={ProductDetailScreen} options={productDetailsScreenOptions} />
            <ProductsStackNavigator.Screen name="Cart" component={CartScreen} options={cartScreenOptions} />
        </ProductsStackNavigator.Navigator>
    )
}
// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
// }, {
    // navigationOptions: {
    //     drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? "md-cart" : "ios-cart"} size={23} color={drawerConfig.tintColor}/>
    // },
//     defaultNavigationOptions: defaultNavOptions
// });
//--------------------------------------------------------------------------------
const OrderStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrderStackNavigator.Navigator screenOptions={defaultNavOptions} >
            <OrderStackNavigator.Screen name="Orders" component={OrdersScreen} options={ordersScreenOptions} />
        </OrderStackNavigator.Navigator>
    )
}
// const OrdersNavigator = createStackNavigator({
//     Orders: OrderScreen
// }, {
    // navigationOptions: {
    //     drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? "md-list" : "ios-list"} size={23} color={drawerConfig.tintColor}/>
    // },
//     defaultNavigationOptions: defaultNavOptions
// });
// //--------------------------------------------------------------------------------
const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions} >
            <AdminStackNavigator.Screen name="UserProducts" component={UserProductsScreen} options={userProductsScreenOptions} />
            <AdminStackNavigator.Screen name="EditProduct" component={EditProductScreen} options={editProductScreenOptions} />
        </AdminStackNavigator.Navigator>
    )
}
// const AdminNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen,
// }, {
    // navigationOptions: {
    //     drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? "md-create" : "ios-create"} size={23} color={drawerConfig.tintColor}/>
    // },
//     defaultNavigationOptions: defaultNavOptions
// });
// //--------------------------------------------------------------------------------
const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();

    return (
        <ShopDrawerNavigator.Navigator 
            drawerContentOptions={{activeTintColor: colors.primary}} 
            drawerContent={props => {
                return (
                    <View style={{flex: 1, paddingTop: 40}}>
                        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                            <DrawerItemList {...props} />
                            <Button title="Logout" color={colors.primary} onPress={() => dispatch(logout())} />
                        </SafeAreaView>
                    </View>
                )
            }} 
        >
            <ShopDrawerNavigator.Screen 
                name="Products" 
                component={ProductsNavigator} 
                options={{
                    drawerIcon: props => <Ionicons name={Platform.OS === 'android' ? "md-cart" : "ios-cart"} size={23} color={props.color}/>
                }} 
            />
            <ShopDrawerNavigator.Screen 
                name="Orders" 
                component={OrdersNavigator} 
                options={{
                    drawerIcon: props => <Ionicons name={Platform.OS === 'android' ? "md-list" : "ios-list"} size={23} color={props.color}/>
                }}
            />
            <ShopDrawerNavigator.Screen 
                name="Admin" 
                component={AdminNavigator} 
                options={{
                    drawerIcon: props => <Ionicons name={Platform.OS === 'android' ? "md-create" : "ios-create"} size={23} color={props.color}/>
                }} 
            />
        </ShopDrawerNavigator.Navigator>
    )
}
// const ShopNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
// }, {
    // contentOptions: {
    //     activeTintColor: colors.primary
    // },
    // contentComponent: props => {
    //     const dispatch = useDispatch();

    //     const handleLogout = () => {
    //         dispatch(logout());
    //     }
    //     return (
    //         <View style={{flex: 1, paddingTop: 40}}>
    //             <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
    //                 <DrawerItems {...props} />
    //                 <Button title="Logout" color={colors.primary} onPress={handleLogout} />
    //             </SafeAreaView>
    //         </View>
    //     )
    // }
    
// });
// //--------------------------------------------------------------------------------
const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions}/>
    </AuthStackNavigator.Navigator>
  );
};


// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions
// });
// //--------------------------------------------------------------------------------
// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// })

// export default createAppContainer(MainNavigator);