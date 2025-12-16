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
    
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Overlay from 'react-native-modal-overlay';
import FooterPub from '../Global/FooterPub.js';
import TopBar from '../Global/TopBar.js';
import Footer from '../Global/Footer.js';
import { useAuth } from '../Context/Authcontext.js';
import { UserProfile } from '../Context/Usercontext.js';
import Config from "../config/Config.json";
import RNFS from 'react-native-fs';

export const MyBookshelfOffline = ({ navigation }) => {

    const { authData ,offlineData} = useAuth()
    const [readerModalvisibility, setReaderModalvisibility] = useState(false);
    const [bookReading, setBookReading] = useState('')
    const [bookReadType, setBookReadType] = useState(0)
    const bookTypeValue = [
        {
            id: 0,
            title: 'Please select a type'
        },
        {
            id: 1,
            title: 'PDF'
        },
        {
            id: 2,
            title: 'EPUB'
        }
    ]
    console.log("OFFLINE DATA",offlineData)

    const navigateToReadScreen = async (book) => {
        console.log("Reading : ", book);
        if ((book.epdf_link !== null && book.epdf_link !== 'null') && (book.epub_link !== null && book.epub_link !== 'null')) {
            console.log("Inside both");
            setReaderModalvisibility(true);
            setBookReadType(0)
            setBookReading(book);
        }
        else if (book.epdf_link !== null || book.epdf_link !== 'null') {
            console.log("Inside pdf");
            navigation.navigate('offpdf',{epdf:book.pdfFileUri})
        }
        else if (book.epub_link !== null || book.epub_link !== 'null') {
            console.log("Inside epub");
            navigation.navigate('offepub',{epub:book.epubFileUri})

        }
        else {

        }
    }

    const handleBookReadType = (itemValue, itemIndex) => {
        setBookReadType(itemValue)
        console.log("Item val", itemValue);
        console.log("Item index", itemIndex);
        let book_type_val = itemValue;
        setReaderModalvisibility(false);
        if (book_type_val === 1) {
            // open pdf book
            if (bookReading !== null) {
                navigation.navigate('offpdf', { epdf:bookReading.pdfFileUri })
            }
        }
        else if (book_type_val === 2) {
            // open epub book
            if (bookReading !== null) {
                navigation.navigate('offepub', { epub: bookReading.epubFileUri })
            }
        }
        else {
            console.log("Selection failed")
        }

    }

    const readerModalHandler = () => {
        setReaderModalvisibility(true);
    }

    const backbuttonhandler = () => {
        setReaderModalvisibility(false);
    }

    return (
        <>
            <ScrollView style={xStyle.cartPageBodyBg}>
            
            <View style={[xStyle.cartPageHeaderView,{paddingTop: StatusBar.currentHeight}]}>
                    <Text style={xStyle.cartPageHeader}>
                        My BookShelf (Offline Mode)
                    </Text>
                    <Text style={xStyle.cartPageHeaderResults}>
                        {offlineData.length} items
                    </Text>
            </View>
            
            <View style={[
                    xStyle.cartPageBooksMainDiv,
                    { marginBottom: '50%' }
                ]}>
                    {
                        offlineData.length > 0 && offlineData.map((book, index) => (
                            <View style={[xStyle.pub_home_best_card]} key={index}>
                                <Image
                                    source={require('../assets/images/playstore.png')}
                                    style={xStyle.pub_home_best_cover}
                                    height={134}
                                    width={138}
                                />
                                <View style={xStyle.MyBookshelfMainView}>
                                    <View style={xStyle.MyBookshelfMainTextView}>
                                        <View>
                                            <Text style={xStyle.pub_home_best_card_title}>{book.title.length > 15 ? book.title.substring(0, 15) + ".." : book.title}</Text>
                                            <View style={xStyle.pub_home_card_author_view}>
                                                <Text style={[xStyle.pub_home_card_author,{marginBottom:'5%'}]}>Author:
                                                    <Text style={xStyle.pub_home_card_author_name}>{book.authors.length > 15 ? book.authors.substring(0, 15) + ".." : book.authors}</Text>
                                                </Text>
                                                <Text style={xStyle.pub_home_card_author}>Purchased:
                                                    <Text style={xStyle.pub_home_card_author_name}>{book.purchased}</Text>
                                                </Text>
                                            </View>
                                            
                                        </View>
                                        
                                    </View>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>

                                        <TouchableOpacity
                                            style={[xStyle.wishlistMoveToCartBtn, { width: '50%' }]}
                                            // onPress={() => navigation.navigate('offpdf',{epdf:book.pdfFileUri})}
                                            onPress={() => { navigateToReadScreen(book) }}
                                        >
                                            <Text style={xStyle.wishlistMoveToCartBtnTxt}>
                                                Read Now
                                            </Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>
                
            </ScrollView>
            <View>
                <Overlay
                    // animationType={ZoomIn}
                    // transparent={true}
                    visible={readerModalvisibility}
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
                        <Text style={xStyle.buy_join_modal_head}>Select Book Type</Text>
                    </View>

                    <View style={xStyle.logInModalBody}>
                        <View style={{
                            width: 200,
                            borderWidth: 1,
                            borderColor: 'grey',
                            borderRadius: 20,
                            // height: 40,
                            // padding: 10,
                        }}>
                            <Picker
                                style={{
                                    fontSize: 12,
                                    color: 'grey'
                                }}
                                selectedValue={bookReadType}
                                onValueChange={
                                    (itemValue, itemIndex) =>
                                        handleBookReadType(itemValue, itemIndex)
                                }
                            >
                                {
                                    bookTypeValue.map((data, index) => (
                                        <Picker.Item label={data.title} value={data.id} key={index} />
                                    ))
                                }
                            </Picker>
                        </View>
                    </View>
                    
                </Overlay>
            </View>
        </>
    )
}
export default MyBookshelfOffline;