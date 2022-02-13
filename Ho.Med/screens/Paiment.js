// import { StatusBar } from 'expo-status-bar';
import {Linking} from 'react-native';
// import { Colors, Sizes } from "../constant/styles";
import axios from 'axios'
// // import Stripee from "./Stripee"
// import { WebView } from "react-native-webview";
// import { useHistory } from 'react-router-dom';

// // import { StripeProvider } from "@stripe/stripe-react-native";
// export default function Paiment({}) {

// const konnect = ()=>{
//   axios.post("http://192.168.43.184:5000/user/konnect",{}).then(({data})=>{
//     // history.push("https://www.google.com/")
//    Linking.openURL(data.payUrl);
//     //  window.location.href(data.payUrl)
//     console.log("hahahahahaha",data.payUrl);
//   })
// }

//   return (
//      <View >
//         <TouchableOpacity
//           activeOpacity={0.9}
//         onPress={()=>konnect()}
//         >
//           <Text >online payment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.9}
//         >
//           <Text >pay on the delevery</Text>
//         </TouchableOpacity>
//       </View>
//   )
// }


import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, BackHandler, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Dialog } from "react-native-paper";
import { TransitionPresets } from 'react-navigation-stack';

const { width } = Dimensions.get('screen');

class PaymentScreen extends Component {
   constructor(props){
       super(props)

   }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        currentPaymentMethodIndex: 2,
        showSuccessDialog: false,
    }
    konnect = ()=>{
           axios.post("http://192.168.1.9:5000/user/konnect",this.props.route.params).then(({data})=>{
             // history.push("https://www.google.com/")
            Linking.openURL(data.payUrl);
             //  window.location.href(data.payUrl)
             console.log("hahahahahaha",data.payUrl);
          })
         }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                    >
                        {this.paymentMethod({
                            icon: require('../assets/images/payment_icon/cash_on_delivery.png'),
                            paymentType: 'Payer à la livraison',
                            index: 1,
                        })}
                        
                        {this.paymentMethod({
                            icon: require('../assets/images/payment_icon/card.png'),
                            paymentType: 'Carte',
                            index: 3,
                        })}
                        
                        
                    </ScrollView>
                    {this.payButton()}
                </View>
                {this.successDialog()}
            </SafeAreaView>
        )
    }

    successDialog() {
        return (
            <Dialog
                visible={this.state.showSuccessDialog}
                style={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <View style={styles.successIconWrapStyle}>
                        <MaterialIcons name="done" size={40} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor18Medium, marginTop: Sizes.fixPadding + 10.0 }}>
                    Votre commande a bien été reçue!
                    </Text>
                </View>
            </Dialog>
        )
    }

    payButton() {
        return (
            <View style={styles.payButtonOuterWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                       this.konnect()
                    }
                    }
                    style={styles.payButtonWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor19Medium }}>
                    Payer
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    paymentMethod({ icon, paymentType, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentPaymentMethodIndex: index })}
                style={{
                    borderColor: this.state.currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.paymentMethodWrapStyle
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{
                            width: 55.0,
                            height: 55.0,
                        }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={1} style={{
                        ...Fonts.primaryColor18Medium,
                        marginLeft: Sizes.fixPadding,
                        width: width / 2.2,
                    }}>
                        {paymentType}
                    </Text>
                </View>
                <View style={{
                    borderColor: this.state.currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.radioButtonStyle
                }}>
                    {
                        this.state.currentPaymentMethodIndex == index ?
                            <View style={{
                                width: 12.0,
                                height: 12.0,
                                borderRadius: 6.0,
                                backgroundColor: Colors.primaryColor
                            }}>
                            </View> : null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ ...Fonts.whiteColor19Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                Choisissez l'option de paiement
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        flexDirection: 'row',
        height: 56.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
    },
    paymentMethodWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    payButtonOuterWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#ECECEC',
        borderTopWidth: 1.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    payButtonWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        width: '100%'
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 100,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.,
        alignSelf: 'center',
    },
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payableAmountWrapStyle: {
        backgroundColor: '#F8F3EC',
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    }
})

PaymentScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(PaymentScreen);
