import React, { Component,useState, useEffect,useRef } from 'react';
import xStyle from '../assets/css/x_style.js';
import { UserProfile } from '../Context/Usercontext.js';
import { useAuth } from "../Context/Authcontext";
import Config from "../config/Config.json";

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
// import { useAuth } from '../context/AuthContext.js';

// import { UserProfile } from '../context/UserContext.js';

import TopMenu from "../Global/TopMenu.js";
import Footer from "../Global/Footer.js";
import FooterPub from '../Global/FooterPub.js';
import BuyStepsPub from '../Global/BuyStepsPub.js';
import TopMenuPub from '../Global/TopMenuPub.js';
import BestSeller from '../Global/BestSeller.js';

export const ProductDetails = ({route,navigation}) => {

    const scrollRef = useRef();

    const { get_book_details,
        addto_cart,
        add_single_item,
        cart_items,
        add_delete_to_wishlist,
        getBookShelf,
        get_items,
         } = UserProfile()
    const { wishlistshow, uuid,authData,add_book_to_storage,
        remove_cart_item, } = useAuth();
    
    const [bookdetail, setBookdetail] = useState({})
    const [images, setImages] = useState([])
    const [front_cover, setFrontCover] = useState('');
    const [back_cover, setBackCover] = useState('');
    const [readbool, setReadbool] = useState(false)
    const [showtext, setShowtext] = useState(false)
    const [defaultimg, setDefaultimg] = useState('')
    const [nondefaultimg, setNondefaultimg] = useState('')
    const [isBookPresent, setIsBookPresent] = useState(false)
    const [dependencyvar, setDependencyvar] = useState(false)
    
    const dummy =require('../assets/images/demoBook.png')

    const image_path = Config.API_URL + Config.PUB_IMAGES;


    useEffect(() => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
        book_detail(route.params.bookId)
        getbookshelfData(route.params.bookId)

    },[route.params?.bookId])

    const getbookshelfData = async (bookid) => {

        const booklistResp = await getBookShelf()
        if (booklistResp?.output?.books != null) {
            let booklist_arr = booklistResp?.output?.books?.filter((val) => {
                return (val.id === bookid)
            })
            if (booklist_arr.length > 0) {
                setIsBookPresent(true)
            }

        }
    }

    const book_detail = async (book_id) => {
        const resp = await get_book_details(book_id)
        console.log("book=",resp)
        if (resp === undefined || resp === null) {
            setBookdetail({})
            setImages([])
            setFrontCover('')
            setBackCover('')
        }
        else {
            console.log("det_resp", resp)
            if (resp.statuscode === "0" && JSON.stringify(resp.output) !== "{}" && resp.output !== null && resp.output !== undefined) {
                setBookdetail(resp.output)
                // setImages(resp.output.images?.length > 0 ? resp.output.images : dummy);
                setFrontCover(resp.output.front_cover)
                setBackCover(resp.output.back_cover)
                default_img(resp.output)

                if (resp.output.description.length > 336) {
                    setReadbool(true)
                    setShowtext(false)
                }
                else {
                    setReadbool(false)
                }
            }
            else {
                setBookdetail({})
                // setImages([])
                setFrontCover('')
                setBackCover('')

            }
        }

    }

    const default_img = async (pub_obj) => {
        let frontCover = image_path + pub_obj.publisherid + '/' + pub_obj.front_cover + '?d=' + new Date();
        let backCover = image_path + pub_obj.publisherid + '/' + pub_obj.back_cover + '?d=' + new Date();
        console.log("PUB OBJ FC IMAGE : ", frontCover);
        console.log("PUB OBJ BC IMAGE : ", backCover);
        setDefaultimg(frontCover);
        setNondefaultimg(backCover);

    }

    const add_to_cart = async (bookid, toCheckout) => {
        console.log('bookDetails',bookdetail)
        console.log("default image=",defaultimg)
        let json_data = {
            title: bookdetail.title,
            authors: bookdetail.authors,
            price: bookdetail.price,
            publisher: bookdetail.publisher,
            items_no: 1,
            image: defaultimg,
            category: bookdetail.category,
            publisherid: bookdetail.publisherid,
            bookid:bookdetail.id,
            deviceid:uuid
          }

          // before login

        if(authData === '' || authData === null || authData === undefined){
        
            const resp= await add_book_to_storage(json_data)
            // for buy now
            if (toCheckout) {
                alert("Please Login to Buy this book!")
            }
            // for add to cart
            else {
                alert(resp.message);
            }
        }

        // after login
        else {
        
        const resp= await add_book_to_storage(json_data)

        // for buy now
            if(toCheckout){

                if(resp.isPresent){
                    // remove data from backend
                    remove_item_and_add(json_data)
                }
                navigation.navigate('billingAddress', {buynow : 1})
            }
            // for add to cart
            else {
                alert(resp.message);
            }
        }
    }

    const remove_item_and_add = async (remove_json) => {

        console.log("remove json:",remove_json)
        const resp = await remove_cart_item(remove_json,1)
        console.log("Remove_cart :", resp) 
        if(resp.statuscode === "0"){

            const response = await add_book_to_storage(remove_json)
            console.log("response after adding= ",response)
        }


    }


    return (
        <SafeAreaView>
            <ScrollView style={xStyle.homeBg} stickyHeaderIndices={[0]} ref={scrollRef}>
                <TopMenuPub />

                {/* Product Details */}

                <View
                    style={xStyle.prod_det_view}
                >
                    {/* <Text style={{color:'black'}}>{defaultimg}</Text> */}
                    <Image
                        // source={require('../assets/images/demoBook.png')}
                        source={{uri:defaultimg}}
                        style={[xStyle.prod_det_cov_img, 
                            {width:'100%', height:251}
                        ]}
                        // width={318}
                        
                    />
                    <View style={xStyle.prod_det_head_view}>
                        <Text style={xStyle.prod_det_head}>{bookdetail.title}</Text>
                    </View>
                    <View style={xStyle.prod_det_author_view}>
                        <Text style={xStyle.prod_det_card_author}>Author: <Text style={xStyle.prod_det_card_author_name}>{bookdetail.authors}</Text></Text>
                    </View>
                    <View style={xStyle.prod_det_price_view}>
                        <Text style={xStyle.prod_det_price}>Price: <Text style={xStyle.prod_det_price_value}>₹{bookdetail.price}</Text></Text>
                    </View>

                    {/* {isBookPresent ?
                    <View style={xStyle.prod_det_btn_view}>
                        <TouchableOpacity style={[xStyle.prod_det_add_btn,{width:'65%'}]}
                            onPress={() =>navigation.navigate('mybookshelf')}
                        >
                            <Text style={xStyle.prod_det_add_btn_txt}>Go To Bookshelf</Text>
                            <Image
                                source={require('../assets/images/cartblack.png')}
                                style={{marginLeft:10}}
                            />
                        </TouchableOpacity>
                    
                    </View>
                    :

                    <View style={xStyle.prod_det_btn_view}>
                        <TouchableOpacity style={xStyle.prod_det_add_btn}
                            onPress={() =>add_to_cart(bookdetail.id,false)}
                        >
                            <Text style={xStyle.prod_det_add_btn_txt}>Add to Cart</Text>
                            <Image
                                source={require('../assets/images/cartblack.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={xStyle.prod_det_buy_btn}
                            onPress={() =>add_to_cart(bookdetail.id,true)}
                        >
                            <Text style={xStyle.prod_det_add_buy_txt}>Buy Now</Text>
                            <Image
                                source={require('../assets/images/add.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    } */}
                    <View style={xStyle.prod_det_border}></View>
                    <View style={xStyle.prod_det_des_head_view}>
                        <Text style={xStyle.prod_det_des_head}>Description</Text>
                    </View>
                    <View style={xStyle.prod_det_des_body_view}>
                        <Text style={xStyle.prod_det_des_body}>
                        {bookdetail.description}
                        </Text>
                    </View>
                    <View style={xStyle.prod_det_details_head_view}>
                        <Text style={xStyle.prod_det_details_head}>Product Details</Text>
                    </View>
                    <View style={xStyle.prod_det_details_body_view}>
                        <Text style={xStyle.prod_det_details_body_title}>&#8226;  Author: <Text style={xStyle.prod_det_details_body_value}>{bookdetail.authors}</Text></Text>
                        <Text style={xStyle.prod_det_details_body_title}>&#8226;  Publisher: <Text style={xStyle.prod_det_details_body_value}>{bookdetail.publisher}</Text></Text>
                        {/* <Text style={xStyle.prod_det_details_body_title}>&#8226;  Publisher Date: <Text style={xStyle.prod_det_details_body_value}>09 Sep 2003</Text></Text> */}
                        <Text style={xStyle.prod_det_details_body_title}>&#8226;  Year Of Publishing: <Text style={xStyle.prod_det_details_body_value}>{bookdetail.yearofpublishing}</Text></Text>
                        <Text style={xStyle.prod_det_details_body_title}>&#8226;  Format: <Text style={xStyle.prod_det_details_body_value}>E-Book</Text></Text>
                        <Text style={xStyle.prod_det_details_body_title}>&#8226;  Edition No: <Text style={xStyle.prod_det_details_body_value}>{bookdetail.editionno}</Text></Text>
                        <Text style={xStyle.prod_det_details_body_title}>&#8226;  ISBN-10: <Text style={xStyle.prod_det_details_body_value}>{bookdetail.isbn10}</Text></Text>
                        <Text style={xStyle.prod_det_details_body_title}>&#8226;  ISBN-13: <Text style={xStyle.prod_det_details_body_value}>{bookdetail.isbn13}</Text></Text>
                        <Text style={xStyle.prod_det_details_body_title}>&#8226;  No of Pages: <Text style={xStyle.prod_det_details_body_value}>{bookdetail.noofpages}</Text></Text>
                    </View>
                </View>


                {/* Best Seller */}

                <BestSeller />

                {/* Buying Steps */}

                <BuyStepsPub />

            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}
export default ProductDetails;