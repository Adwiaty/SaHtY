import React, { Component } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Text, ScrollView, BackHandler, Image, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get('screen');

class ShowMapScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };

    state = {
        showDialog: false,
        orderCompleted: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, }}>
                    {this.header()}
                    {this.mapInfo()}
                </View>
                {this.listIcon()}
                {this.phoneIcon()}
                {this.userInfo()}
                {this.detailDiolog()}
                {this.orderCompletedDialog()}
            </SafeAreaView>
        )
    }

    mapInfo() {
        return (
            <MapView
                style={{
                    height: height,
                }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.006,
                    longitudeDelta: 0.006,
                }}
                mapType="terrain"
            >
                <Marker coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}>
                    <Image
                        source={require('../../assets/images/custom_marker.png')}
                        style={{ width: 35.0, height: 35.0 }}
                    />
                </Marker>
            </MapView >
        )
    }

    orderCompletedDialog() {
        return (
            <Dialog.Container visible={this.state.orderCompleted}
                contentStyle={styles.orderCompletedDialogStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: Sizes.fixPadding
                }}>
                    <View style={styles.orderCompletedIconWrapStyle}>
                        <MaterialIcons name="done" size={40} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor17Medium, marginBottom: Sizes.fixPadding * 2.0 }}>
                        Congratulation! Order Completed.
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    detailDiolog() {
        return (
            <Dialog.Container visible={this.state.showDialog}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{
                    backgroundColor: 'white',
                    height: height - 150,
                    borderRadius: Sizes.fixPadding
                }}>
                    {this.orderId()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.orderDetail()}
                        {this.locationDetail()}
                        {this.customerDetail()}
                        {this.paymentDetail()}
                        {this.okButton()}
                    </ScrollView>
                </View>
            </Dialog.Container>
        )
    }

    okButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showDialog: false })}
                style={styles.okButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Medium }}>
                    Ok
                </Text>
            </TouchableOpacity>
        )
    }

    paymentDetail() {
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

    customerDetail() {
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
                            Allison Perry
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

    locationDetail() {
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
                            28 Mott Stret
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium, width: width / 2.6 }}>
                            Delivery Location
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            56 Andheri East
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    orderDetail() {
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
                            $430
                        </Text>
                    </View>
                    <View style={styles.detailSpecificWrapStyle}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            7up Regular 250ml
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            $80
                        </Text>
                    </View>
                    <View style={styles.detailSpecificWrapStyle}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>Delivery Charges
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            $10
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
                            $520
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    orderId() {
        return (
            <View style={styles.detailTitleWrapStyle}>
                <Text style={{ ...Fonts.whiteColor17Regular }}>
                    OID123456789
                </Text>
            </View>
        )
    }

    listIcon() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showDialog: true })}
                style={{
                    bottom: 240.0,
                    ...styles.iconWrapStyle,
                }}>
                <MaterialCommunityIcons name="clipboard-text" size={27} color={Colors.primaryColor} />
            </TouchableOpacity>
        )
    }

    phoneIcon() {
        return (
            <View style={{
                bottom: 170.0,
                ...styles.iconWrapStyle
            }}>
                <MaterialIcons name="local-phone" size={27} color={Colors.primaryColor} />
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor19Bold }}>
                    Map
                </Text>
                <MaterialIcons name="arrow-back" size={24} color="black"
                    style={{
                        position: 'absolute',
                        left: 20.0,
                    }}
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        )
    }

    userInfo() {
        return (
            <View style={styles.userInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding }}>
                    <Image
                        source={require('../../assets/images/user.jpg')}
                        style={{ height: 80.0, width: 80.0, borderRadius: 40.0, }}
                        resizeMode="cover"
                    />
                    <View style={{ marginLeft: Sizes.fixPadding + 2.0, }}>
                        <Text style={{ ...Fonts.blackColor18Medium }}>
                            Allison Perry
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding, }}>
                            56 Andheri East
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this.setState({ orderCompleted: true });
                        setTimeout(() => {
                            this.setState({ orderCompleted: false })
                            this.props.navigation.navigate('BottomTabBar')
                        }, 3000);
                    }}
                    style={styles.finishButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor18Medium }}>
                        Finish
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
    },
    finishButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: Sizes.fixPadding * 2.0,
    },
    userInfoWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 150.0,
        alignItems: 'flex-start',
        borderTopColor: Colors.lightGrayColor,
        borderTopWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding
    },
    iconWrapStyle: {
        position: 'absolute',
        right: 20.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
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
    okButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding,
    },
    orderCompletedDialogStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        alignSelf: 'center',
        paddingTop: -Sizes.fixPadding,
    },
    orderCompletedIconWrapStyle: {
        height: 70.0,
        width: 70.0,
        borderRadius: 35.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.5,
        marginBottom: Sizes.fixPadding * 2.0,
    }
});

ShowMapScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(ShowMapScreen);