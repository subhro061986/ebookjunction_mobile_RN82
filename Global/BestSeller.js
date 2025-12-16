import React, { Component, useState, useEffect } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert

} from 'react-native';

import { UserProfile } from '../Context/Usercontext';
import Config from "../config/Config.json"
import { useAuth } from '../Context/Authcontext';

import { useNavigation } from '@react-navigation/native';


export const BestSeller = ({ route }) => {

    const navigation = useNavigation();
    const { best_selling_books, publisherId, add_delete_to_wishlist, publisherData, allBestSeller } = UserProfile()
    const { wishlistshow,add_book_to_storage,uuid,image_path } = useAuth();

    useEffect(() => {

    }, [])

    const toggleWishlistHandler = async (book_id) => {
        let json = {
            "bookid": book_id,
            "currentPage": 1,
            "recordPerPage": 5
        }
        const resp = await add_delete_to_wishlist(json);
        // console.log("WISHLIST : ", resp);
        Alert.alert(resp.message);
    }

    const wishlistHandler = (event, book_id) => {
        event.stopPropagation();
        if (wishlistshow === true) {
            toggleWishlistHandler(book_id);
        }
        else {
            Alert.alert("Please login first");
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

    return (
        <View style={xStyle.pub_home_best_bg}>
            <View style={xStyle.pub_home_best_head_view}>
                <Text style={xStyle.pub_home_best_head}>Best Seller</Text>
            </View>
            {/* {console.log('all bestseller', allBestSeller)} */}
            {
                allBestSeller && allBestSeller.map((data, index) => (
                    <TouchableOpacity
                        key={index}
                        style={xStyle.pub_home_best_card}
                        onPress={() => navigation.navigate('productdetails', {"bookId" : data.id})}
                    >
                        <Image
                            // source={require('../assets/images/bcov1.png')}
                            source={{ uri: Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date() }}
                            style={xStyle.pub_home_best_cover}
                            height={134}
                            width={125}
                        />
                        <View style={xStyle.pub_home_best_card_col2}>
                            <View style={xStyle.pub_home_best_card_col2_top}>
                                <View>
                                    <Text style={xStyle.pub_home_best_card_title}>
                                        {/* The Goldfinch */}
                                        {data.title.length > 15 ? data.title.substring(0, 15) + ".." : data.title}
                                    </Text>
                                    <View style={xStyle.pub_home_card_author_view}>
                                        <Text style={xStyle.pub_home_card_author}>Author: <Text style={xStyle.pub_home_card_author_name}>
                                            {/* Jeff Keller */}
                                            {data.authors.length > 15 ? data.authors.substring(0, 15) + ".." : data.authors}
                                            {/* {data.authors?.length > 0 ? data.authors : "Not Found"} */}
                                        </Text></Text>
                                    </View>
                                </View>
                                {/* <TouchableOpacity onPress={(e) => wishlistHandler(e, data.id)}>
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
                            </View>
                            <View style={xStyle.pub_home_best_card_col2_bottom}>
                                <View>
                                    <Text style={xStyle.pub_home_best_card_price}>
                                        ₹{data.price}
                                    </Text>
                                </View>
                                <View>
                                    {/* <TouchableOpacity onPress={()=> add_to_cart(data)}>
                                        <Image
                                            source={require('../assets/images/plusBtn.png')}
                                        />
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

            {/* <TouchableOpacity style={xStyle.pub_home_best_card}>
                <Image
                    source={require('../assets/images/bcov2.png')}
                    style={xStyle.pub_home_best_cover}
                    height={134}
                    width={138}
                />
                <View style={xStyle.pub_home_best_card_col2}>
                    <View style={xStyle.pub_home_best_card_col2_top}>
                        <View>
                            <Text style={xStyle.pub_home_best_card_title}>The Hypocrite..</Text>
                            <View style={xStyle.pub_home_card_author_view}>
                                <Text style={xStyle.pub_home_card_author}>Author: <Text style={xStyle.pub_home_card_author_name}>Jeff Keller</Text></Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/images/wishblue.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={xStyle.pub_home_best_card_col2_bottom}>
                        <View>
                            <Text style={xStyle.pub_home_best_card_price}>
                                ₹199
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Image
                                    source={require('../assets/images/plusBtn.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={xStyle.pub_home_best_card}>
                <Image
                    source={require('../assets/images/bcov3.png')}
                    style={xStyle.pub_home_best_cover}
                    height={134}
                    width={138}
                />
                <View style={xStyle.pub_home_best_card_col2}>
                    <View style={xStyle.pub_home_best_card_col2_top}>
                        <View>
                            <Text style={xStyle.pub_home_best_card_title}>The Swallows</Text>
                            <View style={xStyle.pub_home_card_author_view}>
                                <Text style={xStyle.pub_home_card_author}>Author: <Text style={xStyle.pub_home_card_author_name}>Jeff Keller</Text></Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/images/wishblue.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={xStyle.pub_home_best_card_col2_bottom}>
                        <View>
                            <Text style={xStyle.pub_home_best_card_price}>
                                ₹249
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Image
                                    source={require('../assets/images/plusBtn.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={xStyle.pub_home_best_card}>
                <Image
                    source={require('../assets/images/bcov4.png')}
                    style={xStyle.pub_home_best_cover}
                    height={134}
                    width={138}
                />
                <View style={xStyle.pub_home_best_card_col2}>
                    <View style={xStyle.pub_home_best_card_col2_top}>
                        <View>
                            <Text style={xStyle.pub_home_best_card_title}>Dune</Text>
                            <View style={xStyle.pub_home_card_author_view}>
                                <Text style={xStyle.pub_home_card_author}>Author: <Text style={xStyle.pub_home_card_author_name}>Jeff Keller</Text></Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/images/wishblue.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={xStyle.pub_home_best_card_col2_bottom}>
                        <View>
                            <Text style={xStyle.pub_home_best_card_price}>
                                ₹149
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Image
                                    source={require('../assets/images/plusBtn.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}

        </View>
    )
}
export default BestSeller;