import React, { Component, useEffect, useState } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {useAuth} from '../Context/Authcontext.js';
import { useNavigation } from '@react-navigation/native';
// import { UserProfile } from '../context/UserContext.js';

export const TopBar = () => {
    const { wishlistshow, authData, cartCount } = useAuth()
    useEffect(() => {
        console.log("cart count from top bar = ", cartCount)
    }, [authData]);

    const navigation = useNavigation();

    return (
        <>
            <View style={xStyle.topbar}>
                <View style={[xStyle.topnav_top, { justifyContent: 'flex-end' }]}>
                    {/* <TouchableOpacity style={xStyle.topbar_back_btn}>
                        <Image
                            source={require('../assets/images/backbtn.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <Image
                            source={require('../assets/images/user_small.png')}
                            height={30}
                            width={30}
                        />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity
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
            <View style={xStyle.topbar_bottom}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('mybookshelf')}
                >
                    <Image
                        source={require('../assets/images/bookshelf.png')}
                        style={xStyle.topbar_btn_mb}
                    />
                    <Text style={xStyle.topbar_btn_txt}>Bookshelf</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('wishlist')}
                >
                    <Image
                        source={require('../assets/images/wishnav.png')}
                        style={xStyle.topbar_btn_mb}
                    />
                    <Text style={xStyle.topbar_btn_txt}>Wishlist</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('myorders')}
                >
                    <Image
                        source={require('../assets/images/orders.png')}
                        style={xStyle.topbar_btn_mb}
                    />
                    <Text style={xStyle.topbar_btn_txt}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('profile')}

                >
                    <Image
                        source={require('../assets/images/profnav.png')}
                        style={xStyle.topbar_btn_mb}
                    />
                    <Text style={xStyle.topbar_btn_txt}>Profile</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
export default TopBar;