import React, { Component } from "react";
import styled from "styled-components";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  BackHandler,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";

import { MaterialIcons } from "@expo/vector-icons";
import { TransitionPresets } from "react-navigation-stack";
import IntlPhoneInput from "react-native-intl-phone-input";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./CredentialsContext";

class RegisterScreen extends Component {
  // static contextType = CredentialsContext
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  handleBackButton = () => {
    this.props.navigation.pop();
    return true;
  };

  state = {
    fullName: "",
    password: "",
    username: "",
    emailAddress: "",
    PhoneNumber: "",
    typemsg: "",
    address: "",
    message: "",
    credentials: null,
    verifNum1: "",
    verifNum2: "",
    verifNum3: "",
    verifNum4: "",
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
        <StatusBar backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {this.backArrow()}
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.appLogo()}
            {this.registerText()}
            {this.fullNameTextField()}
            {this.userNameTextField()}
            {this.emailAddressTextField()}
            {this.phoneNumberTextField()}
            {this.passwordTextField()}
            {this.addressTextField()}
            {this.continueButton()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // persistLogin(credentials=this.state.credentials){
  //   AsyncStorage.setItem('key',JSON.stringify(credentials))
  //   .then(()=>{
  //     this.handlemsg('okkkkkkkkkk')
  //     this.context.setStored(credentials)
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //     this.handlemsg('Persisting login failed')
  //   })
  // }

  getVerificationNumber = async () => {
    var num = this.state.PhoneNumber.phoneNumber;
    console.log("kkkkkkkkkkkkkkk", num);
    try {
      let response = await axios.post("http://192.168.43.184:5000/", {
        number: num,
      });
      this.setState({ verifNum1: response.data.num1 });
      this.setState({ verifNum2: response.data.num2 });
      this.setState({ verifNum3: response.data.num3 });
      this.setState({ verifNum4: response.data.num4 });
    } catch (error) {
      console.log(error);
    }
  };

  backArrow() {
    return (
      <MaterialIcons
        name="arrow-back"
        size={24}
        color="black"
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}
        onPress={() => this.props.navigation.pop()}
      />
    );
  }

  phoneNumberTextField() {
    return (
      <IntlPhoneInput
        onChangeText={(text) => {
          this.setState({ PhoneNumber: text });
        }}
        defaultCountry="TN"
        containerStyle={styles.textFieldStyle}
        dialCodeTextStyle={{
          ...Fonts.blackColor17Medium,
          marginLeft: Sizes.fixPadding - 5.0,
        }}
        phoneInputStyle={{
          flex: 1,
          marginLeft: Sizes.fixPadding,
          ...Fonts.blackColor17Medium,
        }}
        placeholder="PhoneNumber"
      />
    );
  }

  emailAddressTextField() {
    return (
      <TextInput
        placeholder="Email Address"
        value={this.state.emailAddress}
        onChangeText={(text) => this.setState({ emailAddress: text })}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
    );
  }

  passwordTextField() {
    return (
      <TextInput
        placeholder="Password"
        value={this.state.password}
        onChangeText={(text) => this.setState({ password: text })}
        secureTextEntry={true}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
    );
  }

  fullNameTextField() {
    return (
      <TextInput
        placeholder="Full Name"
        value={this.state.fullName}
        onChangeText={(text) => this.setState({ fullName: text })}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
    );
  }
  userNameTextField() {
    return (
      <TextInput
        placeholder="username"
        value={this.state.username}
        onChangeText={(text) => this.setState({ username: text })}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
    );
  }
  addressTextField() {
    return (
      <TextInput
        placeholder="address"
        value={this.state.address}
        onChangeText={(text) => this.setState({ address: text })}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
    );
  }
  handlemsg(message, typemsg = "FAILED") {
    this.setState({ message: message, typemsg: typemsg });
  }
  registerText() {
    return (
      <Text
        style={{
          marginBottom: Sizes.fixPadding + 10.0,
          ...Fonts.primaryColor18Medium,
          textAlign: "center",
        }}
      >
        Join our family
      </Text>
    );
  }
  register() {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", this.state.message);
    this.handlemsg("", "FAILED");
    if (
      this.state.username == "" ||
      this.state.password == "" ||
      this.state.fullName == "" ||
      this.state.address == "" ||
      this.state.PhoneNumber == "" ||
      this.state.emailAddress == ""
    ) {
      this.handlemsg("Please fill all the fields");
    }
    const url = "http://192.168.43.184:5000/users/register",
      data = {
        username: this.state.username,
        password: this.state.password,
        fullName: this.state.fullName,
        address: this.state.address,
        PhoneNumber: this.state.PhoneNumber.phoneNumber,
        emailAddress: this.state.emailAddress,
        connected: true,
      };

    console.log(
      "bbbbbbbbbbbbbbbbbbbbbb",
      this.state.message,
      "ccccccccccccccc",
      data
    );
    if (this.state.message !== "Please fill all the fields") {
      axios
        .post(url, data)
        .then((res) => {
          const result = res.data;
          const { success, msg } = result;
          this.setState({ credentials: result.user });
          console.log("jjjjjjjjjjjjj", this.state.credentials);
          if (success !== true) {
            if (this.state.message !== "Please fill all the fields") {
              this.handlemsg(msg);
            }
          } else {
            if (this.state.message !== "Please fill all the fields") {
              this.handlemsg(`Welcome To Our Family ✅`, "SUCCESS");
              this.getVerificationNumber();
              setTimeout(() => {
                this.props.navigation.push("verification", {
                  num1: this.state.verifNum1,
                  num2: this.state.verifNum2,
                  num3: this.state.verifNum3,
                  num4: this.state.verifNum4,
                  credentials: this.state.credentials,
                });
              }, 2000);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (this.state.message !== "Please fill all the fields") {
            this.handlemsg(
              "An error occured .Check your network and try again"
            );
          }
        });
    }
  }

  continueButton() {
    return (
      <View>
        <MsgBox type={this.state.typemsg}>{this.state.message}</MsgBox>
        <TouchableOpacity
          onPress={() => this.register()}
          activeOpacity={0.9}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor19Medium }}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ marginLeft: 80, marginTop: 20, marginBottom: 40 }}>
          {" "}
          Already have an accout ?
          <Text
            style={{ color: "blue", textDecorationLine: "underline" }}
            onPress={() => this.props.navigation.push("login")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    );
  }

  appLogo() {
    return (
      <Image
        source={require("../assets/images/transparent-icon.png")}
         style={styles.appLogoStyle}
        resizeMode="contain"
      />
    );
  }
}

const MsgBox = styled.Text`
text-align:center;
font-size:13px;
color:${(props) => (props.type == "SUCCESS" ? "green" : "red")};
margin-bottom:-15px
margin-top:25px
`;
const styles = StyleSheet.create({
  continueButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    borderRadius: 20,
    marginTop: Sizes.fixPadding * 4.0,
  },
  appLogoStyle: {
    width: 400.0,
    height: 300.0,
    alignSelf: "center",
    marginBottom: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.0,
  },
  textFieldStyle: {
    borderColor: "rgba(0, 150, 136, 0.3)",
    borderWidth: 1.0,
    borderRadius: 20,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    height: 55.0,
    ...Fonts.primaryColor18Medium,
    marginHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    marginTop: Sizes.fixPadding * 2.0,
  },
});

RegisterScreen.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};

export default withNavigation(RegisterScreen);
