import * as React from "react";

import {
  SafeAreaView,
    View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,

} from "react-native";
import {Picker} from '@react-native-community/picker'
import { Colors, Sizes, Fonts } from "../constant/styles";
import Footer from "./Footer";
import { WebView } from "react-native-webview";
import * as Location from 'expo-location';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function NotificationScreen({ navigation }) {
  const { errorMsg, setErrorMsg } = React.useState('')
  const [longitude, setLongitude] = React.useState('')
  const [id, setId] = React.useState('')
  const [latitude, setLatitude] = React.useState('')
  const [selectedValue, setSelectedValue] = React.useState("your location");
  const MAP =
    "https://www.google.com/maps/search/pharmacy+%C3%A0+proximit%C3%A9+de+"+selectedValue+"/@36.8700319,10.1607386,14z/data=!3m1!4b1";
  React.useEffect(() => {
    (
      Location.requestForegroundPermissionsAsync().then(({ status }) => {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      }).catch(() => { }).then(() => {
        Location.getCurrentPositionAsync({}).catch(() => { }).then((location) => {
          setLongitude(location.coords.longitude);
          setLatitude(location.coords.latitude);
        })                                          
      }).then(()=>{AsyncStorage.getItem('key').then((d)=>{setId(JSON.parse(d).id)}).catch(err=>console.log(err))})
       .catch(err => { console.log(err) })
      
      );
  
  }, []);
  const state = (x) => {
    AsyncStorage.setItem('state',x).then(()=>{navigation.navigate("Choose") }).catch(err=>console.log(err))
     }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ width: 420, height: 740 }}>
          <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue)
          axios
            .put(`http://192.168.43.184:5000/state/${id}`, { state: itemValue })
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
          }
        }
        >
          <Picker.Item label="Choose your state" value="Choose your state" />
          <Picker.Item label="Ariana" value="Ariana" />
          <Picker.Item label="Beja" value="Beja" />
          <Picker.Item label="Ben Arous" value="Ben Arous" />
          <Picker.Item label="Bizerte" value="Bizerte" />
          <Picker.Item label="Gabes" value="Gabes" />
          <Picker.Item label="Gafsa" value="Gafsa" />
          <Picker.Item label="Jendouba" value="Jendouba" />
          <Picker.Item label="Kairouan" value="Kairouan" />
          <Picker.Item label="Kasserine" value="Kasserine" />
          <Picker.Item label="Kebili" value="Kebili" />
          <Picker.Item label="Kef" value="Kef" />
          <Picker.Item label="Mahdia" value="Mahdia" />
          <Picker.Item label="Manouba" value="Manouba" />
          <Picker.Item label="Medenine" value="Medenine" />
          <Picker.Item label="Monastir" value="Monastir" />
          <Picker.Item label="Nabeul" value="Nabeul" />
          <Picker.Item label="Sfax" value="Sfax" />
          <Picker.Item label="Sidi Bouzid" value="Sidi Bouzid" />
          <Picker.Item label="Siliana" value="Siliana" />
          <Picker.Item label="Sousse" value="Sousse" />
          <Picker.Item label="Tataouine" value="Tataouine" />
          <Picker.Item label="Tozeur" value="Tozeur" />
          <Picker.Item label="Tunis" value="Tunis" />
          <Picker.Item label="Zaghouan" value="Zaghouan" />
        </Picker>
       
        <WebView source={{ uri: MAP }} onLoad={console.log("Loaded!")} />
      
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>{

            navigation.navigate("Choose")
          }
           



          }
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor19Medium }}>Next</Text>
        </TouchableOpacity>
  
        <Footer />
      </View>

      <View style={{ marginTop: 420, width: 100 }}>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerInfoWrapStyle: {
    flexDirection: "row",
    paddingLeft: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueButtonWrapStyle: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    position: "absolute",
    left: 0.0,
    right: 0.0,
    bottom: 0.0,
    borderTopColor: Colors.bodyBackColor,
    borderTopWidth: 1.0,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
  },
  cartItemCountWrapStyle: {
    position: "absolute",
    right: -8.0,
    height: 17.0,
    width: 17.0,
    borderRadius: 8.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.redColor,
    elevation: 10.0,
  },
  searchButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginTop: Sizes.fixPadding + 5.0,
  },
});