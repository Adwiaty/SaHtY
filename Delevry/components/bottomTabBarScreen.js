import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Sizes } from "../constant/styles";
import ProfileScreen from "../screens/profile/profileScreen";
import WalletScreen from "../screens/wallet/walletScreen";
import OrderScreen from "../screens/order/orderScreen";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const TabNavigator = createAppContainer(
    createBottomTabNavigator(
        {
            Order: {
                screen: OrderScreen,
                navigationOptions: {
                    header: () => null,
                    tabBarLabel: 'Order',
                    tabBarIcon: ({ tintColor, focused }) => (
                        <MaterialCommunityIcons name="shopping" size={24} color={focused ? tintColor : Colors.grayColor} />
                    ),
                },
            },
            Wallet: {
                screen: WalletScreen,
                navigationOptions: {
                    tabBarLabel: 'Wallet',
                    tabBarIcon: ({ tintColor, focused }) => (
                        <MaterialIcons name="account-balance-wallet" size={27} color={focused ? tintColor : Colors.grayColor} />
                    ),
                },
            },
            Profile: {
                screen: ProfileScreen,
                navigationOptions: {
                    header: () => null,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ tintColor, focused }) => (
                        <MaterialIcons name="person" size={27} color={focused ? tintColor : Colors.grayColor} />
                    ),
                }
            },
        },
        {
            initialRouteName: "Order",
            barStyle: {
                backgroundColor: Colors.whiteColor,
            },
            tabBarOptions: {
                showLabel: true,
                labelStyle: {
                    fontSize: 14.0,
                    fontFamily: 'Roboto_Regular',
                },
                tabStyle: {
                    borderTopLeftRadius: Sizes.fixPadding + 10.0,
                    borderTopRightRadius: Sizes.fixPadding + 10.0,
                },
                style: {
                    height: 70.0,
                    elevation: 3.0,
                    borderTopColor: 'gray',
                    borderTopWidth: 0.20,
                    borderTopLeftRadius: Sizes.fixPadding + 10.0,
                    borderTopRightRadius: Sizes.fixPadding + 10.0,
                },
                activeTintColor: Colors.primaryColor,
            },
        },
    )
);

export default TabNavigator;




