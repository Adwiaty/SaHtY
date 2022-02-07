import {React,useContext,useEffect ,useState}  from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    TextInput,
    StatusBar,
  } from "react-native";
  import { Colors, Fonts, Sizes } from "../constant/styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Feedback({ navigation }) {
  const [userId , setUserId] = useState(null)
  const [feedback , setFeedback] = useState(null)
    
  useEffect(() => {
    AsyncStorage.getItem('key').then((d)=>{setUserId(JSON.parse(d).id)})
    console.log(userId)
  },[])


  const addFeedback = async () =>  {
    console.log("hhhhhhhhhtrerere")
    const id = userId 
    const feed = feedback
    try {
      console.log("hhhhhhhhffrfrht")
      await axios.post("http://192.168.11.207:5000/feed/addfeedback" , {userId : id , content :feed})
      console.log("hhhhhhhhht")
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
    <StatusBar backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
      <View>
        <TouchableOpacity
        onPress={() =>{addFeedback()
          navigation.navigate("navbar")
        }}
          activeOpacity={0.9}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor19Medium }}>Send feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
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
  continueButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    borderRadius: 20,
    marginTop: Sizes.fixPadding * 4.0,
  },
})