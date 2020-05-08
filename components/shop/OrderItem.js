import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';

import CartItem from './CartItem.js';
import Card from '../UI/Card.js';
import colors from '../../constants/colors.js';

const OrderItem = (props) => {
    const [ showDetails, setShodDetails ] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.order.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.order.readableDate}</Text>
            </View>
        
            <Button title={showDetails ? "Hide details" : "Show Details"} color={colors.primary} onPress={() => setShodDetails(prevState => !prevState)} />

            {showDetails && (
                <View style={styles.detailItems}>
                    {props.order.items.map(current => <CartItem key={current.productId} product={current} deletable={false}/>)}
                </View>
            )}
        </Card>
    )
}

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
      fontFamily: 'open-sans',
      fontSize: 16,
      color: '#888',
  },
  detailItems: {
      width: '100%',
  }

});

export default OrderItem