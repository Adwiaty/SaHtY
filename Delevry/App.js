import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import signinScreen from "./screens/auth/signinScreen";
import verificationScreen from "./screens/auth/verificationScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import showMapScreen from "./screens/showMap/showMapScreen";
import splashScreen from "./screens/splashScreen";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  mainFlow: createStackNavigator({
    Splash: splashScreen,
    Signin: signinScreen,
    Verification: verificationScreen,
    // BottomTabBar: bottomTabBarScreen,
    BottomTabBar: {
      screen: bottomTabBarScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Notifications: notificationsScreen,
    EditProfile: editProfileScreen,
    ShowMap: showMapScreen,
  }),
},
  {
    initialRouteName: 'Loading',
    transitionSpec: {
      duration: 400,
    },
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};

