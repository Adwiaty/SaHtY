import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Footer";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// moment().format('LT');

export default function ReminderScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [remaind, setRemaind] = useState([
    {
      userId: "61fa345287d1a053bc957974",
      userMed: [
        { medname: "Panadol", time: [1, 0, 1] },
        { medname: "Doliprane", time: [1, 1, 0] },
      ],
    },
  ]);
  const [userRem, setUserRem] = useState({
    userId: "",
    userMed: [{ medname: "", time: [0, 0, 0] }],
  });
  const [userId, setUserId] = useState({ username: "" });
  const [medAt8AM, setMedAt8AM] = useState(null);
  const [medAt12AM, setMedAt12AM] = useState(null);
  const [medAt8PM, setMedAt8PM] = useState(null);
  var count = 0;

  useEffect(() => {
    AsyncStorage.getItem("key").then((d) => {
      setUserId(JSON.parse(d));
    });
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    sendMesaage(expoPushToken, `your will receive your orfer soon and your reminder has been setup ${medAt8AM} `);
    userMed();
    setMedsTime();
    remaindMe();
  }, [expoPushToken, userId]);

  const userMed = () => {
    for (var i = 0; i < remaind.length; i++) {
      if (remaind[i].userId === userId.id) {
        setUserRem(remaind[i]);
      }
    }
    console.log(userRem);
  };

  const setMedsTime = () => {
    var med_At_8AM = "";
    var med_At_12AM = "";
    var med_At_8PM = "";
    for (var i = 0; i < userRem.userMed.length; i++) {
      if (userRem.userMed[i].time[0] == 1) {
        if (i === userRem.userMed.length - 1) {
          med_At_8AM += userRem.userMed[i].medname;
        } else {
          med_At_8AM += userRem.userMed[i].medname + " , ";
        }
      }
      if (userRem.userMed[i].time[1] == 1) {
        if (i === userRem.userMed.length - 1) {
          med_At_12AM += userRem.userMed[i].medname;
        } else {
          med_At_12AM += userRem.userMed[i].medname + " , ";
        }
      }
      if (userRem.userMed[i].time[2] == 1) {
        if (i === userRem.userMed.length - 1) {
          med_At_8APM += userRem.userMed[i].medname;
        } else {
          med_At_8PM += userRem.userMed[i].medname;
        }
      }
    }
    setMedAt8AM(med_At_8AM);
    setMedAt12AM(med_At_12AM);
    setMedAt8PM(med_At_8PM);
  };

  const remaindMe = () => {
    console.log("working");
    console.log(medAt8AM);
    console.log(medAt12AM);
    console.log(medAt8PM);
    if (moment().format("LT") === "8:00 AM") {
      if (medAt8AM !== null && medAt8AM !== "") {
        sendMesaage(expoPushToken, `take your med(s) of 8:00 AM ${medAt8AM} `);
      }
    }
    if (moment().format("LT") === "12:00 PM") {
      if (medAt12AM !== null && medAt12AM !== "") {
        sendMesaage(
          expoPushToken,
          `take your med(s) of 12:00 AM ${medAt12AM} `
        );
      }
    }
    if (moment().format("LT") === "8:00 PM") {
      if (medAt8PM !== null && medAt8PM !== "") {
        sendMesaage(expoPushToken, `take your med(s) of 8:00 PM ${medAt8PM} `);
      }
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const sendMesaage = (token, message) => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: "Ho-Med",
        body: message,
        data: { data: "BK201" },
        _displayInForeground: true,
      }),
    });
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 25 }}> Hi {userId.username} !!</Text>
      <Text style={{ fontSize: 25 }}> this is your daily Reminder</Text>
      {medAt8AM !== "" && medAt8AM !== null ? (
        <View style={styles.buttonContainer}>
          <Text>You have {medAt8AM.split(",")[0]} at 8:00 AM</Text>
        </View>
      ) : null}
      
      {medAt8AM !== "" && medAt8AM !== null ? (
        <View style={styles.buttonContainer}>
          <Text>You have {medAt8AM.split(",")[1]} at 8:00 AM</Text>
        </View>
      ) : null}
      {medAt12AM !== "" ? (
        <View style={styles.buttonContainer}>
          <Text>You have {medAt12AM} at 12:00 PM</Text>
        </View>
      ) : null}
      {medAt8PM !== "" ? (
        <View style={styles.buttonContainer}>
          <Text>You have {medAt8PM} at 8:00 PM</Text>
        </View>
      ) : null}
      <StatusBar style="auto" />
      <View style={{ marginTop:100 }}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 60,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#10857F",
  },
});