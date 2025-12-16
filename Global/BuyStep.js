import React, { Component, useEffect, useState } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Animated,
    PermissionsAndroid,
    Linking,
    Modal,
    Alert
} from 'react-native';

import Overlay from 'react-native-modal-overlay';
import { ZoomIn } from 'react-native-reanimated';
// import { useAuth } from '../context/AuthContext.js';
// import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../Context/Usercontext.js';

export const BuyStep = () => {

    const { sendEmail } = UserProfile();
    const [modalvisibility, setmodalvisibility] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {

    }, []);

    const joinNowModalHandler = () => {
        setmodalvisibility(true);

    }

    const backbuttonhandler = () => {
        setmodalvisibility(false);
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }


    const isValidPhone = (phone) => {
        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
    }

    // const handleName = (e) => {
    //   setContactUsName(e.target.value)
    // }

    // const handleEmail = (e) => {
    //   // if(!isValidEmail(e.target.value))
    //   // {
    //   //     setEmailErrorMessage('Email is invalid');

    //   // }
    //   // else{
    //   setContactUsEmail(e.target.value)
    //   //     setEmailErrorMessage('');
    //   // }
    // }

    // const handlePhNo = (e) => {
    //   // if(!isValidPhone(e.target.value)){
    //   //     setPhoneErrorMessage('Phone number is invalid');
    //   // }
    //   // else{
    //   setContactUsPhNo(e.target.value)
    //   //     setPhoneErrorMessage('')
    //   // }
    // }

    // const handleMessage = (e) => {
    //   setContactUsMessage(e.target.value)
    // }

    const toggleModal = () => {
        setMessage('')
        setEmail('')
        setPhoneNumber('')
        setName('')
        if (modalvisibility === true) {
            setmodalvisibility(false);
        }
        else {
            setmodalvisibility(true);
        }
    };

    const triggerEmail = async () => {
        if (!isValidPhone(phoneNumber)) {
            Alert.alert('Phone number is invalid!');
        }
        else if (!isValidEmail(email)) {
            Alert.alert('Email is invalid!');
        }
        else {
            let data = {
                "email": email,
                "name": name,
                "phno": phoneNumber,
                "message": message
            }
            let resp = await sendEmail(data);
            console.log("Email resp : ", resp);
            toggleModal();
            Alert.alert(resp.toUpperCase() + "!\n\nAdmin will contact you shortly.");
        }
    }

    return (
        <>
            <View style={xStyle.buy_bg}>
                <View style={xStyle.buy_head_1_View}>
                    <Text style={xStyle.buy_head_1}>Buy your favorite book in just 3 easy steps.</Text>
                </View>
                <Text style={xStyle.buy_head_2}>
                    e-booksjunction has a range of curated academic and professional e-books from leading
                    publishers both from India and internationally. We constantly increase the range of
                    titles across different genres and different publishers ensuring our
                    customers get the latest in the field.
                </Text>
                <View style={xStyle.buy_head_3_View}>
                    <Text style={xStyle.buy_head_3}>Here are following <Text style={xStyle.buy_head_3_sec}>steps</Text></Text>
                </View>
                <ScrollView horizontal={true} style={xStyle.buy_scroll_div}>
                    <View style={xStyle.buy_card}>
                        <Image
                            source={require('../assets/images/buystep.png')}
                        />
                        <View style={xStyle.buy_card_head_view}>
                            <Text style={xStyle.buy_card_head}>Browse <Text style={xStyle.buy_card_head_sec}>E-Pub Reader</Text></Text>
                        </View>
                        <Text style={xStyle.buy_card_body}>Once you are on our platform
                            &nbsp;<Text
                                style={xStyle.buy_card_link}
                                onPress={() => Linking.openURL('http://ebooksjunction.com/')}>
                                www.ebooksjunctions.com</Text> as a customer,
                            you have the option to choosing to select based on a publisher on their webstore on
                            the platform or search / browse for books based on keywords,
                            title name, author or the ISBN number.</Text>
                    </View>
                    <View style={xStyle.buy_card}>
                        <Image
                            source={require('../assets/images/buystep2.png')}
                        />
                        <View style={xStyle.buy_card_head_view}>
                            <Text style={xStyle.buy_card_head}>Select and <Text style={xStyle.buy_card_head_sec}>Buy</Text></Text>
                        </View>
                        <Text style={xStyle.buy_card_body}>
                            Make your selection(s) across publishers, genres and add to the shopping cart, log in with your credentials and complete the purchase. You have a range of options to pay through our secure payment gateway.
                        </Text>
                    </View>
                    <View style={xStyle.buy_card}>
                        <Image
                            source={require('../assets/images/buystep3.png')}
                        />
                        <View style={xStyle.buy_card_head_view}>
                            <Text style={xStyle.buy_card_head}>Download and <Text style={xStyle.buy_card_head_sec}>Read</Text></Text>
                        </View>
                        <Text style={xStyle.buy_card_body}>
                            Once you make a purchase, the selected book(s) come to your dashboard and are available in your ‘MyBookshelf section”. As a next step download the e-book reader to your device and the book as well for you to enjoy a simple and seamless offline reading.
                        </Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={xStyle.buy_join_btn} onPress={joinNowModalHandler}>
                    <Text style={xStyle.buy_join_txt}>Join Now</Text>
                </TouchableOpacity>
            </View>

            {/* --------JOIN NOW MODAL------- */}

            <View>
                <Overlay
                    // animationType={ZoomIn}
                    // transparent={true}
                    visible={modalvisibility}
                    // // isVisible={modalvisibility}
                    // onRequestClose={backbuttonhandler}
                    // hasBackdrop={true}
                    // backdropColor={'black'}
                    // // statusBarTranslucent={true}
                    // backdropOpacity={0.5}
                    onClose={backbuttonhandler}
                    closeOnTouchOutside
                    containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
                    childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
                >

                    <TouchableOpacity
                        style={xStyle.buy_join_modal_cross}
                        onPress={backbuttonhandler}
                    >
                        <Image
                            source={require('../assets/images/close-circle.png')}
                        />
                    </TouchableOpacity>
                    <View style={xStyle.buy_join_modal_head_view}>
                        <Text style={xStyle.buy_join_modal_head}>Join as Reader</Text>
                    </View>
                    <Text style={xStyle.buy_join_modal_sub_head}>Fill the form and continue to join as reader</Text>

                    <View style={xStyle.buy_join_modal_body}>
                        <Text style={xStyle.buy_join_modal_legend}>Name</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput
                                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder="Your Publisher's Name"
                                placeholderTextColor={'#7B8890'}
                                value={name}
                                onChangeText={(e) => setName(e)}
                            />
                            <Image
                                source={require('../assets/images/profile-circle.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            />
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>Email</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder='Your email address'
                                placeholderTextColor={'#7B8890'}
                                value={email}
                                onChangeText={(e) => setEmail(e)}
                            />
                            <Image
                                source={require('../assets/images/smsbox.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            />
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>Phone no</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder='Your phone number'
                                placeholderTextColor={'#7B8890'}
                                value={phoneNumber}
                                onChangeText={(e) => setPhoneNumber(e)}
                            />
                            <Image
                                source={require('../assets/images/call.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            />
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>Message</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput style={xStyle.buy_join_modal_input}
                                placeholder='Your message'
                                placeholderTextColor={'#7B8890'}
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical='top'
                                value={message}
                                onChangeText={(e) => setMessage(e)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={xStyle.howToSouthShoreJoinNowBtn} onPress={triggerEmail}>
                        <Text style={[xStyle.howToSouthShoreJoinNowBtnText, xStyle.buy_submit_font]}>Submit</Text>
                    </TouchableOpacity>
                </Overlay>
            </View>
        </>
    )
}
export default BuyStep;