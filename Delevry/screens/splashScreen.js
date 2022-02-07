import React, { Component } from "react";
import { View, SafeAreaView, StatusBar, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes } from "../constant/styles";
import { Bounce } from 'react-native-animated-spinkit';

class SplashScreen extends Component {

    render() {

        setTimeout(() => {
            this.props.navigation.navigate('Signin')
        }, 3000)

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/images/delivery.png')}
                        style={{
                            height: 150.0,
                            width: 220.0,
                            marginBottom: Sizes.fixPadding * 5.0
                        }}
                        resizeMode="contain"
                    />
                    <Bounce size={50} color={Colors.primaryColor} />
                </View>
            </SafeAreaView>
        )
    }
}

SplashScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SplashScreen);