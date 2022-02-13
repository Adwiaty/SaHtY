import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import { withNavigation } from "react-navigation";


const slides=[

    {
        key:1,
        title:"La mise en route est facile", 
        text:"créer un compte pour transférer votre ordonnance existante",
        
        image: require("../assets/images/pharmacy_prev_ui.png"),
        imageStyle:{width:"80%",height:"60%",marginLeft:"10%",marginTop:"25%"},
       
        
    },

    {
      key:2,
      title:"Avec nos services ",
      text:"Vos médicaments à portée de main. À tout moment, partout où vous avez besoin",
      image: require("../assets/images/key2_prev_ui.png"), 
      imageStyle:{width:"80%",height:"60%",marginLeft:"10%",marginTop:"20%"},
      
    },
    {
      key:3,
      title:"Parce que nous tenons à vous",
      text:" nous vous informons lorsque vous devez prendre vos médicamentss",
      image: require("../assets/images/key3_prev_ui.png"), 
      imageStyle:{width:"80%",height:"60%",marginLeft:"10%",marginTop:"20%"}
    },

    {
      key:4,
      title:"Votre sécurité est notre priorité.",
      text:"  Nous vous assurons la livraison pour vous faire gagner un temps précieux ",
      image: require("../assets/images/delivery-man_prev_ui.png"),
      },

]

class AppIntro extends Component {
    
       state = {
            showRealApp: false,
           
          }         
    _renderItem = ({ item }) => {
        return (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      }
      _renderNextButton = () => {
        return (
          <View style={styles.rightTextWrapper}>
            <Text style={styles.next}>Next</Text>
          </View>
        );
      };
    
      _renderDoneButton = () => {
        return (
         
          <View>
            <Text style={styles.next}>Done</Text>
          </View>
        );
      };
      _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
        this.props.navigation.push("registerScreen")
      }

      render() {   
        if (this.state.showRealApp) {
            return <AppIntro />;
          } else {
            return <AppIntroSlider renderItem={this._renderItem} data={slides} renderDoneButton={this._renderDoneButton} renderNextButton={this._renderNextButton} onDone={this._onDone} />;
           }
    }
}
const styles = StyleSheet.create({
  text  :{
    color:"#10857f",
    fontSize:20,
    
    alignSelf: "center",

    //fontFamily: require('../assets/fonts/mukta/Mukta-Regular.ttf'),
   
  },
  title:{
    color:"#10857f",
    fontWeight:"bold",
    fontSize:25,

  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  image: {
    marginVertical: 10,
  },
  next:{
    color:"#10857f",
  },
  doneButton:{
    color:"#10857f",
  }

})
AppIntro.navigationOptions = () => {
    return {
      header: () => null,
      ...TransitionPresets.SlideFromRightIOS,
    };
  };
  export default withNavigation(AppIntro);