import React, { Component } from 'react';
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
// import { useAuth } from '../context/AuthContext.js';
// import { useNavigation } from '@react-navigation/native';
// import { UserProfile } from '../context/UserContext.js';

export const Banner = () => {

    return (
        <>
            <ImageBackground source={require('../assets/images/banner.png')} resizeMode="cover" style={xStyle.banner}>
                <View>
                    <Text style={xStyle.intro_1}>Welcome to</Text>
                </View>
                <Text style={xStyle.intro_2}>E-Books</Text>
                <View>
                    <Text style={xStyle.intro_3}>Endless Possibilities</Text>
                </View>
                <View style={[xStyle.paddingTop10]}>
                    <Text style={xStyle.intro_4}>Shop, Read, Repeat!</Text>
                </View>
            </ImageBackground>
        </>
    )
}
export default Banner;