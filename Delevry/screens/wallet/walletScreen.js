import React, { Component } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Animated, Dimensions, BackHandler, View, Text, FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';

const { height } = Dimensions.get('screen');

const earningList = [
    {
        id: '1',
        earningAmount: 3.50,
    },
    {
        id: '2',
        earningAmount: 5.70,
    },
    {
        id: '3',
        earningAmount: 3.90,
    },
    {
        id: '4',
        earningAmount: 8.75,
    },
    {
        id: '5',
        earningAmount: 9.0,
    },
    {
        id: '6',
        earningAmount: 7.30,
    },
    {
        id: '7',
        earningAmount: 5.10,
    },
    {
        id: '8',
        earningAmount: 7.50,
    },
    {
        id: '9',
        earningAmount: 8.50,
    },
    {
        id: '10',
        earningAmount: 10.0,
    },
];

class WalletScreen extends Component {

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.01 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }

    state = {
        backClickCount: 0,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <View style={{ flex: 1 }}>
                    {this.earningInfo()}
                    <View style={styles.earningListWrapStyle}>
                        <FlatList
                            data={earningList}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={this.renderItem}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingTop: Sizes.fixPadding * 2.0,
                                paddingBottom: Sizes.fixPadding * 17.0
                            }}
                        />
                    </View>
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor16Regular }}>
                        press back again to exit the app
                    </Text>
                </Animated.View>
            </SafeAreaView>
        )
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.earningListItemWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="fastfood" size={29} color={Colors.primaryColor} />
                    <Text style={{ ...Fonts.blackColor18Medium, marginLeft: Sizes.fixPadding }}>
                        Order Delivered
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ ...Fonts.grayColor18Medium }}>
                        {item.earningAmount.toFixed(2)}
                    </Text>
                    <Text style={{ ...Fonts.darkPinkColor16Medium, }}>
                        Earning
                    </Text>
                </View>
            </View>
        )
    }

    earningInfo() {
        return (
            <View style={styles.totalEarningInfoWrapStyle}>
                <Text style={{ ...Fonts.whiteColor25Medium }}>
                    Earning
                </Text>
                <Text style={{ ...Fonts.whiteColor25Medium, paddingTop: Sizes.fixPadding - 3.0 }}>
                    DT190.8
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    earningListWrapStyle: {
        top: -10.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: '#F4F4F4',
        borderTopLeftRadius: Sizes.fixPadding + 3.0,
        borderTopRightRadius: Sizes.fixPadding + 3.0,
    },
    earningListItemWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    totalEarningInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        height: 120.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default withNavigation(WalletScreen);
