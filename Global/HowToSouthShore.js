import React, { Component, useEffect, useState } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import Overlay from 'react-native-modal-overlay';
// import { useAuth } from '../context/AuthContext.js';
// import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../Context/Usercontext.js';

export const HowToSouthShore = () => {
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
    if(modalvisibility === true){
      setmodalvisibility(false);
    }
    else{
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
      <View style={xStyle.howToSouthShoreView}>
        <View style={xStyle.howToSouthShoreHeader_View}>
          <Text style={xStyle.howToSouthShoreHeader}>
            How to Use E-Books Junction
          </Text>
        </View>
        <View style={xStyle.howToSouthShoreTagView}>
          <Text style={xStyle.howToSouthShoreTag}>
            Here are following
          </Text>
          <Text style={xStyle.howToSouthShoreTagPart2}> steps</Text>
        </View>
        <ScrollView horizontal={true}>
          <View style={xStyle.howToSouthShoreCard}>
            <Image
              source={require('../assets/images/howtosouthshore_1.png')}
            />
            <View style={xStyle.buy_card_head_view}>
              <Text style={xStyle.buy_card_head}>I am a &nbsp;
                <Text style={xStyle.buy_card_head_sec}>Publisher</Text>
              </Text>
            </View>
            <View style={xStyle.howToSouthShoreCardTag_view}>
              <Text style={xStyle.howToSouthShoreCardTag}>
                how do I sell my e-books on
                &nbsp;
                <Text style={xStyle.buy_card_link} onPress={() => Linking.openURL('http://ebooksjunction.com/')}>
                  www.ebooksjunctions.com
                </Text>
              </Text>
            </View>
            <Text style={xStyle.buy_card_body}>
              Click on the “Join now” button. There are a few details required and we will get back to you and discuss the details over a call at a time convenient to you.
            </Text>
          </View>
          <View style={xStyle.howToSouthShoreCard}>
            <Image
              source={require('../assets/images/howtosouthshore_2.png')}
            />
            <Text style={xStyle.howToSouthShoreCardHead}>Display your books</Text>
            <View style={xStyle.howToSouthShoreCardHeadSec_view}>
              <Text style={xStyle.howToSouthShoreCardHeadSec}>Your own webstore</Text>
            </View>

            <Text style={xStyle.buy_card_body}>
              After registration and completion of formalities, you as a publisher will have your own webstore on our platform to upload, display and sell your e-content. The platform also supports your custom url.
            </Text>
          </View>
          <View style={xStyle.howToSouthShoreCard}>
            <Image
              source={require('../assets/images/howtosouthshore_3.png')}
            />
            <View style={xStyle.buy_card_head_view}>
              <Text style={xStyle.buy_card_head}>Reach your <Text style={xStyle.buy_card_head_sec}>Customers</Text></Text>
            </View>

            <Text style={xStyle.buy_card_body}>
              Its simple, upload the titles and sell through the platform. Customers can search using key words and pay through the connected secure payment gateway and download the titles to read. The content is secure and can be read only through the proprietary reader of the platform.
            </Text>
          </View>
        </ScrollView>

        <TouchableOpacity style={xStyle.howToSouthShoreJoinNowBtn} onPress={joinNowModalHandler}>
          <Text style={xStyle.howToSouthShoreJoinNowBtnText}>Join Now</Text>
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
            <Text style={xStyle.buy_join_modal_head}>Join as Publisher</Text>
          </View>
          <Text style={xStyle.buy_join_modal_sub_head}>Fill the form and continue to join as publisher</Text>

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
export default HowToSouthShore;