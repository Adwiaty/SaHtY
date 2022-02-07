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


class ResetPassword extends Component {
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
   username : "" ,
   user : {}
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

  getUserByUsername = async () => {
    var username = this.state.username;
    console.log('kkkkkkkkkkkkkkk', username);
    try {
      let response = await axios.post("http://192.168.11.71:5000/users/username",{username: username});
          this.setState({user : response.data})
    } catch (error) {
      console.log('my errrrrrrrrrrrr',error);
    }
  };

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
        placeholder="userName"
        value={this.state.username}
        onChangeText={(text) => this.setState({ username: text })}
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
        Verification
      </Text>
    );
  }

  continueButton() {
    return (
      <View>

      <MsgBox type={this.state.typemsg}>{this.state.message}</MsgBox>
      <TouchableOpacity
      onPress={()=> {
        this.getUserByUsername()
        this.props.navigation.push("forgotPasswordVerification",{user : this.state.user})
    }}
      activeOpacity={0.9}
      style={styles.continueButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor19Medium }}>Verification</Text>
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

ResetPassword.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};

export default withNavigation(ResetPassword);
