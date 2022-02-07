import * as React from "react";
import { View, StyleSheet, Button,TouchableOpacity,Text } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { SafeAreaView } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";
export default function App({ navigation }) {
  const video = React.useRef();
  const v = React.useRef();
  const [status, setStatus] = React.useState({ isPlaying: "Play" });

  React.useEffect(() => {
    video.current.playAsync();
    v.current.playAsync();
  }, []);
  return (
    <View style={styles.container}>
         <View >
              {/* <Text style={styles.text}>prescription ?</Text> */}
              
              
              </View>
         
     <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>{
            navigation.navigate("Identity")
          }
          }
        >
          <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://cdn.dribbble.com/users/1066445/screenshots/14021990/media/9bf5df6e3368a0015e23ff5230ed269a.mp4",
        }}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
        </TouchableOpacity>
      <View >
      {/* <Text style={styles.t}>No prescription ?</Text> */}
      <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>{
            navigation.navigate("navbar")
          }
          }
        >
          <Video
        ref={v}
        style={styles.v}
        source={{
          uri: "https://media.istockphoto.com/videos/modern-pharmacy-drugstore-with-shelves-full-of-packages-full-of-video-id1309257024",
        }}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
        </TouchableOpacity>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    top:-20,
    width: 420,
    height: 310,
  },
  text: {
   top:-40,
   alignSelf: "center",
   fontSize:30,

 
   },
   t: {
     
     alignSelf: "center",
     fontSize:30
     },
  v: {
       top:30,
     alignSelf: "center",
     width:800,
     height: 280,
     borderRadius:1200
   },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: 60,
  },
});