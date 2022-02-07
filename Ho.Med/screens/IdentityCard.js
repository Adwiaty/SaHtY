import React, { Component } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  BackHandler,
  Text,
  Alert,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TransitionPresets } from "react-navigation-stack";
import * as ImagePicker from "expo-image-picker";
import Dialog from "react-native-dialog";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
const { width, height } = Dimensions.get("screen");

class IdentityCard extends Component {
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  handleBackButton = () => {
    this.props.navigation.pop();
    return true;
  };

  state = {
    uploadPrescriptionModal: true,
    validPrescriptionModal: false,
    prescriptionsList: [],
    deleteDialog: false,
    currentPrescriptionId: "",
    image:'',
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <StatusBar backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {this.header()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
          >
            {this.requestForUpload()}
            {this.uploadMorePrescriptionButton()}
            {this.state.prescriptionsList.length != 0 ? (
              <View>
                {this.prescriptionImages()}
                {this.deletePrescriptionDialog()}
              </View>
            ) : null}
          </ScrollView>
          {this.continueButton()}
          {this.chooseFromCameraOrGalleryBox()}
        </View>
      </SafeAreaView>
    );
  }



  deletePrescriptionDialog() {
    return (
      <Dialog.Container
        visible={this.state.deleteDialog}
        contentStyle={styles.deleteDialogWrapStyle}
        headerStyle={{ margin: 0.0 }}
      >
        <Text
          style={{
            ...Fonts.blackColor19Medium,
            paddingTop: Sizes.fixPadding - 5.0,
            paddingBottom: Sizes.fixPadding + 10.0,
          }}
        >
          Delete IdentityCard image?
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.setState({ deleteDialog: false })}
            style={styles.noButtonStyle}
          >
            <Text style={{ ...Fonts.primaryColor18Medium }}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.removePrescription();
              this.setState({ deleteDialog: false });
            }}
            style={styles.yesButtonStyle}
          >
            <Text style={{ ...Fonts.whiteColor18Medium }}>Yes</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    );
  }



  prescriptionImages() {
    return (
      <FlatList
        horizontal
        data={this.state.prescriptionsList}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              width: 140,
              height: 175,
              marginRight: Sizes.fixPadding * 2.0,
              marginTop:30
            }}
          >
            <Image
              source={{ uri: item.url }}
              style={{ width: 140, height: 175 }}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                this.setState({
                  currentPrescriptionId: item.id,
                  deleteDialog: true,
                });
              }}
              style={styles.prescriptionDeleteButtonStyle}
            >
              <MaterialIcons name="close" size={20} color={Colors.whiteColor} />
              <Text
                style={{
                  marginLeft: Sizes.fixPadding - 5.0,
                  ...Fonts.whiteColor15Regular,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }

  removePrescription() {
    let filterArray = this.state.prescriptionsList.filter((val, i) => {
      if (val.id !== this.state.currentPrescriptionId) {
        return val;
      }
    });
    this.setState({ prescriptionsList: filterArray });
  }


  pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      let newDataImg = this.state.prescriptionsList;
      let item = {
        id: Date.now(),
        url: result.uri,
      };
      newDataImg.push(item);
      this.setState({ prescriptionsList: newDataImg });
      this.setState({ image: result.uri })
      
        let base64Img = `data:image/jpg;base64,${result.base64}`
        let apiUrl = 'https://api.cloudinary.com/v1_1/ben-arous/image/upload';
    
        let data = {
          "file": base64Img,
          "upload_preset": "lsom30en",
        }
  
        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
            let data = await r.json()
            console.log(data)
            return data.secure_url
      }).catch(err=>console.log(err))
    }
  };

 

  pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
       
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
    })

    if (!result.cancelled) {
        let newDataImg = this.state.prescriptionsList;
        let item = {
            id: Date.now(),
            url: result.uri,
        };
        console.log('ggggggggg',result);
        newDataImg.push(item);
        this.setState({ prescriptionsList: newDataImg });
        this.setState({ image: result.uri })
      
        let base64Img = `data:image/jpg;base64,${result.base64}`
        
        let apiUrl = 'https://api.cloudinary.com/v1_1/ben-arous/image/upload';
    
        let data = {
          "file": base64Img,
          "upload_preset": "lsom30en",
        }
  
        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
            let data = await r.json()
            console.log(data.secure_url)
            return data.secure_url
      }).catch(err=>console.log(err))
    }
}

  chooseFromCameraOrGalleryBox() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.uploadPrescriptionModal}
      >
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.50)",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.chooseFromCameraOrGalleryBoxStyle}>
              <View style={styles.uploadPrescriptionModalHeaderStyle}>
                <Text style={{ ...Fonts.primaryColor20Medium }}>
                  Upload IdentityCard
                </Text>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={Colors.primaryColor}
                  onPress={() =>
                    this.setState({ uploadPrescriptionModal: false })
                  }
                />
              </View>
              <View style={styles.cameraAndGalleryButtonWrapStyle}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.setState({ uploadPrescriptionModal: false });
                    this.pickImageFromCamera();
                  }}
                  style={{
                    ...styles.cameraAndGalleryButtonStyle,
                    marginRight: Sizes.fixPadding,
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={24}
                    color={Colors.primaryColor}
                  />
                  <Text
                    style={{
                      marginLeft: Sizes.fixPadding,
                      ...Fonts.primaryColor19Medium,
                    }}
                  >
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.setState({ uploadPrescriptionModal: false });
                    this.pickImageFromGallery();
                  }}
                  style={{
                    ...styles.cameraAndGalleryButtonStyle,
                    marginLeft: Sizes.fixPadding,
                  }}
                >
                  <MaterialIcons
                    name="photo-album"
                    size={24}
                    color={Colors.primaryColor}
                  />
                  <Text
                    style={{
                      marginLeft: Sizes.fixPadding,
                      ...Fonts.primaryColor19Medium,
                    }}
                  >
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  continueButton() {
    return (

        <View style={styles.continueButtonWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            this.state.prescriptionsList.length != 0
            ?  this.props.navigation.push('Camera')
            
            
            :  Alert.alert("hint", "You must Upload your IdentityCard")
          }
          style={styles.continueButtonStyle}
        >
         
          <Text style={{ ...Fonts.whiteColor19Medium }}>Upload prescription</Text>
        </TouchableOpacity>
        
         </View>
    );
  }


  uploadMorePrescriptionButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.setState({ uploadPrescriptionModal: true })}
        style={styles.uploadMorePrescriptionButtonStyle}
      >
        <Text style={{ ...Fonts.primaryColor19Medium }}>
           Another image of your IdentityCard
        </Text>
      </TouchableOpacity>
    );
  }

  requestForUpload() {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: Sizes.fixPadding * 2.0,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/icons/icon_7.png")}
          style={{ width: 30.0, height: 30.0 }}
          resizeMode="contain"
        />
        <Text
          style={{
            width: width - 85,
            paddingTop: Sizes.fixPadding,
            lineHeight: 22.0,
            marginLeft: Sizes.fixPadding,
            ...Fonts.primaryColor18Medium,
          }}
        >
          Please upload Images of your IdentityCard
        </Text>
      </View>
    );
  }

  header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        
          <Text
            style={{
              width: width / 1.7,
              marginLeft: Sizes.fixPadding + 90.0,
              ...Fonts.whiteColor19Medium,
            }}
          >
            Upload IdentityCard
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
         
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.push("Cart")}
          >
           
          
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primaryColor,
    height: 56.0,
    paddingLeft: Sizes.fixPadding * 2.0,
    paddingRight: Sizes.fixPadding,
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
  uploadMorePrescriptionButtonStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  cameraAndGalleryButtonWrapStyle: {
    backgroundColor: Colors.bodyBackColor,
    flexDirection: "row",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 4.0,
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
  },
  cameraAndGalleryButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    flex: 1,
  },
  chooseFromCameraOrGalleryBoxStyle: {
    width: width - 20.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
  },
  uploadPrescriptionModalHeaderStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "space-between",
  },
  noButtonStyle: {
    backgroundColor: "#E0E0E0",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    flex: 1.0,
    marginRight: Sizes.fixPadding,
  },
  yesButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    flex: 1.0,
    marginLeft: Sizes.fixPadding,
  },
  deleteDialogWrapStyle: {
    width: width - 80.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  doctorImageStyle: {
    width: 80.0,
    height: 80.0,
    borderRadius: 40.0,
    borderColor: "rgba(0, 150, 136, 0.5)",
    borderWidth: 1.0,
    overflow: "hidden",
  },
  contactInfoWrapStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
  },
  prescriptionDeleteButtonStyle: {
    position: "absolute",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    backgroundColor: Colors.blackColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding - 5.0,
  },
  okGotItButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
  },
});

IdentityCard.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};

export default withNavigation(IdentityCard);





