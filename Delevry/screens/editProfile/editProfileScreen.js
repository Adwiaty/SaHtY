import React, { useState } from "react";
import { Text, View, StatusBar, Image, TouchableOpacity, BackHandler, TextInput, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Feather } from '@expo/vector-icons';
import { Dialog } from "react-native-paper";
import { Dimensions } from "react-native";
import { BottomSheet } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';
import { Component } from "react";
import { withNavigation } from "react-navigation";

const { width } = Dimensions.get("screen");

class EditProfileScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };

    render() {
        return (
            <EditProfile navigation={this.props.navigation} />
        )
    }
}

const EditProfile = ({ navigation }) => {

    const [fullNameDialog, setFullnameDialog] = useState(false);
    const [fullName, setFullName] = useState('John Doe');
    const [changeText, setChangeText] = useState(fullName);

    const [passwordDialog, setPasswordDialog] = useState(false);
    const [password, setPassword] = useState('123456');
    const [changePassword, setChangePassword] = useState(password);

    const [phoneDialog, setPhoneDialog] = useState(false);
    const [phone, setPhone] = useState('123456789');
    const [changePhone, setChangePhone] = useState(phone);

    const [emialDialog, setEmailDialog] = useState(false);
    const [email, setEmail] = useState('test@abc.com');
    const [changeEmail, setChangeEmail] = useState(email);

    const [isBottomSheet, setIsBottomSheet] = useState(false);

    function backArrowAndSave() {
        return (
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons name="arrow-back-outline" size={24} color="black"
                    onPress={() => navigation.pop()}
                />

                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
                    <Text style={{ ...Fonts.blueColor18Regular }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function profilePhoto() {
        return (
            <View style={styles.profilePhotoWrapStyle}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/images/delivery_boy.jpg')}
                        style={styles.profilePhotoStyle}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setIsBottomSheet(true)}
                        style={styles.addPhotoContainerStyle}>
                        <Ionicons name="ios-add" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function formData({ title, value }) {
        return (
            <View style={styles.formDataContainerStyle}>
                <View style={{ width: width / 3.0, }}>
                    <Text style={{ ...Fonts.grayColor17Medium }}>{title}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    width: width / 1.90,
                }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...Fonts.blackColor19Medium,
                            width: width / 2.5,
                        }}>
                        {value}
                    </Text>
                    <Feather name="chevron-right" size={24} color={Colors.grayColor} />
                </View>
            </View>
        )
    }

    function editFullNameDialog() {
        return (
            <Dialog visible={fullNameDialog}
                style={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor19Medium, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change FullName
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%' }}>
                        <TextInput
                            value={changeText}
                            onChangeText={(value) => setChangeText(value)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor17Medium, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={styles.okAndCancelButtonWrapStyle}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setFullnameDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Medium }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setFullnameDialog(false)
                            setFullName(changeText)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Medium }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>
        )
    }

    function editPasswordDialog() {

        return (
            <Dialog visible={passwordDialog}
                style={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor19Medium, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Your Password
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%', }}>
                        <TextInput
                            style={{ ...Fonts.blackColor17Medium, paddingBottom: Sizes.fixPadding }}
                            placeholder='Old Password'
                            secureTextEntry={true}
                            selectionColor={Colors.primaryColor}
                        />
                    </View>
                    <View style={styles.editPasswordDialogTextFieldWrapStyle}>
                        <TextInput
                            onChangeText={(value) => setChangePassword(value)}
                            style={{ ...Fonts.blackColor17Medium, paddingBottom: Sizes.fixPadding }}
                            placeholder='New Password'
                            secureTextEntry={true}
                            selectionColor={Colors.primaryColor}
                        />
                    </View>
                    <View style={styles.editPasswordDialogTextFieldWrapStyle}>
                        <TextInput
                            style={{ ...Fonts.blackColor17Medium, paddingBottom: Sizes.fixPadding }}
                            placeholder='Confirm New Password'
                            secureTextEntry={true}
                            selectionColor={Colors.primaryColor}
                        />
                    </View>
                    <View style={styles.okAndCancelButtonWrapStyle}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setPasswordDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setPasswordDialog(false)
                                setPassword(changePassword);
                            }}
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Medium }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>

        )
    }

    function editPhoneDialog() {
        return (
            <Dialog visible={phoneDialog}
                style={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor19Medium, paddingBottom: Sizes.fixPadding * 3.0, }}>Change Phone Number</Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%' }}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            value={changePhone}
                            onChangeText={(value) => setChangePhone(value)}
                            style={{ ...Fonts.blackColor17Medium, paddingBottom: Sizes.fixPadding }}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.okAndCancelButtonWrapStyle}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setPhoneDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setPhoneDialog(false)
                            setPhone(changePhone)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Medium }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>
        )
    }

    function editEmailDialog() {
        return (
            <Dialog visible={emialDialog}
                style={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor19Medium, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Email
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%' }}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            value={changeEmail}
                            onChangeText={(value) => setChangeEmail(value)}
                            style={{ ...Fonts.blackColor17Medium, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={styles.okAndCancelButtonWrapStyle}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setEmailDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setEmailDialog(false)
                            setEmail(changeEmail)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Medium }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>
        )
    }

    function showBottomSheet() {

        return (
            <BottomSheet
                isVisible={isBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setIsBottomSheet(false)}
                    style={styles.bottomSheetStyle}
                >

                    <Text style={{ ...Fonts.blackColor19Medium, textAlign: 'center', marginBottom: Sizes.fixPadding * 2.0 }}>
                        Choose Option
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-camera" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </View>

                </TouchableOpacity>
            </BottomSheet>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrowAndSave()}
                {profilePhoto()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setFullnameDialog(true)
                        setChangeText(fullName);
                    }}
                >
                    {formData({ title: 'Full Name', value: fullName })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setPasswordDialog(true)
                        setChangePassword(password);
                    }}
                >
                    {formData({ title: 'Password', value: '******' })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setChangePhone(phone);
                        setPhoneDialog(true);
                    }}
                >
                    {formData({ title: 'Phone', value: phone })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setChangeEmail(email);
                        setEmailDialog(true)
                    }}
                >
                    {formData({ title: 'Email', value: email })}
                </TouchableOpacity>
                {editFullNameDialog()}
                {editPasswordDialog()}
                {editPhoneDialog()}
                {editEmailDialog()}
                {showBottomSheet()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backArrowAndSaveContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding,
        marginTop: Sizes.fixPadding + 5.0
    },
    addPhotoContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1.0,
        backgroundColor: '#FF9800',
        height: 25.0, width: 25.0,
        borderRadius: Sizes.fixPadding + 2.0,
        position: 'absolute',
        bottom: 5.0,
        right: 5.0,
    },
    profilePhotoWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50.0,
        marginBottom: Sizes.fixPadding * 3.0
    },
    formDataContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: Sizes.fixPadding - 5.0,
        height: 65.0,
        borderColor: '#F6F6F6',
        elevation: 1,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        borderWidth: 1.0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        alignSelf: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    okButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
    },
    profilePhotoStyle: {
        height: 100.0,
        width: 100.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
    },
    okAndCancelButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0
    },
    editPasswordDialogTextFieldWrapStyle: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.50,
        width: '100%',
        marginTop: Sizes.fixPadding,
    }
})

EditProfileScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(EditProfileScreen);