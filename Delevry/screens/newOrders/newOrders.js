import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

const newOrders = [
    {
        id: '1',
        orderId: 'OID123456789',
        paymentMethod: 'Cash on Delivery',
        payableAmount: 8.50,
        pickupAddress: ' Pharmacy Ghazella',
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
        deliveryAddress: 'Hadeyek El Manzah'
    },
    {
        id: '4',
        orderId: 'OID652347952',
        paymentMethod: 'Cash on Delivery',
        payableAmount: 7.90,
        pickupAddress: 'Socra',
        deliveryAddress: 'Nacr'
    }
];

const NewOrders = () => {

    const [newOrdersList, setNewOrderList] = React.useState(newOrders);

    const [showAcceptDialog, setShowAcceptDialog] = useState(false);

    const [currentOrderId, setCurrentOrderId] = useState(null);

    const [showRejectDialog, setShowRejectDialog] = useState(false);

    const [resonField, setResonField] = useState(false);

    return (
        newOrdersList.length == 0
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F4' }}>
                <MaterialCommunityIcons name="shopping" size={60}
                    color={Colors.grayColor}
                />
                <Text style={{ ...Fonts.grayColor17Medium, marginTop: Sizes.fixPadding }}>
                    No new orders.
                </Text>
            </View>
            :
            <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                {orders()}
                {acceptDialog()}
                {rejectDialog()}
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
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setShowAcceptDialog(true),
                                    setCurrentOrderId(item.id);
                            }}
                            style={styles.acceptButtonStyle}>
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                Accept
                            </Text>
                        </TouchableOpacity>
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
                    <Text style={{
                        ...Fonts.blackColor16Medium,
                        flex: 0.31,
                    }}>
                        {item.deliveryAddress}
                    </Text>
                </View>
            </View>
        )

        return (
            <FlatList
                data={newOrdersList}
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

    function rejectDialog() {
        return (
            <Dialog.Container visible={showRejectDialog}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{ backgroundColor: 'white', borderRadius: Sizes.fixPadding }}>
                    {resonToReject()}
                    <Text style={{ ...Fonts.blackColor14Regular, textAlign: 'center', marginTop: Sizes.fixPadding }}>
                        Write a specific reason to reject order
                    </Text>
                    {rejectResonTextField()}
                    {cancelAndSendButton()}
                </View>
            </Dialog.Container>
        )
    }

    function rejectResonTextField() {
        return (
            <TextInput
                style={{
                    borderColor: resonField ? Colors.primaryColor : Colors.grayColor,
                    ...styles.rejectResonTextInputStyle,
                }}
                selectionColor={Colors.primaryColor}
                multiline={true}
                numberOfLines={4}
                placeholder="Enter Reason Here"
                onFocus={() => setResonField(true)}
                onBlur={() => setResonField(false)}
            />
        )
    }

    function cancelAndSendButton() {
        return (
            <View style={styles.cancelAndSendButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setShowRejectDialog(false);
                    }}
                    style={styles.cancelButtonStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Medium }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9}
                    onPress={() => {
                        setShowRejectDialog(false);
                    }}
                    style={styles.sendButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Medium }}>Send</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function resonToReject() {
        return (
            <View style={styles.detailTitleWrapStyle}>
                <Text style={{ ...Fonts.whiteColor17Regular }}>
                    Reason to Reject
                </Text>
            </View>
        )
    }

    function acceptDialog() {
        return (
            <Dialog.Container visible={showAcceptDialog}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{ backgroundColor: 'white', height: height - 150, borderRadius: Sizes.fixPadding }}>
                    {orderId()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {orderDetail()}
                        {locationDetail()}
                        {customerDetail()}
                        {paymentDetail()}
                        {rejectAndAcceptButton()}
                    </ScrollView>
                </View>
            </Dialog.Container>
        )
    }

    function rejectAndAcceptButton() {
        return (
            <View style={styles.rejectAndAcceptButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        let filterArray = newOrdersList.filter((val, i) => {
                            if (val.id !== currentOrderId) {
                                return val;
                            }
                        })
                        setNewOrderList(filterArray);
                        setShowAcceptDialog(false);
                        setShowRejectDialog(true);
                    }}
                    style={styles.rejectButtonStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Medium }}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9}
                    onPress={() => {
                        let filterArray = newOrdersList.filter((val, i) => {
                            if (val.id !== currentOrderId) {
                                return val;
                            }
                        })
                        setNewOrderList(filterArray);
                        setShowAcceptDialog(false);
                    }}
                    style={styles.modalAcceptButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Medium }}>Accept</Text>
                </TouchableOpacity>
            </View>
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
                            Ghaoui Bechir
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Phone
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            29705403
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
                            Pharmacy Ghazella
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium, width: width / 2.6 }}>
                            Delivery Location
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Borej El Wzir
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
                            N95 Masks
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
                        height: 0.50,
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
}

const styles = StyleSheet.create({
    dotStyle: {
        height: 5.0, width: 5.0,
        borderRadius: 2.5,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 7.0
    },
    acceptButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
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
        alignItems: 'center',
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
    rejectButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    modalAcceptButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    rejectAndAcceptButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 3.0,
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
    rejectResonTextInputStyle: {
        borderWidth: 1.5,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor16Medium,
        marginVertical: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        backgroundColor: '#F5F5F5',
    },
    cancelAndSendButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    sendButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
})

export default NewOrders;