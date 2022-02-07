import React, { Component, useState } from "react";
import { SafeAreaView, StatusBar, Animated, BackHandler, StyleSheet, View, Text, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { TabView, TabBar } from 'react-native-tab-view';
import NewOrders from "../newOrders/newOrders";
import ActiveOrders from "../activeOrders/activeOrders";
import HistoryOrders from "../historyOrders/historyOrders";
import { NavigationEvents } from 'react-navigation';

const { width, height } = Dimensions.get('screen');

class OrdersScreen extends Component {

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
                <View style={{ flex: 1, }}>
                    {this.header()}
                    <Orders navigation={this.props.navigation} />
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor16Regular }}>
                        press back again to exit the app
                    </Text>
                </Animated.View>
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor22Medium }}>
                    Orders
                </Text>
                <MaterialIcons
                    name="notifications"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => this.props.navigation.navigate('Notifications')}
                />
            </View>
        )
    }
}

const Orders = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'New' },
        { key: 'second', title: 'Active' },
        { key: 'third', title: 'History' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <NewOrders navigation={navigation} />;
            case 'second':
                return <ActiveOrders navigation={navigation} />;
            case 'third':
                return <HistoryOrders navigation={navigation} />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.primaryColor, height: 3.0, }}
                    tabStyle={{
                        width: width / 3.0,
                    }}
                    scrollEnabled={true}
                    style={{ backgroundColor: 'white', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text
                            style={
                                focused ?
                                    {
                                        ...Fonts.primaryColor16Medium,
                                    } :
                                    {
                                        ...Fonts.lightGrayColor16Medium
                                    }
                            }
                        >
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 5.0
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

export default withNavigation(OrdersScreen);
