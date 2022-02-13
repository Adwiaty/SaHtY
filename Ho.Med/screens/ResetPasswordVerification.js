import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    BackHandler,
} from "react-native";

import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../constant/styles";
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';
import { TransitionPresets } from "react-navigation-stack";
import { CredentialsContext } from "./CredentialsContext";
import axios from "axios";
// this.context.setStored(credentials)
class ResetPasswordVerification extends Component {
    static contextType = CredentialsContext
    constructor(props){
      super(props)
       this.state = {
            isLoading: false,
            firstDigit: '',
            secondDigit: '',
            thirdDigit: '',
            forthDigit: '',
            verifNum1 : '',
            verifNum2 : '',
            verifNum3 : '',
            verifNum4 : '',
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        console.log('88888888888888888',this.props.route.params);
        

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    componentDidMount() {
        this.getVerificationNumber()
        console.log("dffddddfdfsdfdfdfdfdfdf" ,this.props.route.params.user)
    }


    getVerificationNumber = async () => {
        try {
          let response = await axios.get("http://192.168.1.9:5000/resetPassword");
          this.setState({verifNum1 :response.data.num1});
          this.setState({verifNum2 :response.data.num2});
          this.setState({verifNum3 :response.data.num3});
          this.setState({verifNum4 :response.data.num4});
          console.log(this.state)
        } catch (error) {
          console.log(error);
        }
      };
    

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    
                    {/* {this.backArrow()} */}
                    {this.verificationInfo()}
                    {this.otpFields()}
                    {this.resendInfo()}
                    {this.continueButton()}
                </ScrollView>
                {this.loading()}
            </SafeAreaView >
        )
    }



 

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={45} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor18Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        S'il vous plaît, attendez..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ isLoading: true })
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                        if(this.state.firstDigit == this.state.verifNum1 && this.state.secondDigit == this.state.verifNum2 && this.state.thirdDigit == this.state.verifNum3 && this.state.forthDigit == this.state.verifNum4) {
   
                        this.props.navigation.navigate('newPassword',{user : this.props.route.params.user});
                        }
                        else(console.log('err'))
                    }, 2000);
                }}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor19Medium }}>
                Continuez
                </Text>
            </TouchableOpacity>
        )
    }

    resendInfo() {
        return (
            <View style={styles.resendInfoWrapStyle}>
                <Text style={{ ...Fonts.grayColor18Medium }}>
                N'a pas reçu le code otp !
                </Text>
                <Text style={{ ...Fonts.grayColor18Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                Renvoyer
                </Text>
            </View>
        )
    }

    otpFields() {
        return (
            <View style={styles.otpFieldsContentStyle}>
                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        value={this.state.firstDigit}
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.primaryColor18Medium, paddingLeft: Sizes.fixPadding ,borderRadius:20 }}
                        onChangeText={(text) => {
                            this.setState({ firstDigit: text })
                            this.secondTextInput.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        value={this.state.secondDigit}
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.primaryColor18Medium, paddingLeft: Sizes.fixPadding , borderRadius:20 }}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            this.setState({ secondDigit: text })
                            this.thirdTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.primaryColor18Medium, paddingLeft: Sizes.fixPadding , borderRadius:20 }}
                        keyboardType="numeric"
                        value={this.state.thirdDigit}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ thirdDigit: text })
                            this.forthTextInput.focus();
                        }}

                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.primaryColor18Medium, paddingLeft: Sizes.fixPadding, borderRadius:20 }}
                        keyboardType="numeric"
                        value={this.state.forthDigit}
                        ref={(input) => { this.forthTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ forthDigit: text })
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                var v=this.props.route.params
                                this.setState({ isLoading: false })
                                if(this.state.firstDigit == this.state.verifNum1 && this.state.secondDigit == this.state.verifNum2 && this.state.thirdDigit == this.state.verifNum3 && this.state.forthDigit == this.state.verifNum4) {
            
                                    this.props.navigation.navigate('newPassword',{user : this.props.route.params.user});
                                    }
                                    else (console.log('err'))
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    verificationInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 2.5,
                marginBottom: Sizes.fixPadding * 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ paddingBottom: Sizes.fixPadding, ...Fonts.primaryColor25Medium }}>
                    Verification
                </Text>
                <Text style={{
                    ...Fonts.grayColor18Medium,
                    lineHeight: 22.0,
                }}>
                    Enter the OTP code  we just sent you.
                </Text>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    otpFieldsContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldContentStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,//'rgba(128, 128, 128, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0, 150, 136, 0.3)',//Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    continueButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 3.0,
        borderRadius: 20,
        marginTop: Sizes.fixPadding * 3.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width:  - 80,
        paddingBottom: Sizes.fixPadding * 3.0,
    },
    resendInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
})

ResetPasswordVerification.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ResetPasswordVerification);