import React from "react";
import { View } from "react-native";
import * as Font from "expo-font";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            Roboto_Light: require("../assets/fonts/roboto/Roboto-Light.ttf"),
            Roboto_Medium: require("../assets/fonts/roboto/Roboto-Medium.ttf"),
            Roboto_Regular: require("../assets/fonts/roboto/Roboto-Regular.ttf"),

        });
        this.props.navigation.navigate('Splash');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            </View>
        )
    }
}

