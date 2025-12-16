import React, { Component } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors.js';
// import { useAuth } from '../context/AuthContext.js';
// import { useNavigation } from '@react-navigation/native';
// import { UserProfile } from '../context/UserContext.js';

export const AboutSouthshore = () => {
  const navigation = useNavigation();
  return (
    <View style={xStyle.aboutSouthShoreView}>
      <View style={xStyle.aboutSouthShoreHeadView}>
        <Text style={xStyle.aboutSouthShoreHead}>
          A Marketplace for Academic and Professional
        </Text>
      </View>
      <Text style={xStyle.aboutSouthShoreHeadPart2}>
        E-Books
      </Text>
      <View style={xStyle.aboutSouthShoreTagView}>
        <Text style={xStyle.aboutSouthShoreTag}>
          E-books junction – a digital marketplace, where knowledge knows no bounds
        </Text>
      </View>
      <View style={xStyle.aboutSouthShoreDescPart1View}>
      <Text style={xStyle.aboutSouthShoreDescPart1}>
        E-books junction is your passport to an extensive, ever-expanding library of e-books, thoughtfully curated from esteemed publishers both in India and abroad. As an avid learner, a dedicated student, or a professional striving for success, e-books junction.is your trusted companion on your intellectual journey.
      </Text>
      </View>
      <View style={xStyle.aboutSouthShoreDescPart2View}>
      <Text style={xStyle.aboutSouthShoreDescPart2}>
        Why choose e-books? The benefits are undeniable. With e-books junction, you'll experience a world of advantages at your fingertips. First and foremost, accessibility.
      </Text>
      </View>
      
      {/* <TouchableOpacity style={xStyle.aboutSouthShoreReadMoreBtn}>
        <Text style={xStyle.aboutSouthShoreReadMore}>
          Read More
        </Text>
      </TouchableOpacity> */}
      {/* <Button 
      title="Confirm Order Button"
      onPress={() => navigation.navigate('confirmOrder')}
      /> */}
      {/* <Button 
      title="BillingAddress Button"
      onPress={() => navigation.navigate('billingAddress')}
      style= {{marginTop:'5%'}}
      /> */}
       
     
    </View>
  )
}
export default AboutSouthshore;