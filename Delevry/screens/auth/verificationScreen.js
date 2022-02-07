import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, BackHandler, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { Bounce } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('screen');

class VerificationScreen extends Component {

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
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.backArrow()}
                        {this.verificationInfo()}
                        {this.otpFields()}
                        {this.resendInfo()}
                        {this.submitButton()}
                    </ScrollView>
                </View>
                {this.loading()}
            </SafeAreaView>
        )
    }

    resendInfo() {
        return (
            <View style={styles.resendInfoWrapStyle}>
                <Text style={{ ...Fonts.grayColor15Medium }}>
                    Didn't receive OTP Code!
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                    Resend
                </Text>
            </View>
        )
    }

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Bounce size={40} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    otpFields() {
        return (
            <View style={styles.otpFieldsWrapStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={this.state.firstDigit}
                        style={{ ...Fonts.blackColor18Medium, paddingLeft: Sizes.fixPadding }}
                        onChangeText={(text) => {
                            this.setState({ firstDigit: text })
                            this.secondTextInput.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={this.state.secondDigit}
                        style={{ ...Fonts.blackColor18Medium, paddingLeft: Sizes.fixPadding - 3.0 }}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            this.setState({ secondDigit: text })
                            this.thirdTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor18Medium, paddingLeft: Sizes.fixPadding - 3.0 }}
                        keyboardType="numeric"
                        value={this.state.thirdDigit}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ thirdDigit: text })
                            this.forthTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor18Medium, paddingLeft: Sizes.fixPadding - 3.0 }}
                        keyboardType="numeric"
                        value={this.state.forthDigit}
                        ref={(input) => { this.forthTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ forthDigit: text })
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.setState({ isLoading: false })
                                this.props.navigation.navigate('BottomTabBar');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('BottomTabBar')}
                style={{ ...styles.submitButtonStyle }}>
                <Text style={{ ...Fonts.whiteColor18Medium }}>
                    Submit
                </Text>
            </TouchableOpacity >
        )
    }

    verificationInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.blackColor22Medium }}>
                    Verification
                </Text>
                <Text style={{ ...Fonts.grayColor15Medium, marginTop: Sizes.fixPadding }}>
                    Enter the OTP code from the phone we just sent you.
                </Text>
            </View>
        )
    }

    backArrow() {
        return (
            <MaterialIcons name="arrow-back" size={24} color="black"
                style={{ margin: Sizes.fixPadding * 2.0 }}
                onPress={() => this.props.navigation.goBack()}
            />
        )
    }
}

const styles = StyleSheet.create({
    submitButtonStyle: {
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.primaryColor,
        marginTop: Sizes.fixPadding * 3.0
    },
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldWrapStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 60,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    resendInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: Sizes.fixPadding * 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    }
})

VerificationScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(VerificationScreen);