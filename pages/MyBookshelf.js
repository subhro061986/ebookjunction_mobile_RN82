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
    Dimensions,
    Alert
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyBookshelf = ({ navigation }) => {

    const { authData, storedOfflineData,offlineData } = useAuth()
    const { getBookShelf, myBookList } = UserProfile()
    const [bookReading, setBookReading] = useState('')
    const [bookReadType, setBookReadType] = useState(0)
    const [readerModalvisibility, setReaderModalvisibility] = useState(false);
    const [urifile, setFile] = useState();
    const [loadingContent, setLoadingContent] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [tempArrBooks, setTempArrBooks] = useState([]);

    const uri = Config.API_URL + Config.PUB_IMAGES

    const INITIAL_LOCATION = {
        href: '/OPS/main3.xml',
        title: 'Chapter 2 - The Carpet-Bag',
        type: 'application/xhtml+xml',
        target: 27,
        locations: {
            position: 24,
            progression: 0,
            totalProgression: 0.03392330383480826
        },
    };
    useEffect(() => {
        //clearAsync()
        //setTempArrBooks(myBookList)
    }, [authData]);
    useEffect(() => {
        
    }, [offlineData]);

    // useEffect(() => {
    //     console.log("CHANGED BOOK SHELF===>67",tempArrBooks)
    // }, [tempArrBooks])

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

    const handleBookReadType = (itemValue, itemIndex) => {
        setBookReadType(itemValue)
        let book_type_val = itemValue;
        setReaderModalvisibility(false);
        if (book_type_val === 1) {
            // open pdf book
            if (bookReading !== null) {
                navigation.navigate('pdf', { epdf: Config.API_URL + Config.PUB_IMAGES + bookReading.publisherid + "/" + bookReading.epdf_link })
            }
        }
        else if (book_type_val === 2) {
            // open epub book
            if (bookReading !== null) {
                navigation.navigate('epub', { epub: Config.API_URL + Config.PUB_IMAGES + bookReading.publisherid + "/" + bookReading.epub_link })
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
            navigation.navigate('pdf', { epdf: Config.API_URL + Config.PUB_IMAGES + book.publisherid + "/" + book.epdf_link })
        }
        else if (book.epub_link !== null || book.epub_link !== 'null') {
            console.log("Inside epub");
            navigation.navigate('epub', { epub: Config.API_URL + Config.PUB_IMAGES + book.publisherid + "/" + book.epub_link })
        }
        else {

        }
    }

    const clearAsync = () => {
        AsyncStorage.setItem("offlineData", "")
    }
    const navigateDownload = async (book,i) => {
        let index=offlineData.findIndex(data => data.id === book.id)
        if(index>-1){
            Alert.alert('Message', 'Book is already downloaded', [
                {
                  text: 'OK', onPress:null
                },
              ]);
        }
        else{
        let file = null
          // clearAsync()
        let offlineDataNew = {
            id: book.id,
            authors: book.authors,
            title: book.title,
            purchased: book.invoicedate?.split(" ")[0],
            epdf_link: book.epdf_link,
            epub_link: book.epub_link

        }

        if ((book.epdf_link !== null && book.epdf_link !== 'null') && (book.epub_link !== null && book.epub_link !== 'null')) {
            console.log("Inside both");
            file = await downloadBook(uri + book.publisherid + "/" + book.epdf_link, book.title)
            offlineDataNew.pdfFileUri = file
            file = await downloadBook(uri + book.publisherid + "/" + book.epub_link, book.title)
            offlineDataNew.epubFileUri = file

            let dwnresp = await storedOfflineData(offlineDataNew)
            //checkDownload(dwnresp)
            Alert.alert("Download Complete")
        }
        else if (book.epdf_link !== null || book.epdf_link !== 'null') {
            console.log("Inside pdf");
            file = await downloadBook(uri + book.publisherid + "/" + book.epdf_link, book.title)
            offlineDataNew.pdfFileUri = file
            offlineDataNew.epubFileUri = null
            let dwnresp = await storedOfflineData(offlineDataNew)
            //checkDownload(dwnresp)

            //Alert.alert("Download Complete")
        }
        else if (book.epub_link !== null || book.epub_link !== 'null') {
            console.log("Inside epub");
            file = await downloadBook(uri + book.publisherid + "/" + book.epub_link, book.title)
            offlineDataNew.pdfFileUri = null
            offlineDataNew.epubFileUri = file
            let dwnresp = await storedOfflineData(offlineDataNew)
            //checkDownload(dwnresp)

            //Alert.alert("Download Complete")
        }
    }
    }

    const downloadBook = async (bookURL, bookTitle) => {

        setLoadingContent(true)
        console.log('book url=', bookURL)
        let fileName = bookURL.split("/");
        let latFname = fileName[fileName.length - 1]
        console.log("FILE NAME", latFname)
        let downloadPath = `${RNFS.DocumentDirectoryPath}/` + latFname;
        let INITIAL_LOCATION = {
            href: '/OPS/main3.xml',
            title: bookTitle,
            type: 'application/xhtml+xml',
            target: 27,
            locations: {
                position: 24,
                progression: 0,
                totalProgression: 0.03392330383480826
            }
        }
        const { promise } = RNFS.downloadFile({
            fromUrl: bookURL,
            toFile: downloadPath,
            background: true,
            discretionary: true,
        });
        console.log("DOWNLOADING....")
        // wait for the download to complete
        await promise;
        setLoadingContent(false)
        //Alert.alert("Download Complete")
        let fileObj = {
            url: downloadPath,
            initialLocation: INITIAL_LOCATION,
        }


        return fileObj


    }

    // const checkDownload=() =>{
    // const checkDownload=(book,i) =>{
    //     //let index=offlineData.findIndex(data => data.id === book.id)
    //     let arr=tempArrBooks
    //     arr[i]["isDownloaded"]=true
    //     setTempArrBooks(arr)
    // }

    // const tempDownload=() =>{
    //     let arr=myBookList
    //     for(let i=0;i<offlineData.length;i++){
    //         let getIndex = arr.findIndex(function(item){
    //             return item.id === offlineData[i].id
    //           });
    //         arr[getIndex]["isDownloaded"]=true
    //     }
    //     console.log("ARRR",arr)
    //     setTempArrBooks(arr)
    // }

    return (
        <SafeAreaView>
            <ScrollView style={xStyle.cartPageBodyBg} stickyHeaderIndices={[0]}>
                <TopBar />

                {loadingContent === true && (
                    <View
                        style={{
                            // flex:1,
                            //justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#ffffff',
                            height: Dimensions.get('screen').height,
                            paddingVertical:'50%'
                            //paddingVertical:Dimensions.get('screen').height*0.1
                        }}>
                        <Image
                            source={require('../assets/images/playstore.png')}
                            style={{ height: 50, width: 50 }}
                        />
                        <Text style={xStyle.pub_home_best_card_title}>Downloading... Please Wait</Text>
                    </View>
                )
                }
                <View style={xStyle.cartPageHeaderView}>
                    <Text style={xStyle.cartPageHeader}>
                        My BookShelf
                    </Text>
                    <Text style={xStyle.cartPageHeaderResults}>
                        {myBookList.length} items
                    </Text>
                </View>
                <View style={[
                    xStyle.cartPageBooksMainDiv,
                    { marginBottom: '50%' }
                ]}>
                    {
                        myBookList.length > 0 && myBookList.map((book, index) => (
                            
                            <View style={[xStyle.pub_home_best_card]} key={index}>
                                {/* {checkDownload(book,index)} */}
                                <Image
                                    source={{ uri: Config.API_URL + Config.PUB_IMAGES + book.publisherid + "/" + book.image + '?d=' + new Date() }}
                                    style={xStyle.pub_home_best_cover}
                                    height={134}
                                    width={138}
                                />
                                <View style={xStyle.MyBookshelfMainView}>
                                    <View style={xStyle.MyBookshelfMainTextView}>
                                        <View>
                                            <Text style={xStyle.pub_home_best_card_title}>{book.title.length > 15 ? book.title.substring(0, 15) + ".." : book.title}</Text>
                                            <View style={xStyle.pub_home_card_author_view}>
                                                <Text style={xStyle.pub_home_card_author}>Author:
                                                    <Text style={xStyle.pub_home_card_author_name}>{book.authors.length > 15 ? book.authors.substring(0, 15) + ".." : book.authors}</Text>
                                                </Text>
                                            </View>
                                            <View style={xStyle.pub_home_card_author_view}>
                                                <Text style={xStyle.pub_home_card_author}>Purchased:
                                                    <Text style={xStyle.pub_home_card_author_name}>{book.invoicedate?.split(" ")[0]}</Text>
                                                </Text>
                                            </View>
                                        </View>
                                        {/* <TouchableOpacity>
                                            <Image
                                                source={require('../assets/images/greenTick.png')}
                                            />
                                        </TouchableOpacity> */}
                                    </View>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>

                                        <TouchableOpacity
                                            style={[xStyle.wishlistMoveToCartBtn, { width: '50%' }]}
                                            // onPress={() => navigation.navigate('pdf',{epdf:Config.API_URL + Config.PUB_IMAGES + book.publisherid + "/" + book.epdf_link})}
                                            onPress={() => { navigateToReadScreen(book) }}
                                        >
                                            <Text style={xStyle.wishlistMoveToCartBtnTxt}>
                                                Read Now
                                            </Text>
                                        </TouchableOpacity>

                                        
                                            
                                                <TouchableOpacity
                                                style={[xStyle.wishlistMoveToCartBtn, { width: '50%', marginLeft: '3%' }]}
                                                // onPress={() => downloadBooks(book)}
                                                onPress={() => navigateDownload(book,index)}

                                                 >
                                                <Text style={xStyle.wishlistMoveToCartBtnTxt}>
                                                    Download
                                                </Text>
                                                </TouchableOpacity>
                                            
                                            
                                            
                                            
                                        
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <Footer />
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
                    {/* <TouchableOpacity style={xStyle.logInBtn}
                    // onPress={sendEmail}
                    >
                        <Text style={[xStyle.logInBtnText]}>Send Request</Text>
                    </TouchableOpacity> */}
                </Overlay>
            </View>
        </SafeAreaView>
    )
}
export default MyBookshelf;