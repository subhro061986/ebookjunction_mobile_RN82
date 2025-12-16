import React, { Component, useEffect, useState } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StatusBar
} from 'react-native';
import {useAuth} from '../Context/Authcontext.js';
import { useNavigation } from '@react-navigation/native';
// import { UserProfile } from '../context/UserContext.js';

export const TopBarReader = () => {
    const { wishlistshow,authData,cartCount } = useAuth()
    useEffect(() => {
        console.log("cart count from top bar = ", cartCount)
    }, [authData]);

    const navigation = useNavigation();

    return (
        <>
            <View style={[xStyle.topbar, {paddingTop: StatusBar.currentHeight}]}>
                <View style={[xStyle.topnav_top, { justifyContent: 'flex-start' }]}>
                    <TouchableOpacity style={xStyle.topbar_back_btn}
                        onPress={() => navigation.navigate('mybookshelf')}
                    >
                        <Image
                            source={require('../assets/images/backbtn.png')}
                        />
                    </TouchableOpacity>
                   
                    
                </View>
            </View>
            
        </>
    )
}
export default TopBarReader;