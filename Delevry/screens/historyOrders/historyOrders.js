import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const historyOrdersList = [
    {
        id: '1',
        orderId: 'OID123456789',
        paymentMethod: 'Cash on Delivery',
        payableAmount: 8.50,
        pickupAddress: 'Pharmacy Ghazella',
        deliveryAddress: 'Borej El Wzir'
    },
    {
        id: '2',
        orderId: 'OID123789654',
        paymentMethod: 'Payed',
        payableAmount: 12.50,
        pickupAddress: 'Pharmacy Raoued',
        deliveryAddress: 'RBK'
    },
    {
        id: '3',
        orderId: 'OID957546521',
        paymentMethod: 'Pated',
        payableAmount: 15.00,
        pickupAddress: 'Beb Sadoun',
        deliveryAddress: 'Hadeyek El MAnzah'
    },
    {
        id: '4',
        orderId: 'OID652347952',
        paymentMethod: 'Cash on Delivery',
        payableAmount: 7.90,
        pickupAddress: 'Sokra',
        deliveryAddress: 'Nacr'
    },
    {
        id: '5',
        orderId: 'OID658246972',
        paymentMethod: 'Cash on Delivery',
        payableAmount: 19.90,
        pickupAddress: 'Lac 2',
        deliveryAddress: 'Lac 1'
    }
];

const HistoryOrders = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            {orders()}
        </View>
    )

    function orders() {
        const renderItem = ({ item }) => (
            <View style={styles.orderDetailWrapStyle}>
                <View style={styles.orderAndPaymentDetailWrapStyle}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="fastfood" size={29} color={Colors.primaryColor} />
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor18Medium }}>
                                {item.orderId}
                            </Text>
                            <View style={{ marginTop: Sizes.fixPadding + 10.0 }}>
                                <Text style={{ ...Fonts.grayColor16Medium }}>
                                    Payment Mode
                                </Text>
                                <Text style={{ ...Fonts.blackColor18Medium }}>
                                    {item.paymentMethod}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={styles.deliveredButtonStyle}>
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                Delivered
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding - 9.0 }}>
                            <Text style={{ ...Fonts.grayColor16Medium }}>
                                Payment
                            </Text>
                            <Text style={{ ...Fonts.blackColor18Medium }}>
                                {`DT ${item.payableAmount.toFixed(2)}`}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.deliveryAndPickupAddressWrapStyle}>
                    <Text style={{
                        ...Fonts.blackColor16Medium,
                        flex: 0.31,
                    }}>
                        {item.pickupAddress}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 0.31,
                    }}>
                        <MaterialIcons name="location-on" size={20} color={Colors.primaryColor} />
                        <View style={styles.dotStyle} />
                        <View style={styles.dotStyle} />
                        <View style={styles.dotStyle} />
                        <View style={styles.dotStyle} />
                        <View style={styles.dotStyle} />
                        <Image
                            source={require('../../assets/images/direaction.png')}
                            style={{ width: 16.0, height: 16.0, }}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={{ ...Fonts.blackColor16Medium, flex: 0.31, }}>
                        {item.deliveryAddress}
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                data={historyOrdersList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding,
                    paddingBottom: Sizes.fixPadding * 6.0,
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    dotStyle: {
        height: 5.0, width: 5.0,
        borderRadius: 2.5,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 7.0
    },
    deliveredButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    deliveryAndPickupAddressWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        flexDirection: 'row',
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        paddingVertical: Sizes.fixPadding,
    },
    orderAndPaymentDetailWrapStyle: {
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: 'space-between'
    },
    orderDetailWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    }
})

export default HistoryOrders;