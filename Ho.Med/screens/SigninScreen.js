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
import { Formik } from 'formik'
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { TransitionPresets } from "react-navigation-stack";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./CredentialsContext";

class SigninScreen extends Component {
  static contextType = CredentialsContext

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)

    );
    console.log('aaaa', this.context);
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
    password: "",
    username: "",
    message: '',
    typemsg: '',
    credentials: null
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
            {this.passwordTextField()}
            {this.continueButton()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  persistLogin(credentials = this.state.credentials) {
    AsyncStorage.setItem('key', JSON.stringify(credentials))
      .then(() => {
        this.handlemsg('okkkkkkkkkk')
        this.context.setStored(credentials)
      })
      .catch((error) => {
        console.log(error);
        this.handlemsg('Échec de la connexion persistante')
      })
  }


  handlemsg(message, typemsg = 'MANQUÉE') {
    this.setState({ message, typemsg })

  }


  handleLogin(username = this.state.username, password = this.state.password) {

    this.handlemsg(null);
    if (this.state.username == '' || this.state.password == '') {
      this.handlemsg("Veuillez remplir tous les champs")
    }
    const url = "http://192.168.1.17:5000/users/authenticate";
    
    axios.post(url, { username: username, password: password }).then((res) => {

      const result = res.data
      console.log(result);
      this.setState({ credentials: result.user })

      const { success } = result
      

      if (success !== true) {
       
        if (this.state.message !== 'Veuillez remplir tous les champs') {
          this.handlemsg('Informations d identification non valides saisies ')
        }
      } else  {
         
          if(result.user.banned){this.handlemsg('You have been banned ')}
          else{
            this.handlemsg(`Connecté ✅`, "SUCCÈS")
        setTimeout(() => {
          // this.props.navigation.push("navbar")
          this.persistLogin(this.state.credentials)
        }, 1500)
      }
      }

    }).catch(err => {
      console.log(err);
      if (this.state.message !== 'Veuillez remplir tous les champs') {
        this.handlemsg('Une erreur s est produite. Vérifiez votre réseau et réessayez')
      }

    })
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
        placeholder="Nom d'utilisateur"
        value={this.state.username}
        onChangeText={(text) => this.setState({ username: text })}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
    );
  }

  passwordTextField() {
    return (
      <TextInput
        placeholder="Mot de passe"
        value={this.state.password}
        onChangeText={(text) => this.setState({ password: text })}
        secureTextEntry={true}
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
        Sign In
      </Text>
    );
  }

  continueButton() {
    return (
      <View>
      <MsgBox type={this.state.typemsg}>{this.state.message}</MsgBox>
      <TouchableOpacity
      onPress={() => this.handleLogin()
      }
      activeOpacity={0.9}
      style={styles.continueButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor19Medium }}>S'identifier</Text>
      </TouchableOpacity>
      <Line/>
      <TouchableOpacity
      onPress={() => this.handleLogin()
      }
      activeOpacity={0.9}
      style={styles.continueButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor19Medium }}>Se connecter avec Google</Text>
      </TouchableOpacity>
      <Text style={{marginLeft:80,marginTop:10}}>Vous n'avez pas encore de compte ?
      <TextLink style={{textDecorationLine:'underline'}}
      onPress={()=>this.props.navigation.push("registerScreen")} >S'inscrire</TextLink></Text>
      <Text style={{marginLeft:80,marginTop:10}}>Vous avez oublié votre mot de passe ?
      <TextLink style={{textDecorationLine:'underline'}}
      onPress={()=>this.props.navigation.push("forgotPassword")} >Mot de passe oublié</TextLink></Text>
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
color:${(props) => (props.type == 'SUCCESS' ? 'green' : 'red')};
margin-bottom:-15px
margin-top:25px
`
const Line = styled.View`
height:1px;
text-align:center;
width:90%;
margin-bottom:-15px
margin-top:23px
background-color:black;
margin-vertical:40px
margin-left:20px
`
const TextLink = styled.Text`

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
    width: 400.0,
    height: 350.0,
    alignSelf: "center",
    marginBottom: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 1.0,
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

SigninScreen.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};

export default withNavigation(SigninScreen);
