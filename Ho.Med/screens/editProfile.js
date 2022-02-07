import * as React from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile({ navigation }) {
  const [user, setUser] = useState({});
  const [userNameEdit, setUserNameEdit] = useState(user.username);
  const [emailEdit, setemailEdit] = useState(user.email);
  const [phoneNumberEdit, setPhoneNumberEdit] = useState(user.phoneNumber);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("key")
      .then((d) => {
        return JSON.parse(d).id;
      })
      .then((id) => {
        getUser(id);
      });
  }, []);

  const getUser = async (id) => {
    // const id = userId;
    try {
      let response = await axios.get("http://192.168.43.184:5000/user/" + id);
      console.log(response.data);
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateUser = async () => {
    const id = userId;
    const username = userNameEdit;
    const email = emailEdit;
    const phoneNumber = phoneNumberEdit;
    try {
      console.log("user updating...");
      let result = await axios.put("http://192.168.43.184:5000/user/" + id, {
        username,
        email,
        phoneNumber,
      });
    } catch (err) {
   
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          padding: Sizes.fixPadding,
          flexDirection: "column",
        }}
      >
        <View style={styles.headerInfoWrapStyle}>
          <View>
            <Text style={{ ...Fonts.whiteColor20Medium }}></Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <AntDesign
              name="check"
              size={27}
              color={Colors.whiteColor}
              onPress={() => {
                UpdateUser();
                navigation.navigate("Profile");
              }}
            />
          </View>
        </View>
        <Image
          source={require("../assets/images/logoz.png")}
          style={styles.appLogoStyle}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.header}></View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={{ color: "white" }}> Name : </Text>
              <TextInput
                style={{ fontSize: 26 }}
                onChangeText={(text) => setUserNameEdit(text)}
              >
                {user.username}
              </TextInput>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={{ color: "white" }}> Email : </Text>
              <TextInput onChangeText={(text) => setemailEdit(text)}>
                {user.email}
              </TextInput>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={{ color: "white" }}> PN : </Text>
              <TextInput
                style={{ fontSize: 26 }}
                onChangeText={(text) => setPhoneNumberEdit(text)}
              >
                {user.phoneNumber}
              </TextInput>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 450 }}>
        <Footer />
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
  header: {
    backgroundColor: "#10857F",
  
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#10857F",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",

    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    backgroundColor: "#10857F",
  },
  appLogoStyle: {
    width: 200.0,
    height: 200.0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: "center",
    // marginBottom: Sizes.fixPadding,
    // marginTop: Sizes.fixPadding * -50.0,
  },
});
