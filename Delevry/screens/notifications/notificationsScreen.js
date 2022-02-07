import React, { useState, useRef, Component } from 'react';
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { Ionicons } from '@expo/vector-icons';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Dimensions,
    BackHandler
} from "react-native";
import { withNavigation } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { TransitionPresets } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const notificationsList = [
    {
        key: '1',
        title: 'Order Completed!',
        description: 'Hurry! You have successfully delivered order!',

    },
    {
        key: '2',
        title: 'You Payout Approved!',
        description: 'Congratulation! Your payout has been approved!',
    },
];

class NotificationScreen extends Component {

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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <Notification navigation={this.props.navigation} />
            </SafeAreaView>
        )
    }
}

const rowTranslateAnimatedValues = {};

const Notification = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationsList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 120],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={styles.notificationIconWrapStyle}>
                        <MaterialIcons name="notifications-none" size={40} color={Colors.whiteColor} />
                    </View>
                    <View style={styles.notificationDescriptionStyle}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor19Bold }}>
                            {data.item.title}
                        </Text>
                        <Text numberOfLines={3} style={{
                            ...Fonts.grayColor16Medium,
                            marginTop: Sizes.fixPadding - 5.0
                        }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color="black"
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ ...Fonts.blackColor22Medium, marginLeft: Sizes.fixPadding + 10.0 }}>
                    Notifications
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.pageStyle}>
            {header()}
            {listData.length == 0 ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4F4' }}>
                    <Ionicons name="ios-notifications-off-outline" size={70} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.grayColor18Medium, marginTop: Sizes.fixPadding }}>
                        No Notifications
                    </Text>
                </View>
                :
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                />
            }
            <Snackbar
                style={{ position: 'absolute', bottom: -10.0, left: -10.0, right: -10.0, backgroundColor: '#333333' }}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ ...Fonts.whiteColor16Regular }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    notificationWrapStyle: {
        height: 105.0,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 2.0,
        paddingLeft: Sizes.fixPadding,
    },
    notificationIconWrapStyle: {
        height: 85.0,
        width: 85.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: 42.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageStyle: {
        backgroundColor: '#F4F4F4',
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        marginVertical: Sizes.fixPadding - 2.0,
    },
    notificationDescriptionStyle: {
        marginLeft: Sizes.fixPadding * 2.0,
        width: width - 170,
        justifyContent: 'center',
        height: 120.0,
        paddingVertical: Sizes.fixPadding + 3.0
    }
});

NotificationScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(NotificationScreen);