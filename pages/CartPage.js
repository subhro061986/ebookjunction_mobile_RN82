import React, { Component, useState, useEffect } from 'react';
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
    Alert
} from 'react-native';

import TopMenuPub from '../Global/TopMenuPub.js';
import FooterPub from '../Global/FooterPub.js';
import Footer from '../Global/Footer.js';
import { useAuth } from '../Context/Authcontext.js';
import Config from "../config/Config.json"
import TopMenu from '../Global/TopMenu.js';

export const CartPage = ({ route, navigation }) => {
    const {
        authData,
        getCartData,
        cartItems,
        cartCount,
        remove_cart_item,
        removeBookFromState,
        clearCartStorage,
        uuid } = useAuth()
    const [subtotal, setSubTotal] = useState(0)

    useEffect(() => {
        // clearCartStorage()

        if (cartCount == 0) {
            setSubTotal(0)
        }
        else {
            findSubtotal()

        }
        console.log("cart items= ", cartItems)
    }, [cartCount])

    const findSubtotal = () => {
        let subtotal = 0;
        if (cartItems.length > 0) {
            cartItems.map((data, index) => {
                subtotal = subtotal + data.price
            })

            console.log("subtotal function=", subtotal)
            setSubTotal(subtotal)

        } else {
            setSubTotal(0)
        }

    }

    const proceedToCheckout = () => {
        if (authData === '' || authData === null || authData === undefined) {
            Alert.alert("Please Login to Buy!")
        }
        else {
            navigation.navigate("billingAddress", { buynow: 0 })

        }
    }
    const removeCartItems = async (item) => {

        console.log("Data to be removed= ", cartItems)
        if (item["bookid"] === undefined)
            item.bookid = item.id
        item.deviceid = uuid
        // check before login
        if (authData === '' || authData === null || authData === undefined) {

            console.log("item to be removed= ", item)
            removeBookFromState()
        }
        // after login
        else {
            const response = await remove_cart_item(item, 0)
            console.log("response after removal= ", response)
        }
    }
    return (
        <SafeAreaView>
            <ScrollView style={xStyle.cartPageBodyBg} stickyHeaderIndices={[0]}>
                <TopMenu />
                <View style={xStyle.cartPageHeaderView}>
                    <Text style={xStyle.cartPageHeader}>
                        My Cart
                    </Text>
                    <Text style={xStyle.cartPageHeaderResults}>
                        {cartCount} items added to the list
                    </Text>
                </View>
                <View style={xStyle.cartPageBooksMainDiv}>
                    {
                        cartItems.map((data, index) => (

                            <View style={xStyle.pub_home_best_card} key={index}>
                                {/* <Text style={{color:'black'}}> {data.image }</Text> */}
                                <Image
                                    source={{ uri: data.image }}

                                    style={xStyle.pub_home_best_cover}
                                    height={134}
                                    width={138}
                                />
                                <View style={xStyle.pub_home_best_card_col2}>
                                    <View style={xStyle.pub_home_best_card_col2_top}>
                                        <View>
                                            <Text style={xStyle.pub_home_best_card_title}>{data.title.length > 15 ? data.title.substring(0, 15) + ".." : data.title}</Text>
                                            <View style={xStyle.pub_home_card_author_view}>
                                                <Text style={xStyle.pub_home_card_author}>Author: <Text style={xStyle.pub_home_card_author_name}>{data.authors.length > 15 ? data.authors.substring(0, 15) + ".." : data.authors}</Text></Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => removeCartItems(data)}>
                                            <Image
                                                source={require('../assets/images/close-circle-thin.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={xStyle.pub_home_best_card_col2_bottom}>
                                        <View>
                                            <Text style={xStyle.pub_home_best_card_price}>
                                                ₹{data.price}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))
                    }


                </View>

                <View style={xStyle.cartPageOrderSummaryView}>
                    {cartCount > 0 ? (
                        <View style={xStyle.cartPageOrderSummaryHeaderView}>
                            <Text style={[xStyle.cartPageHeader, { fontSize: 20 }]}>Order Summary</Text>
                        </View>
                    ) : (
                        <View style={xStyle.cartPageOrderSummaryHeaderView}>
                            <Text style={[xStyle.cartPageHeader, { fontSize: 20 }]}>Your cart is empty</Text>
                        </View>
                    )}
                    <View style={xStyle.cartPageOrderSummaryBody}>
                        {/* <View style={xStyle.cartPageOrderSummaryBodyItems}>
                            <Text style={xStyle.cartPageOrderSummaryBodyItemsLabelText}>Subtotal</Text>
                            <Text style={xStyle.cartPageOrderSummaryBodyItemsValueText}>₹ {subtotal} </Text>
                        </View> */}
                        {/* <View style={xStyle.cartPageOrderSummaryBodyItems}>
                            <Text style={xStyle.cartPageOrderSummaryBodyItemsLabelText}>GST</Text>
                            <Text style={xStyle.cartPageOrderSummaryBodyItemsValueText}>5%</Text>
                        </View> */}
                    </View>
                    {cartCount > 0 &&
                        <View style={[xStyle.cartPageOrderSummaryTotal, xStyle.cartPageOrderSummaryBodyItems]}>
                            <Text style={xStyle.cartPageOrderSummaryBodyItemsValueText}>Total</Text>
                            <Text style={xStyle.cartPageOrderSummaryBodyItemsValueText}>₹ {subtotal} </Text>
                        </View>
                    }
                    <View >
                        {
                            cartCount > 0 &&
                            // <TouchableOpacity style={[xStyle.cartPageOrderSummaryCheckoutBtn, { marginVertical: '5%' }]} onPress={() => proceedToCheckout()}>
                            //     <Text style={xStyle.cartPageOrderSummaryCheckoutBtnTxT}>Checkout</Text>
                            // </TouchableOpacity>
                            <TouchableOpacity style={[xStyle.howToSouthShoreJoinNowBtn, {marginBottom:0}]} onPress={() => proceedToCheckout()}>
                                <Text style={xStyle.howToSouthShoreJoinNowBtnText}>Checkout</Text>
                            </TouchableOpacity>

                        }
                        {/* <TouchableOpacity style={xStyle.cartPageOrderSummaryCancelBtn} onPress={() => navigation.navigate("home")}>
                            <Text style={xStyle.cartPageOrderSummaryCancelBtnTxt}>Continue Shopping</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[xStyle.howToSouthShoreJoinNowBtn, {backgroundColor:'white', borderWidth: 0.5, borderColor: '#26252C', marginTop:'8%', paddingHorizontal:0}]} onPress={() => navigation.navigate("home")}>
                            <Text style={[xStyle.howToSouthShoreJoinNowBtnText, {fontWeight: '600',fontSize: 16,color: '#26252C'}]}>Continue Shopping</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
            <Footer />
        </SafeAreaView >
    )
}
export default CartPage;