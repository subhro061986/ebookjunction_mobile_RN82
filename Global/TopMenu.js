import React, { Component, useState, useEffect } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Overlay from 'react-native-modal-overlay';
import Autocomplete from 'react-native-autocomplete-input';
import { UserProfile } from '../Context/Usercontext.js';
import { useAuth } from '../Context/Authcontext.js';

export const TopMenu = () => {
  const navigation = useNavigation();
  const { allActivePublisher, allActivePublisher1, sendEmail } = UserProfile();
  const { wishlistshow, authData, cartCount } = useAuth();

  const [filteredFilms, setFilteredFilms] = useState([]);
  const [modalvisibility, setmodalvisibility] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log("cart count= ", cartCount)
  }, [authData]);

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
      Alert.alert(resp.toUpperCase() + "! Admin will contact you shortly.");
    }
  }

  const findPublisher = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      // Setting the filtered film array according the query

      setFilteredFilms(
        allActivePublisher1.filter((pub) => pub.name.search(regex) >= 0)
      );
    } else {
      // If the query is null then return blank
      setFilteredFilms([]);
    }
  };

  const handleWishlist = () => {

    if (wishlistshow === false) {
      alert("Please log in first.");
    }
    else {
      navigation.navigate('wishlist');
    }
  }

  const gotoPublisher = (data) => {
    navigation.navigate('pubhome', { publisher_id: data.id })
  }

  return (
    <View style={[xStyle.topnav, {paddingTop: StatusBar.currentHeight}]}>
      <View style={xStyle.topnav_top}>
        <View>
          <Image
            source={require('../assets/images/logo_page.png')}
          />
        </View>
        <View style={[xStyle.topnavRight,{justifyContent:'flex-end'}]}>
          <TouchableOpacity onPress={joinNowModalHandler}>
            <Image
              source={require('../assets/images/sms.png')}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => handleWishlist()}
          >
            <Image
              source={require('../assets/images/heart.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('cartdetails')}
          >
            <Image
              source={require('../assets/images/shopping-cart.png')}
            />

            <View style={xStyle.cartCountNumber}>
              <Text style={xStyle.cartCountNumberText}>{cartCount}</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={xStyle.topnav_bottom}>
        {/* <TextInput style={xStyle.search_bar} onChangeText={handleInputChange} value={query} placeholder='Search by Author, Tittle, ISBN' placeholderTextColor={'#B0B6CC'}></TextInput> */}

        <View style={{
          flex: 1
        }}
        >
          <Autocomplete
            inputContainerStyle={{
              //width: '100%',
              paddingHorizontal: 20,
              backgroundColor: '#ffffff',
              borderRadius: 10,
            }}
            listContainerStyle={{
              width: '100%',
              borderRadius: 5
            }}
            autoCapitalize="none"
            autoCorrect={false}
            data={filteredFilms}
            onChangeText={(text) => findPublisher(text)}
            placeholder="Search by publisher"
            flatListProps={{
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    gotoPublisher(item);
                  }}
                  style={{
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <Text>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>

        {/* <View style={xStyle.search_pos}>
          <Image
            source={require('../assets/images/search-normal.png')}
          />
        </View> */}
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
            <Text style={xStyle.buy_join_modal_head}>Contact Us</Text>
          </View>
          <Text style={xStyle.buy_join_modal_sub_head}>Fill the form and contact us</Text>

          <View style={xStyle.buy_join_modal_body}>
            <Text style={xStyle.buy_join_modal_legend}>Name</Text>
            <View style={xStyle.buy_join_modal_input_view}>
              <TextInput
                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                placeholder="Your name"
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

    </View>
  )
}
export default TopMenu;