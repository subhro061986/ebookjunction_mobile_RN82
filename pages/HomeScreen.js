import React, { useEffect, useState } from "react";
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
  Modal
} from 'react-native';
import TopMenu from "../Global/TopMenu.js";
import AboutSouthshore from "../Global/AboutSouthshore.js";
import Footer from "../Global/Footer.js";
import Banner from "../Global/Banner.js";
import PubList from "../Global/PubList.js";
import BuyStep from "../Global/BuyStep.js";





import SouthshoreInnovations from "../Global/SouthshoreInnovations.js";
import HowToSouthShore from "../Global/HowToSouthShore.js";



const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    requestStoragePermission();
    //requestReadStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Ebooksjunction Storage",
          message:
            "Ebooksjunction need access of your storage ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the storage");
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // const requestReadStoragePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: "Ebooksjunction Storage",
  //         message:
  //           "Ebooksjunction need access of your storage ",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the storage");
  //     } else {
  //       console.log("Storage permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  return (
    <SafeAreaView>
      <ScrollView style={xStyle.homeBg} stickyHeaderIndices={[0]} keyboardShouldPersistTaps='always'>
        <TopMenu />
        {/* <Text>HELLO</Text> */}
        {/* <Image
          source={require('../assets/images/banner.png')}
        /> */}
        <Banner />
        {/* <Text style={styles.check}>abcd abcd</Text> */}

        <AboutSouthshore />
        <PubList />
        <HowToSouthShore />
        <BuyStep />
        <SouthshoreInnovations />
      </ScrollView>
      <Footer />

      

    </SafeAreaView>

  );

}




export default HomeScreen;

// const styles = StyleSheet.create({
//   check:{
//     //fontFamily: 'Protest Revolution'
//   }
// })