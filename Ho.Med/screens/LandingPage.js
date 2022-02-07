import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { Sizes } from "../constant/styles";

import { withNavigation } from "react-navigation";


class LandingPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to our application</Text>

        <ImageBackground
          source={require("../assets/images/landing_prev_ui.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          
        </ImageBackground>
        <Text style={styles.text}> </Text>

        {this.exploreButton()}
      </View>
    );
  }

  exploreButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.push("AppIntroSlider");
        }}
        activeOpacity={0.9}
        style={styles.exploreButton}
      >
        <Text style={styles.explore}> Explore</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#c6dee4",
  },
  backgroundImage: {
    width:350,
    height: 300,
    marginTop: 100,
    marginLeft:20,
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    color: "#283e76",
    marginTop: 100,
    alignSelf:'center'

  },
  
  explore: {
    color: "#c7e2eb",
  },
  exploreButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2aada7",
    paddingVertical: 10,
    marginHorizontal: 155,
    borderRadius: 20,
    marginTop:20,
  },
});
LandingPage.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};
export default withNavigation(LandingPage);
