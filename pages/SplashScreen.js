import React, { useEffect,useState } from "react";
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
  PermissionsAndroid
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useAuth } from '../Context/Authcontext';

const SplashScreen =({navigation})=> {
  
  useEffect(() => {
    getNetStatus()
    
  }, []);

  const getNetStatus=async()=>{
    // NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   console.log("Is internet reachable?", state.isInternetReachable);
    //   console.log("Details", state);
    // });
    const  getnetInfo  = await NetInfo.fetch();
    if(getnetInfo.isInternetReachable===true){
      var timer = setTimeout(()=> {
        navigation.navigate('home');
      }, 3000);
    }
    else{
      var timer = setTimeout(()=> {
        navigation.navigate('offlinebookshelf');
      }, 3000);
    }
  }
  
    return(
      <SafeAreaView style={{flex:1}}>
      <View
        style={{
          flex:1,
          alignItems:'center',
          backgroundColor:'#FFFFFF'
        }}
        >

            <View
                style={{
                alignItems:'center',
                marginVertical:'80%',
                justifyContent:'center',
                }}
              >
              <Image
                source={require('../assets/images/logo.png')}
              />
          </View>
        </View>
      </SafeAreaView>
        
    );
  
  }




export default SplashScreen;