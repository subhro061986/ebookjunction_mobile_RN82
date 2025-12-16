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
    Dimensions,
    useWindowDimensions ,
    Alert
} from 'react-native';
import RenderHtml from 'react-native-render-html';
// import { useAuth } from '../context/AuthContext.js';
import { useNavigation } from '@react-navigation/native';

import { UserProfile } from '../Context/Usercontext';
import Config from "../config/Config.json"
import { useAuth } from '../Context/Authcontext';

import TopMenu from "../Global/TopMenu.js";
import Footer from "../Global/Footer.js";
import FooterPub from '../Global/FooterPub.js';
import BuyStepsPub from '../Global/BuyStepsPub.js';
import TopMenuPub from '../Global/TopMenuPub.js';
import BestSeller from '../Global/BestSeller.js';
export const PubHomeScreen = ({ route, navigation }) => {

    // const navigation = useNavigation();
    const { width } = useWindowDimensions();

    const { getPublishersById, publisherId, getNewArrivals, 
        allNewArrival, publisherData, allBestSeller, 
        add_delete_to_wishlist ,categoryByPublisherList} = UserProfile();
    const { authData, wishlistshow,add_book_to_storage,uuid,image_path } = useAuth();

    const [publisherDetails, setPublisherDetails] = useState('')

    useEffect(() => {
        console.log("CAT LIST",categoryByPublisherList)
        getPubById();
    }, [authData])

    

    const getPubById = async () => {
        const result = await getPublishersById(route.params.publisher_id)
        setPublisherDetails(result?.data?.output)
    }

    const toggleWishlistHandler = async (book_id) => {
        let json = {
            "bookid": book_id,
            "currentPage": 1,
            "recordPerPage": 5
        }
        const resp = await add_delete_to_wishlist(json);
        // console.log("WISHLIST : ", resp);
        alert(resp.message);
        //Best_Selling() 
    }

    const wishlistHandler = (event, book_id) => {
        event.stopPropagation();
        if (wishlistshow === true) {
            toggleWishlistHandler(book_id);
        }
        else {
            alert("Please login first");
        }
    }

    const add_to_cart = async (book) => {
        console.log("book=",book)

        let json_data = {
        title: book.title,
        author: book.authors,
        price: book.price,
        publisher: book.publisher,
        items_no: 1,
        image: image_path + book.publisherid + '/' + book.image + '?d=' + new Date(), 
        category: book.category,
        publisherid: book.publisherid,
        bookid:book.id,
        deviceid:uuid
        }

        const resp= await add_book_to_storage(json_data)
        Alert.alert(resp.message) 
    }
    const getCatgegoryData = (data) => {
        navigation.navigate('categorydetails',
          { category_id: data.id }
        )
      }
    return (
        <SafeAreaView>
            <ScrollView style={xStyle.homeBg} stickyHeaderIndices={[0]} keyboardShouldPersistTaps='always'>
                <TopMenuPub />

                {/* Banner */}
                
                <View
                   
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >


                    {/* <View> */}
                    <Image
                        // source={require('../assets/images/demoBook.png')}
                        // source={require('../assets/images/PubBg.png')}
                        //source={{ uri: Config.API_URL + Config.PUB_IMAGES + publisherDetails.id + "/" + publisherDetails.banner + '?d=' + new Date() }}
                        source={{ uri: Config.API_URL + Config.PUB_IMAGES + publisherDetails.id + "/" + publisherDetails.banner}}
                        // width={'50%'}
                        // height={200}
                        style={{
                            height: 230,
                            width: Dimensions.get('screen').width * 0.5,
                            resizeMode: 'stretch'
                        }}

                    />
                    
                    {/* </View> */}

                    <View style={[xStyle.pub_banner_txt_view, { marginLeft: '3%' }]}>
                        <Text style={xStyle.pub_banner_head}>Your Gateway to Excellence</Text>
                        <View style={xStyle.pub_banner_body_view}>
                            <Text style={xStyle.pub_banner_body}>Explore Academic & Professional E-Books with Ease</Text>
                        </View>
                    </View>

                </View>

                {/* Publisher About */}

                <View style={xStyle.pub_about}>
                    <Image
                        // source={require('../assets/images/demoPubLogo.png')}
                        source={{ uri: Config.API_URL + Config.PUB_IMAGES + publisherDetails.id + '/' + publisherDetails.logo }}
                        style={[xStyle.pub_about_logo, { resizeMode: 'contain' }]}
                        height={50}
                        width={200}
                    />
                    <View
                    style={[xStyle.pub_about_body, {color:'red'}]}
                    >
                        {/* <Text id='pub_about'></Text> */}
                        <RenderHtml
                            tagsStyles={
                                {body: {
                                    color: 'grey'
                                  }}
                            }
                            contentWidth={width}
                            source={{html: publisherDetails.about}}
                        />
                        {/* Juris Press is a prominent publisher of law and other professional books
                        , headquartered in Chennai, India. Established with a commitment to providing high-quality
                        , authoritative literature
                        , Juris Press specializes in catering to the discerning needs of the professional */}
                    </View>
                    {/* <TouchableOpacity style={xStyle.southshoreInnovationsReadMore_btn}>
                        <Text style={xStyle.southshoreInnovationsReadMore}>
                            Read More
                        </Text>
                    </TouchableOpacity> */}
                </View>

                {/* Category List */}

                <View style={xStyle.publist_bg}>
                    <View style={xStyle.publist_head_view}>
                        <Text style={xStyle.publist_head}>Categories</Text>
                    </View>
                    <ScrollView horizontal={true}>
                    {
                        categoryByPublisherList.map((data, index) => (
                        <TouchableOpacity  key={index}>
                            <TouchableOpacity style={xStyle.pub_cat_cards} onPress={() => getCatgegoryData(data)}>
                                <Image
                                    source={require('../assets/images/art.png')}
                                />
                            </TouchableOpacity>
                            <Text style={xStyle.pub_name}>{data.name}</Text>
                        </TouchableOpacity>
                        ))}
                        
                        
                    </ScrollView>
                </View>

                {/* New Arrival */}

                <View style={xStyle.pub_home_new_view}>
                    <Text style={xStyle.pub_home_new_head}>New Arrivals</Text>
                    <View
                        style={xStyle.pub_home_new_body}
                    >
                        {
                            allNewArrival.map((data, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[xStyle.pub_home_new_card
                                        // , {backgroundColor:'pink'}
                                    ]}
                                    onPress={() => navigation.navigate('productdetails',{bookId:data.id})}
                                >

                                    <Image
                                        // source={require('../assets/images/cov1.png')}
                                        source={{ uri: Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date() }}
                                        // style={xStyle.pub_home_new_card_img}
                                        style={{
                                            borderRadius: 13,
                                            resizeMode: 'contain',
                                            width: '100%',
                                            height: 130,
                                            // borderWidth:1,
                                            // borderColor:'black'
                                        }}
                                    // width={154}
                                    // height={130}
                                    />
                                    {/* <TouchableOpacity style={xStyle.pub_home_new_card_wishbtn} onPress={(e) => wishlistHandler(e, data.id)}>
                                            {
                                                data.isFavourite === 1 ? (
                                                    <Image
                                                        source={require('../assets/images/wishblue.png')}
                                                    />
                                                ) : (
                                                    <Image
                                                        source={require('../assets/images/notWishlist.png')}
                                                    />
                                                )
                                            }
                                    </TouchableOpacity> */}
                                    <View
                                        style={xStyle.pub_home_new_card_txtbox}
                                    >
                                        <View
                                            style={xStyle.pub_home_new_card_view_1}
                                        >
                                            <View
                                                style={xStyle.pub_home_card_title_view}
                                            >
                                                <Text
                                                    style={xStyle.pub_home_card_title}
                                                >
                                                    {/* Attitude Is Everyt.. */}
                                                    {data.title.length > 15 ? data.title.substring(0, 15) + ".." : data.title}
                                                </Text>
                                            </View>
                                            <Text
                                                style={xStyle.pub_home_card_author}
                                            >Author:
                                                <Text
                                                    style={xStyle.pub_home_card_author_name}
                                                >
                                                    {/* Jeff Keller */}
                                                    {data.authors.length > 15 ? data.authors.substring(0, 15) + ".." : data.authors}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View
                                            style={xStyle.pub_home_card_price_view}
                                        >
                                            <Text
                                                style={xStyle.pub_home_card_price}
                                            >
                                                ₹{data.price}
                                            </Text>
                                            {/* <TouchableOpacity onPress={() => add_to_cart(data)}>
                                                <Image
                                                    source={require('../assets/images/plusBtn.png')}
                                                />
                                            </TouchableOpacity> */}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                {/* Best Seller */}
                <BestSeller />
                <BuyStepsPub />
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}
export default PubHomeScreen;