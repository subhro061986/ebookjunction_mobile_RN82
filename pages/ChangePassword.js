import React, { Component, useState, useEffect } from 'react';
import xStyle from '../assets/css/x_style.js';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native'
import TopMenu from '../Global/TopMenu.js';
import Footer from '../Global/Footer.js';
import FooterPub from '../Global/FooterPub.js';
import { Picker } from '@react-native-picker/picker';
import { UserProfile } from '../Context/Usercontext.js';

export const ChangePassword = () => {

    const navigation = useNavigation();

    const { change_password } = UserProfile()

    const [oldPassWord, setOldPassWord] = useState('')
    const [newPassWord, setNewPassWord] = useState('')
    const [confirmPassWord, setConfirmPassWord] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [passwordVerified, setPasswordVerified] = useState(false)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMEssage] = useState('')


    // const oldPasswordHandler = (e) => {
    //     setOldPassWord(e.target.value)
    // }

    // const newPasswordHandler = (e) => {
    //     let new_pass = e.target.value
    //     setNewPassWord(e.target.value)
    //     // let pass_verify=validatePassword(new_pass)
    //     // setPasswordVerified(pass_verify)
    // }

    // const confirmPasswordHandler = (e) => {
    //     setConfirmPassWord(e.target.value)
    // }

    const saveData = async () => {
        let data = {
            password: oldPassWord,
            newpassword: newPassWord
        }
        if (newPassWord === confirmPassWord) {
            const response = await change_password(data)
            console.log(response)
            alert("Password Changed Successfully");
            navigation.navigate('profile')
        }
        else{
            alert("New Password and Confirm Password do not Match");
        }

    }




    return (
        <SafeAreaView>

            <ScrollView style={xStyle.homeBg} stickyHeaderIndices={[0]}>
                <TopMenu />
                <View style={xStyle.BillingAddressViewMain}>
                    <Text style={xStyle.BillingAddressMainHeader}>Change Password</Text>
                    <View style={[xStyle.BillingAddressCard, xStyle.mb200]}>


                        {/* Name */}
                        <Text style={xStyle.BillingAddressFormLabel}>Old Password</Text>
                        <View style={xStyle.BillingAddressViewTextInput}>
                            <TextInput
                                style={xStyle.BillingAddressFormTextInput}
                                placeholder="Old PassWord"
                                placeholderTextColor={'#7B8890'}
                                value={oldPassWord}
                                keyboardType="text"
                                onChangeText={(e) => setOldPassWord(e)}
                            />
                            {/* <Image style={xStyle.BillingAddressIcon} source={require('../assets/images/profile-circle.png')} height={24} width={24} /> */}

                        </View>

                        {/* email */}
                        <Text style={xStyle.BillingAddressFormLabel}>New Password</Text>
                        <View style={xStyle.BillingAddressViewTextInput}>
                            <TextInput
                                style={xStyle.BillingAddressFormTextInput}
                                placeholder="New Password"
                                placeholderTextColor={'#7B8890'}
                                value={newPassWord}
                                keyboardType="text"
                                onChangeText={(e) => setNewPassWord(e)}
                            />
                            {/* <Image style={xStyle.BillingAddressIcon} source={require('../assets/images/smsbox.png')} height={24} width={24} /> */}

                        </View>

                        {/* email */}
                        <Text style={xStyle.BillingAddressFormLabel}>Confirm Password</Text>
                        <View style={xStyle.BillingAddressViewTextInput}>
                            <TextInput
                                style={xStyle.BillingAddressFormTextInput}
                                placeholder="Confirm Password"
                                placeholderTextColor={'#7B8890'}
                                // value={confirmPassWord}
                                keyboardType="text"
                                onChangeText={(e) => setConfirmPassWord(e)}
                            />
                            {/* <Image style={xStyle.BillingAddressIcon} source={require('../assets/images/smsbox.png')} height={24} width={24} /> */}

                        </View>

                        <View style={xStyle.BillingAddressSaveBtnArea}>

                            <TouchableOpacity
                                style={xStyle.BillingAddressSaveBtn}
                                onPress={saveData}
                            >
                                <Text style={xStyle.BillingAddressBtnText}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <View style={xStyle.BillingAddressApplyCouponCard}>

                    </View> */}
                </View>

            </ScrollView >
            <Footer />

        </SafeAreaView>
    )
}

export default ChangePassword;