import React, { Component } from "react";
import styled from 'styled-components'
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
  Alert,
  TouchableOpacity,
  ActivityIndicator

} from "react-native";
import {Formik} from 'formik'
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { TransitionPresets } from "react-navigation-stack";
import axios from 'axios'


class NewPassword extends Component {
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
    userPassword : "",
  };
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
        <StatusBar backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {this.backArrow()}
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.appLogo()}
            {this.usernameAddressTextField()}
            {this.continueButton()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

   UpdateUserPassword = async () => {
    const id = this.props.route.params.user._id
    const password = this.state.userPassword
    try {
      console.log("user updating...")
      let result = await axios.post("http://192.168.1.9:5000/users/password"  , {password : password , id : id})
    }
    catch (err) {
      console.log(err)
    }
  }

  backArrow() {
    return (
      <MaterialIcons
        onPress={() => this.props.navigation.push("RegisterScreen")}
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


  usernameAddressTextField() {
    return (
      <TextInput
        placeholder="new password"
        value={this.state.userPassword}
        onChangeText={(text) => this.setState({ userPassword: text })}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
    );
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
        Confirm
      </Text>
    );
  }

  continueButton() {
    return (
      <View>

      <MsgBox type={this.state.typemsg}>{this.state.message}</MsgBox>
      <TouchableOpacity
      onPress={()=> {
        this.UpdateUserPassword()
        this.props.navigation.push("login")}}
      activeOpacity={0.9}
      style={styles.continueButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor19Medium }}>Confirm</Text>
      </TouchableOpacity>
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
color:${(props)=>(props.type =='SUCCESS' ? 'green' :'red' )};
margin-bottom:-15px
margin-top:25px
`
const Line=styled.View`
height:1px;
text-align:center;
width:90%;
margin-bottom:-15px
margin-top:23px
background-color:black;
margin-vertical:40px
margin-left:20px
`
const TextLink=styled.Text`

color:blue;
justify-content:center;
align-items:center
`
 

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
    width: 200.0,
    height: 200.0,
    alignSelf: "center",
    marginBottom: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 3.0,
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

NewPassword.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};

export default withNavigation(NewPassword);
