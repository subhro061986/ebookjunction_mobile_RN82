import React, { Component } from 'react';
import xStyle from '../assets/css/x_style.js';
import { useNavigation } from '@react-navigation/native';

import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Button,
    TouchableOpacity
} from 'react-native'
import TopMenuPub from '../Global/TopMenuPub.js';
import FooterPub from '../Global/FooterPub.js';
import Footer from '../Global/Footer.js';

export const ConfirmOrder = () => {
    const navigation = useNavigation();

    return (
        <>
        <SafeAreaView>
            <ScrollView style={xStyle.homeBg} stickyHeaderIndices={[0]}>
            <TopMenuPub />
            <View style={xStyle.ConfirmOrderViewMain}>


            <View style={xStyle.ConfirmOrderView}>

                <Image
                    source={require('../assets/images/verify.png')}
                    style={xStyle.pub_home_best_cover}
                    height={72}
                    width={72}
                            />
                <Text style={xStyle.ConfirmOrderMainHeaderText}>Order Confirmed </Text>
                <Text style={xStyle.ConfirmOrdeSubHeaderText}>
                    Thank you for choosing <Text style={{color:'#097EDA'}}>e-book junction</Text>, your order has been confirm and you purchased item will
                    be added in your bookshelf.  </Text>
                <View style={xStyle.ConfirmOrderCard}>
                   
                    <View >
                        <TouchableOpacity style={xStyle.ConfirmOrderButton} onPress={() =>{navigation.navigate('home')}}>
                            <Text style={{color:'black'}}>Continue Shopping</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
                        
            </ScrollView>
            <Footer />
        </SafeAreaView>
        </>
    )
}
export default ConfirmOrder;