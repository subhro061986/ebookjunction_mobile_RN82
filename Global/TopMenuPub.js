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
import { UserProfile } from '../Context/Usercontext.js';
import Config from "../config/Config.json"
import { useAuth } from '../Context/Authcontext';
// import { UserProfile } from '../context/UserContext.js';

export const TopMenuPub = ({ route }) => {
  const navigation = useNavigation();
  // const {cartCount}=UserProfile()

  const { category_by_publisher, items, getPublishersById, publisherId, getBooksBySearchText, allActivePublisher, publisherData, sendEmail } = UserProfile()
  const { wishlistshow, authData, logOut, cartCount } = useAuth()
  const [publisherDetails, setPublisherDetails] = useState('')
  const [searchText, setSearchText] = useState('')
  // const [toggleSearch, setToggleSearch] = useState(false)
  const [publisherBooks, setPublisherBooks] = useState([])

  const [modalvisibility, setmodalvisibility] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {

  }, [authData])

  // const handleToggleSearch = () => {
  //   setToggleSearch(!toggleSearch)
  // }

  const getPubById = async () => {
    // let pubid = 0;

    // // if(location.state.publisher_id==='' || location.state.publisher_id===null || location.state.publisher_id===0 || location.state.publisher_id===undefined){
    // if (location.state === null || location.state === 'null') {
    //   pubid = publisherId
    // }
    // else {
    //   pubid = location.state.publisher_id
    // }
    const result = await getPublishersById(publisherId)
    console.log("Publisher RESULT===>", result?.data);
    setPublisherDetails(result?.data?.output)


  }
  // const goToProfile = () => {
  //   if (wishlistshow === true) {
  //     navigate('/mybookshelf', { state: { fromHome: false } })
  //   }
  //   else {
  //     navigate('/login')
  //   }
  // }
  // const gotoLogin = () => {
  //   navigate('/login')
  // }
  // const doLogout = async () => {

  //   const resp = await logOut()

  //   if (resp === "Success") {
  //     console.log('logout_response', resp)
  //     navigate("/login")
  //   }

  //   // window.location.reload()

  // }
  const gotoPublisher = (val) => {
    navigation.navigate('pubhome', { publisher_id: val.id })
  }

  const getbookByText = async (e) => {
    console.log('e', e)
    setSearchText(e)
    if (e !== "" && e !== undefined && e !== null) {
      let json = {
        searchText: e
      }
      let response = await getBooksBySearchText(json)
      if (response.statuscode === "0") {
        setPublisherBooks(response.output)
      }
      // console.log('search results', searchText)

    }
    else {
      setPublisherBooks([])
    }
  }


  const goToProductDetailsPage = (id) => {
    navigation.navigate('productdetails', { bookId: id })
  }

  const handleWishlist = () => {
    if (wishlistshow === false) {
      alert("Please log in first.");
    }
    else {
      navigation.navigate('wishlist');
    }
  }

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

  return (
    <View style={[xStyle.topnav, {paddingTop: StatusBar.currentHeight}]}>
      <View style={xStyle.topnav_top}>
        <TouchableOpacity
          style={{ width: 100 }}
          onPress={gotoPublisher}
        >
          <Image
            // source={require('../assets/images/jurisPressLogo_white.png')}
            style={{
              height: 30,
              width: 90,
              resizeMode: 'contain'
            }}
            source={{ uri: Config.API_URL + Config.PUB_IMAGES + publisherData.id + '/' + publisherData.logo }}
          />
          {/* <Text style={{color:'white'}}>{Config.API_URL + Config.PUB_IMAGES + publisherDetails.id + '/' + publisherDetails.logo}</Text> */}
        </TouchableOpacity>
        <View style={[xStyle.topnavRight,{justifyContent:'flex-end'}]}>
          <TouchableOpacity onPress={joinNowModalHandler}>
            <Image
              source={require('../assets/images/call-white.png')}
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
            style={{ position: 'relative' }}
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
        <TextInput
          style={xStyle.search_bar}
          placeholder='Search by Author, Tittle, ISBN'
          placeholderTextColor={'#B0B6CC'}
          value={searchText}
          onChangeText={(e) => getbookByText(e)}
        ></TextInput>
        <View style={xStyle.search_pos}>
          <Image
            source={require('../assets/images/search-normal.png')}
          />
        </View>
        {publisherBooks.length > 0
          && searchText.length > 0 &&

          <View
            style={{
              borderWidth: 1,
              borderColor: '#dee2e6',
              minHeight: 70,
              width: '100%',
              borderRadius: 6,
              maxHeight: 200,
              overflowY: 'auto',
              position: "absolute",
              top: 46,
              zIndex: 1,
              backgroundColor: 'white'

            }}>

            {
              publisherBooks.length > 0 &&
              publisherBooks.map((book, index) => (

                <TouchableOpacity
                  style={{
                    paddingHorizontal: '5%',
                    paddingVertical: '5%'
                  }}
                  key={index}
                  onPress={() => goToProductDetailsPage(book.id)}
                >

                  <View style={{ marginBottom: '2%' }}>
                    <Text> {book.title} </Text>
                  </View>
                  <View style={{ marginBottom: '2%' }}>
                    <Text>ISBN13: {book.isbn13}</Text>
                  </View>
                  <Text>Author: {book.authors}</Text>

                </TouchableOpacity>
              ))
            }

          </View>

        }
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
export default TopMenuPub;