import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import {
	ScrollView,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { fetchOrders } from '../api'
import Header from '../Header'
import OrderCard from '../OrderCard'
import { Order } from '../types'

export default function Orders() {
	const [orders, setOrders] = useState<Order[]>([])
	const [isLocading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		fetchOrders()
			.then((response) => setOrders(response.data))
			.catch(() => Alert.alert('Houve um erro ao buscar os pedidos.'))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<>
			<Header />
			<ScrollView style={styles.container}>
				{isLocading ? (
					<Text>Buscando pedidos...</Text>
				) : (
					orders.map((order) => (
						<TouchableWithoutFeedback key={order.id}>
							<OrderCard order={order} />
						</TouchableWithoutFeedback>
					))
				)}
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingRight: '5%',
		paddingLeft: '5%',
	},
})
