import React, { Component, useEffect, useState } from 'react';
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
    Linking,
    Modal
} from 'react-native';

export const BuyStepsPub = () => {

    return (
        <>
            <View style={xStyle.pub_home_buy_bg}>
                <View style={xStyle.buy_head_1_View}>
                    <Text style={xStyle.pub_buy_head_1}>Buy your favorite book in just 3 easy steps.</Text>
                </View>
                <Text style={xStyle.pub_buy_head_3}>Here are following <Text style={xStyle.pub_buy_head_3_sec}>steps</Text></Text>
                <ScrollView horizontal={true} style={xStyle.buy_scroll_div}>
                    <View style={xStyle.buy_card}>
                        <Image
                            source={require('../assets/images/buystep.png')}
                        />
                        <View style={xStyle.buy_card_head_view}>
                            <Text style={xStyle.buy_card_head}>Browse <Text style={xStyle.buy_card_head_sec}>E-Pub Reader</Text></Text>
                        </View>
                        <Text style={xStyle.buy_card_body}>Once you are on our platform
                            &nbsp;<Text
                                style={xStyle.buy_card_link}
                                onPress={() => Linking.openURL('http://ebooksjunction.com/')}>
                                www.ebooksjunctions.com</Text> as a customer,
                            you have the option to choosing to select based on a publisher on their webstore on
                            the platform or search / browse for books based on keywords,
                            title name, author or the ISBN number.</Text>
                    </View>
                    <View style={xStyle.buy_card}>
                        <Image
                            source={require('../assets/images/buystep2.png')}
                        />
                        <View style={xStyle.buy_card_head_view}>
                            <Text style={xStyle.buy_card_head}>Select and <Text style={xStyle.buy_card_head_sec}>Buy</Text></Text>
                        </View>
                        <Text style={xStyle.buy_card_body}>
                            Make your selection(s) across publishers, genres and add to the shopping cart, log in with your credentials and complete the purchase. You have a range of options to pay through our secure payment gateway.
                        </Text>
                    </View>
                    <View style={xStyle.buy_card}>
                        <Image
                            source={require('../assets/images/buystep3.png')}
                        />
                        <View style={xStyle.buy_card_head_view}>
                            <Text style={xStyle.buy_card_head}>Download and <Text style={xStyle.buy_card_head_sec}>Read</Text></Text>
                        </View>
                        <Text style={xStyle.buy_card_body}>
                            Once you make a purchase, the selected book(s) come to your dashboard and are available in your ‘MyBookshelf section”. As a next step download the e-book reader to your device and the book as well for you to enjoy a simple and seamless offline reading.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}
export default BuyStepsPub;