import React, { Component, useState, useEffect } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import Overlay from 'react-native-modal-overlay';
import { useAuth } from '../Context/Authcontext.js';
import { ScrollView } from 'react-native-gesture-handler';
import { UserProfile } from '../Context/Usercontext.js';
import Config from "../config/Config.json"

export const Footer = () => {

  const navigation = useNavigation();
  const route = useRoute();
  // console.log(route.name);
  const { logIn, logOut, authData, forgot_password, Registration } = useAuth()
  const { category_by_publisher, items, allActivePublisher, categoryByPublisherList } = UserProfile()

  const [logInText, setLogInText] = useState('');

  const [logInModalvisibility, setLogInModalvisibility] = useState(false);
  const [signUpModalvisibility, setSignUpModalvisibility] = useState(false);
  const [forgotPasswordModalvisibility, setForotPasswordModalvisibility] = useState(false);
  const [publisherModalvisibility, setPublisherModalvisibility] = useState(false);
  const [categoryModalvisibility, setCategoryModalvisibility] = useState(false);

  // Log in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Register User
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');

  const [secureText, setSecureText] = useState(true);
  const [showProfileIcon, setShowProfileIcon] = useState(true);
  const [forgotEmail, setForgotEmail] = useState('');

  useEffect(() => {

  }, [authData]);

  useEffect(() => {
    if (authData === '' || authData === null || authData === undefined) {
      setLogInText('Login');
      setShowProfileIcon(false);
    }
    else {
      setLogInText("Logout");
      setShowProfileIcon(true);
    }
  }, [authData])

  const logInModalHandler = () => {

    if (authData === '' || authData === null || authData === undefined) {
      setLogInModalvisibility(true);
      setSignUpModalvisibility(false);
    }
    else {

      doLogout();
    }
  }

  const logInBackButtonHandler = () => {
    setLogInModalvisibility(false);
  }

  const signUpModalHandler = () => {
    setSignUpModalvisibility(true);
    setLogInModalvisibility(false);
  }

  const signUpBackButtonHandler = () => {
    setSignUpModalvisibility(false);
  }

  const forgotPasswordModalHandler = () => {
    setForotPasswordModalvisibility(true)
    setSignUpModalvisibility(false);
    setLogInModalvisibility(false);
  }

  const forgotPasswordBackButtonHandler = () => {
    setForotPasswordModalvisibility(false);
  }

  const publisherModalHandler = () => {
    setPublisherModalvisibility(true);
  }

  const publisherBackButtonHandler = () => {
    setPublisherModalvisibility(false);
  }

  const categoryModalHandler = () => {
    setCategoryModalvisibility(true);
  }

  const cateoryBackButtonHandler = () => {
    setCategoryModalvisibility(false);
  }

  const getCatgegoryData = (data) => {
    // console.log("data : ", data.id);
    navigation.navigate('categorydetails',
      { category_id: data.id }
    )
    setCategoryModalvisibility(false);
  }

  const get_pub_data = (pub_id) => {
    navigation.navigate('pubhome', { publisher_id: pub_id })
    setPublisherModalvisibility(false);
  }

  const doLogin = async () => {
    // console.log('Email : ', email);
    // console.log('pass : ', password);
    // if (email === '' && password === '') {
    //   // setEmailError('Please enter email')
    //   // setPasswordError('Please enter password')
    // }
    // else if (email === '') {
    //   // setEmailError('Please enter email')
    //   // setPasswordError('')
    // }
    // else if (password === '') {
    //   // setPasswordError('Please enter password')
    //   // setEmailError('')
    // }

    // else {
    let sendLoginData = {
      email: email,
      password: password
    }
    setLogInModalvisibility(false);
    setSignUpModalvisibility(false);
    const resp = await logIn(sendLoginData) // API CALL
    if (resp?.status === 200) {
      navigation.navigate('mybookshelf');
    }
    else {
      Alert.alert("Log in failed!");
    }

    // }

  }

  const doLogout = async () => {
    setLogInModalvisibility(false);
    setSignUpModalvisibility(false);
    const resp = await logOut();
    if (resp === "Success") {
      // console.log('logout_response', resp);
      navigation.navigate("home");
      Alert.alert("Logged out successfully");
    }
  }

  const user_registration = async () => {
    var json = {
      email: signUpEmail,
      // password: signUpPassword,
      contactno: phone,
      name: userName
    }
    const resp = await Registration(json)
    console.log('reg_resp', resp)

    if (resp === undefined || resp === null || resp === '') {
      // ** change it as needed
      console.log('registraion resp not obtained')
    }
    else {
      if (resp.statuscode === '0') {
        // let prof_img = resp.output['profileimage'] !== null ? resp.output['profileimage'] : profile
        Alert.alert("Registered successfully!")
        // setProfilePic(prof_img)
        setSignUpModalvisibility(false);
        setLogInModalvisibility(false);
        navigation.navigate("home"); // ask sir for this nav route
      }

      else {
        // setEmailError('Account already exist with this email!')
        Alert.alert('Account already exist with this email!')
      }
    }
  }


  const do_registration = () => {
    user_registration();
    // if (username === '' && password === '' && email === '' && phone === '') {
    //     setUserNameError('Please enter username')
    //     setPhoneError('Please enter phone number')
    //     setPasswordError('Please enter password')
    //     setEmailError('Please enter email')
    // }
    // else if (username === '') {
    //     setUserNameError('Please enter username')
    //     setPhoneError('')
    //     setPasswordError('')
    //     setEmailError('')
    // }
    // else if (password === '') {
    //     setPasswordError('Please enter password')
    //     setPhoneError('')
    //     setUserNameError('')
    //     setEmailError('')
    // }
    // else if (email === '') {
    //     setEmailError('Please enter email')
    //     setPhoneError('')
    //     setUserNameError('')
    //     setPasswordError('')
    // }
    // else if (phone === '') {
    //     setEmailError('')
    //     setPhoneError('Please enter phone number')
    //     setUserNameError('')
    //     setPasswordError('')
    // }
    // else {
    // user_registration()
    // }
  }
  const sendEmail = async () => {
    setLogInModalvisibility(false);
    setSignUpModalvisibility(false);
    setForotPasswordModalvisibility(false);
    if (forgotEmail !== "") {
      const args = {
        "email": forgotEmail
      };
      const resp = await forgot_password(args);
      Alert.alert('Message', resp, [
        {
          text: 'OK', onPress: () => {
            setForgotEmail('')
          }
        },
      ]);
    }
    else {
      Alert.alert('Message', "Email should not be blank", [
        {
          text: 'OK', onPress: () => {
            setForgotEmail('')
          }
        },
      ]);
    }
  }
  return (
    <>
      <View style={xStyle.bottomnav}>
        <TouchableOpacity
          style={xStyle.footerBtn}
          onPress={() => navigation.navigate('home')}
        >
          <Image
            source={require('../assets/images/home.png')}
          />
          <Text style={xStyle.footerIconText}>
            Home
          </Text>
        </TouchableOpacity>
        {
          route.name === 'home'
            || route.name === 'profile'
            || route.name === 'wishlist'
            || route.name === 'myorders'
            || route.name === 'mybookshelf'
            ? (
              <TouchableOpacity
                style={xStyle.footerBtn}
                // onPress={() => navigation.navigate('pubhome')}
                onPress={publisherModalHandler}
              >
                <Image
                  source={require('../assets/images/publisher.png')}
                />
                <Text style={xStyle.footerIconText}>
                  Publisher
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={xStyle.footerBtn}
                // onPress={() => navigation.navigate('pubhome')}
                onPress={categoryModalHandler}
              >
                <Image
                  source={require('../assets/images/categoryicon.png')}
                />
                <Text style={xStyle.footerIconText}>
                  Category
                </Text>
              </TouchableOpacity>
            )
        }
        {
          showProfileIcon && (
            <TouchableOpacity
              style={xStyle.footerBtn}
              onPress={() => navigation.navigate('profile')}
            >
              <Image
                source={require('../assets/images/profile.png')}
              />
              <Text style={xStyle.footerIconText}>
                My Profile
              </Text>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity style={xStyle.footerBtn} onPress={logInModalHandler}>
          <Image
            source={require('../assets/images/login.png')}
          />
          <Text style={xStyle.footerIconText}>
            {logInText}
          </Text>
        </TouchableOpacity>
      </View>

      {/* --------LOG IN MODAL------- */}

      <View>
        <Overlay
          // animationType={ZoomIn}
          // transparent={true}
          visible={logInModalvisibility}
          // // isVisible={modalvisibility}
          // onRequestClose={backbuttonhandler}
          // hasBackdrop={true}
          // backdropColor={'black'}
          // // statusBarTranslucent={true}
          // backdropOpacity={0.5}
          onClose={logInBackButtonHandler}
          closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
          childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
        >
          <TouchableOpacity
            style={xStyle.buy_join_modal_cross}
            onPress={logInBackButtonHandler}
          >
            <Image
              source={require('../assets/images/close-circle.png')}
            />
          </TouchableOpacity>
          <View style={xStyle.buy_join_modal_head_view}>
            <Text style={xStyle.buy_join_modal_head}>Log In</Text>
          </View>
          <Text style={xStyle.buy_join_modal_sub_head}>
            Enter your enail and password to log in
          </Text>

          <View style={xStyle.logInModalBody}>
            <Text style={xStyle.buy_join_modal_legend}>Email</Text>
            <View style={xStyle.buy_join_modal_input_view}>
              <TextInput
                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
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
            <Text style={xStyle.buy_join_modal_legend}>Password</Text>
            <View style={xStyle.buy_join_modal_input_view}>
              <TextInput
                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                placeholder='Your password'
                placeholderTextColor={'#7B8890'}
                value={password}
                onChangeText={(e) => setPassword(e)}
                secureTextEntry={secureText}
              />
              <TouchableOpacity
                style={xStyle.buy_join_modal_input_icon}
                onPress={() => {
                  if (secureText === true) {
                    setSecureText(false);
                  }
                  else {
                    setSecureText(true);
                  }
                }}
              >
                {
                  secureText === true ? (
                    <Image
                      source={require('../assets/images/eye-slash.png')}
                    />
                  ) : (
                    <Image
                      source={require('../assets/images/eye-open.png')}
                    />
                  )
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={xStyle.forgotPasswordView}
              onPress={forgotPasswordModalHandler}
            >
              <Text style={xStyle.forgotPasswordTxt}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={xStyle.logInBtn} onPress={doLogin}>
            <Text style={[xStyle.logInBtnText]}>Sign In</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={xStyle.signInWithGoogleBtn}>
            <Text style={[xStyle.signInWithGoogleBtnTxt]}>Sign in with </Text>
            <Image
              source={require('../assets/images/google.png')}
            />
          </TouchableOpacity> */}
          <View style={xStyle.logInFooter}>
            <Text style={xStyle.logInFooterTxt}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              style={xStyle.forgotPasswordView}
              onPress={signUpModalHandler}
            >
              <Text style={xStyle.forgotPasswordTxt}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      </View>

      {/* --------SIGN UP MODAL------- */}

      <View>
        <Overlay
          // animationType={ZoomIn}
          // transparent={true}
          visible={signUpModalvisibility}
          // // isVisible={modalvisibility}
          // onRequestClose={backbuttonhandler}
          // hasBackdrop={true}
          // backdropColor={'black'}
          // // statusBarTranslucent={true}
          // backdropOpacity={0.5}
          onClose={signUpBackButtonHandler}
          closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
          childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
        >
          <TouchableOpacity
            style={xStyle.buy_join_modal_cross}
            onPress={signUpBackButtonHandler}
          >
            <Image
              source={require('../assets/images/close-circle.png')}
            />
          </TouchableOpacity>
          <View style={xStyle.buy_join_modal_head_view}>
            <Text style={xStyle.buy_join_modal_head}>Sign Up</Text>
          </View>
          <Text style={xStyle.buy_join_modal_sub_head}>
            Experience the most efficient way of reading.
          </Text>

          <View style={xStyle.signUpModalBody}>
            <Text style={xStyle.buy_join_modal_legend}>Name</Text>
            <View style={xStyle.buy_join_modal_input_view}>
              <TextInput
                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                placeholder="Your name"
                placeholderTextColor={'#7B8890'}
                value={userName}
                onChangeText={(e) => setUserName(e)}
              />
              <Image
                source={require('../assets/images/profile-circle.png')}
                style={xStyle.buy_join_modal_input_icon}
              />
            </View>
            <Text style={xStyle.buy_join_modal_legend}>Email</Text>
            <View style={xStyle.buy_join_modal_input_view}>
              <TextInput
                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                placeholder='Your email address'
                placeholderTextColor={'#7B8890'}
                value={signUpEmail}
                onChangeText={(e) => setSignUpEmail(e)}
              />
              <Image
                source={require('../assets/images/smsbox.png')}
                style={xStyle.buy_join_modal_input_icon}
              />
            </View>
            <Text style={xStyle.buy_join_modal_legend}>Phone no</Text>
            <View style={xStyle.buy_join_modal_input_view}>
              <TextInput
                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                placeholder='Your phone number'
                placeholderTextColor={'#7B8890'}
                value={phone}
                onChangeText={(e) => setPhone(e)}
                keyboardType='numeric'
              />
              <Image
                source={require('../assets/images/call.png')}
                style={xStyle.buy_join_modal_input_icon}
              />
            </View>
            {/* <Text style={xStyle.buy_join_modal_legend}>Password</Text>
            <View style={xStyle.buy_join_modal_input_view}>
              <TextInput
                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                placeholder='Your password'
                placeholderTextColor={'#7B8890'}
                value={signUpPassword}
                onChangeText={(e) => setSignUpPassword(e)}
                secureTextEntry={secureText}
              />
              <TouchableOpacity
                style={xStyle.buy_join_modal_input_icon}
                onPress={() => {
                  if (secureText === true) {
                    setSecureText(false);
                  }
                  else {
                    setSecureText(true);
                  }
                }}
              >
                {
                  secureText === true ? (
                    <Image
                      source={require('../assets/images/eye-slash.png')}
                    />
                  ) : (
                    <Image
                      source={require('../assets/images/eye-open.png')}
                    />
                  )
                }
              </TouchableOpacity>
            </View> */}
          </View>
          <TouchableOpacity style={xStyle.logInBtn} onPress={do_registration}>
            <Text style={[xStyle.logInBtnText]}>Sign Up</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={xStyle.signInWithGoogleBtn}>
            <Text style={[xStyle.signInWithGoogleBtnTxt]}>Sign up with </Text>
            <Image
              source={require('../assets/images/google.png')}
            />
          </TouchableOpacity> */}
          <View style={xStyle.signUpFooter}>
            <Text style={xStyle.logInFooterTxt}>
              I have already account!
            </Text>
            <TouchableOpacity
              style={xStyle.forgotPasswordView}
              onPress={logInModalHandler}
            >
              <Text style={xStyle.forgotPasswordTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      </View>

      {/* --------FORGOT PASSWORD MODAL------- */}

      <View>
        <Overlay
          // animationType={ZoomIn}
          // transparent={true}
          visible={forgotPasswordModalvisibility}
          // // isVisible={modalvisibility}
          // onRequestClose={backbuttonhandler}
          // hasBackdrop={true}
          // backdropColor={'black'}
          // // statusBarTranslucent={true}
          // backdropOpacity={0.5}
          onClose={forgotPasswordBackButtonHandler}
          closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
          childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
        >
          <TouchableOpacity
            style={xStyle.buy_join_modal_cross}
            onPress={forgotPasswordBackButtonHandler}
          >
            <Image
              source={require('../assets/images/close-circle.png')}
            />
          </TouchableOpacity>
          <View style={xStyle.buy_join_modal_head_view}>
            <Text style={xStyle.buy_join_modal_head}>Forget Password</Text>
          </View>

          <View style={xStyle.logInModalBody}>
            <Text style={xStyle.buy_join_modal_legend}>Your Registered Email</Text>
            <View style={xStyle.buy_join_modal_input_view}>
              <TextInput
                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                placeholder='Your registered email address'
                placeholderTextColor={'#7B8890'}
                value={forgotEmail}
                onChangeText={(e) => setForgotEmail(e)}
              />
              {/* <Image
                source={require('../assets/images/smsbox.png')}
                style={xStyle.buy_join_modal_input_icon}
              /> */}
            </View>
          </View>
          <TouchableOpacity style={[xStyle.logInBtn,{paddingHorizontal:10,width:190, paddingVertical:15}]}
            onPress={sendEmail}
          >
            <Text style={[xStyle.logInBtnText]}>Send Request</Text>
          </TouchableOpacity>

          <View style={xStyle.logInFooter}>

          </View>
        </Overlay>
      </View>

      {/* --------PUBLISHER LIST MODAL------- */}

      <View>
        <Overlay
          // animationType={ZoomIn}
          // transparent={true}
          visible={publisherModalvisibility}
          // // isVisible={modalvisibility}
          // onRequestClose={backbuttonhandler}
          // hasBackdrop={true}
          // backdropColor={'black'}
          // // statusBarTranslucent={true}
          // backdropOpacity={0.5}
          onClose={publisherBackButtonHandler}
          closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
          childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
        >
          <TouchableOpacity
            style={xStyle.buy_join_modal_cross}
            onPress={publisherBackButtonHandler}
          >
            <Image
              source={require('../assets/images/close-circle.png')}
            />
          </TouchableOpacity>
          <View style={xStyle.buy_join_modal_head_view}>
            <Text style={xStyle.buy_join_modal_head}>Publishers</Text>
          </View>


          <ScrollView>
            <View style={xStyle.list_modal_view}>

              {allActivePublisher.map((data, index) => (
                data.isactive === 1 &&
                <TouchableOpacity
                  style={xStyle.list_modal_card_view}
                  key={index}
                  onPress={() => { get_pub_data(data.id) }}
                >
                  <View style={xStyle.list_modal_card}>
                    <Image
                      // source={require('../assets/images/demoPubLogo.png')}
                      source={{ uri: Config.API_URL + Config.PUB_IMAGES + data.id + '/' + data.logo }}
                      style={xStyle.list_modal_icon}
                    // style={{resizeMode:'contain'}}
                    />
                  </View>
                  <Text style={xStyle.list_modal_legend}>{data.name}</Text>
                </TouchableOpacity>
              ))}



            </View>
          </ScrollView>

        </Overlay>
      </View>

      {/* --------CATEGORY LIST MODAL------- */}

      <View>
        <Overlay
          // animationType={ZoomIn}
          // transparent={true}
          visible={categoryModalvisibility}
          // // isVisible={modalvisibility}
          // onRequestClose={backbuttonhandler}
          // hasBackdrop={true}
          // backdropColor={'black'}
          // // statusBarTranslucent={true}
          // backdropOpacity={0.5}
          onClose={cateoryBackButtonHandler}
          closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
          childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
        >
          <TouchableOpacity
            style={xStyle.buy_join_modal_cross}
            onPress={cateoryBackButtonHandler}
          >
            <Image
              source={require('../assets/images/close-circle.png')}
            />
          </TouchableOpacity>
          <View style={xStyle.buy_join_modal_head_view}>
            <Text style={xStyle.buy_join_modal_head}>Select Category</Text>
          </View>
          <ScrollView>
            <View style={xStyle.list_modal_view}>
              {
                categoryByPublisherList.map((data, index) => (
                  <TouchableOpacity
                    style={[xStyle.list_modal_card_view, { alignItems: 'center' }]}
                    key={index}
                    onPress={() => getCatgegoryData(data)}
                  >
                    <View style={[xStyle.list_modal_card, { width: 50, height: 50, alignItems: 'center' }]}>
                      <Image
                        source={require('../assets/images/categoryimg.png')}
                        // width={90}
                        style={[xStyle.list_modal_icon, { height: 25, width: 25 }]}
                      // style={{resizeMode:'contain'}}
                      />
                    </View>
                    <Text style={xStyle.list_modal_legend}>{data.name}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          </ScrollView>
        </Overlay>
      </View>
    </>
  )
}
export default Footer;