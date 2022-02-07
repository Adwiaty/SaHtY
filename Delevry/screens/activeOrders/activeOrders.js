import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width, height } = Dimensions.get('screen');

const activeOrdersList = [
    {
        id: '1',
        orderId: 'OID123456789',
        paymentMethod: 'Cash on Delivery',
        payableAmount: 8.50,
        pickupAddress: 'Pharmacy Ghazella',
        deliveryAddress: 'Borj El Wzir'
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
        deliveryAddress: 'Hadeyk El Manzah'
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
        payableAmount: 19.50,
        pickupAddress: 'Lac 2',
        deliveryAddress: 'Lac 1',
    }
];

const ActiveOrders = ({ navigation }) => {

    const [showActiveDialog, setShowActiveDialog] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            {orders()}
            {activeDialog()}
        </View>
    )

    function activeDialog() {
        return (
            <Dialog.Container visible={showActiveDialog}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{
                    backgroundColor: 'white',
                    height: height - 150,
                    borderRadius: Sizes.fixPadding
                }}>
                    {orderId()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {orderDetail()}
                        {locationDetail()}
                        {customerDetail()}
                        {paymentDetail()}
                        {startButton()}
                    </ScrollView>

                </View>
            </Dialog.Container>
        )
    }

    function startButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setShowActiveDialog(false);
                    navigation.navigate('ShowMap')
                }}
                style={styles.startButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Medium }}>
                    Start
                </Text>
            </TouchableOpacity>
        )
    }

    function paymentDetail() {
        return (
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Payment
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={{ ...styles.detailSpecificWrapStyle }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Payment
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium, }}>
                            Pay on Delivery
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function customerDetail() {
        return (
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Customer
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={{ ...styles.detailSpecificWrapStyle }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Name
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium, }}>
                            Bechir Ghaoui
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Phone
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            123456789
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function locationDetail() {
        return (
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Location
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium, width: width / 2.6, }}>
                            Pickup Location
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium, }}>
                            Lac 2 
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium, width: width / 2.6 }}>
                            Delivery Location
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                           Lac 1
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function orderDetail() {
        return (
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Order
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={styles.detailSpecificWrapStyle}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Deal 1
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            DT430
                        </Text>
                    </View>
                    <View style={styles.detailSpecificWrapStyle}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Nacr
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            DT80
                        </Text>
                    </View>
                    <View style={styles.detailSpecificWrapStyle}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>Delivery Charges
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            DT10
                        </Text>
                    </View>
                    <View style={{
                        height: 1.0,
                        backgroundColor: Colors.lightGrayColor,
                        marginBottom: Sizes.fixPadding - 5.0
                    }} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{ ...Fonts.blackColor18Medium }}>
                            Total
                        </Text>
                        <Text style={{ ...Fonts.primaryColor18Bold }}>
                            DT520
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function orderId() {
        return (
            <View style={styles.detailTitleWrapStyle}>
                <Text style={{ ...Fonts.whiteColor17Regular }}>
                    OID123456789
                </Text>
            </View>
        )
    }

    function orders() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowActiveDialog(true)}
                style={styles.orderDetailWrapStyle}>
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

                    <View style={{ marginBottom: Sizes.fixPadding - 9.0 }}>
                        <Text style={{ ...Fonts.grayColor16Medium }}>
                            Payment
                        </Text>
                        <Text style={{ ...Fonts.blackColor18Medium }}>
                            {`DT ${item.payableAmount.toFixed(2)}`}
                        </Text>
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
                    <Text style={{
                        ...Fonts.blackColor16Medium,
                        flex: 0.31,
                    }}>
                        {item.deliveryAddress}
                    </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={activeOrdersList}
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
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 70,
        alignSelf: 'center',
        margin: 0, padding: 0
    },
    detailWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
    },
    detailHeaderWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0
    },
    detailDescriptionWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: '#F6F6F6',
        borderWidth: 1.0,
        elevation: 0.70,
        padding: Sizes.fixPadding,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
    },
    detailSpecificWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding - 5.0
    },
    detailTitleWrapStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
    },
    startButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding,
    }
})

export default ActiveOrders;