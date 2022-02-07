import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Alert } from 'react-native';
import LottieView from 'lottie-react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect ,useState} from 'react';
import React, { Component } from "react";
 export default class Aploder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      
    };
  }
   componentDidMount(){ console.log('sssssssssssssssssssssssssssssss',this.props.route.params);
    AsyncStorage.getItem('key')
    .then((d) => { this.setState({id:JSON.parse(d).id}) })
    .then(()=>{this.check()})
 
    .catch(err => console.log(err))}
     
 

    check=()=>{
        setInterval(()=>{axios.get('http://192.168.43.184:5000/check/'+this.state.id).then(({data})=>{
            console.log(data);
          if(data[0].pharmacyConfirmation){   
              this.props.navigation.push("Paiment",{money:this.props.route.params.money})
        }
      }).catch((err)=>{console.log(err);})},20000)
        
     }
     
    
render(){  
    return (

        <View style={styles.container}>
            <LottieView source={require('../assets/loading/med.json')} autoPlay />
            <Text>the confirmation takes few minutes</Text>
        </View>


    );
}}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
