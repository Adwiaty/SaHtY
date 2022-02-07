
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from "./screens/Navbar";
import Localisation from "./screens/Localisation";
import Cart from "./screens/Cart";
import React, { useState, useEffect } from 'react'
import RegisterScreen from "./screens/RegisterScreen";
import Login from "./screens/SigninScreen";
import LandingPage from "./screens/LandingPage";
import AppIntro from "./screens/AppIntro"
import Footer from "./screens/Footer";
import NotificationScreen from "./screens/Notification";
import ReminderScreen from "./screens/Reminder"
import ProfileScreen from "./screens/Profile"
import VerificationScreen from "./screens/Verification";
import AboutScreen from "./screens/About";
import Apploading from 'expo-app-loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./screens/CredentialsContext";
import EditProfile from './screens/editProfile';
import CameraScreen from './screens/camera';
import ResetPassword from './screens/ResetPassword';
import ResetPasswordVerification from './screens/ResetPasswordVerification';
import NewPassword from "./screens/NewPassword";
import Feedback from "./screens/Feedback";
import Paiment from "./screens/Paiment";
import Aploder from './screens/AppLoder';
import IdentityCard from './screens/IdentityCard';
import Choose from './screens/Choose';
const Stack = createNativeStackNavigator();




export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [stored, setStored] = useState('');

  const checkLogin = () => {
    AsyncStorage.getItem('key').then((res) => {
      if (res !== null) {
        setStored(JSON.parse(res))
      } else {
        setStored(null)
      }

    }).catch(error => console.log(error))
  }
  if (!appReady) {
    return (
      <Apploading
        startAsync={checkLogin}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  }
  return (
    <CredentialsContext.Provider value={{ stored, setStored }}>
      <CredentialsContext.Consumer>
        {({ stored }) => (
          <NavigationContainer>
            <Stack.Navigator>
              {
                stored ?
                  <>
                      <Stack.Screen
                        name="location"
                        component={Localisation}
                        options={{ headerShown: true }}
                      />
                      <Stack.Screen
                        name="Choose"
                        component={Choose}
                        options={{ headerShown: true }}
                      />
                    <Stack.Screen
                      name="navbar"
                      component={Navbar}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="cart"
                      component={Cart}
                      options={{ headerShown: true }}
                    />
                    <Stack.Screen
                      name="Notification"
                      component={NotificationScreen}
                      options={{ headerShown: true }}
                    />
                    <Stack.Screen
                      name="Reminder"
                      component={ReminderScreen}
                      options={{ headerShown: true }}
                    />
                    <Stack.Screen
                      name="About"
                      component={AboutScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Profile"
                      component={ProfileScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="feedback"
                      component={Feedback}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="editProfile"
                      component={EditProfile}
                      options={{ headerShown: false }}
                    />
                     <Stack.Screen
                      name="Paiment"
                      component={Paiment}
                      options={{ headerShown: true }}
                    />
                     <Stack.Screen
                      name="Identity"
                      component={IdentityCard}
                      options={{ headerShown: true }}
                    />
                    <Stack.Screen
                      name="Camera"
                      component={CameraScreen}
                      options={{ headerShown: true }}
                    />
                      <Stack.Screen
                      name="Aploder"
                      component={Aploder}
                      options={{ headerShown: false }}
                    />
                  </>
                  :
                  <><Stack.Screen
                    name="landingPage"
                    component={LandingPage}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="AppIntroSlider"
                    component={AppIntro}
                    options={{ headerShown: false }}
                  />
                   <Stack.Screen
                    name="forgotPasswordVerification"
                    component={ResetPasswordVerification}
                     options={{ headerShown: false}}
                    /> 
                    <Stack.Screen
                      name="registerScreen"
                      component={RegisterScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="newPassword"
                      component={NewPassword}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="forgotPassword"
                      component={ResetPassword}
                      options={{ headerShown: false}}
                    />
                    <Stack.Screen
                      name="verification"
                      component={VerificationScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="login"
                      component={Login}
                      options={{ headerShown: false }}
                    /></>
              }
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </CredentialsContext.Consumer>
    </CredentialsContext.Provider>

  );
}
