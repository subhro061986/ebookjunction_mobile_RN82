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
// import { useAuth } from '../context/AuthContext.js';
import Overlay from 'react-native-modal-overlay';
// import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';

import Config from "../config/Config.json"
import { UserProfile } from '../Context/Usercontext.js';
import { useAuth } from '../Context/Authcontext.js';

import BuyStepsPub from '../Global/BuyStepsPub.js';
import TopMenuPub from '../Global/TopMenuPub.js';
import FooterPub from '../Global/FooterPub.js';
import Footer from '../Global/Footer.js';

export const CategoryDetails = ({ route, navigation }) => {

    // const navigation = useNavigation();
    // console.log("Category ID : ", route.params.category_id);
    const { getBook_by_category, publisherId, add_delete_to_wishlist } = UserProfile();
    const { wishlistshow,add_book_to_storage,uuid,image_path } = useAuth();

    const [modalvisibility, setmodalvisibility] = useState(false);
    const [sortSelected, setSortSelected] = useState(0);
    const [priceFilter, setPriceFilter] = useState(0);
    const [tempBooks, setTempBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [allbooks, setAllBooks] = useState([]);
    const [rawbooksdata, setRawbooksdata] = useState([]);
    const [noofbooks, setNoofbooks] = useState(0);
    const [categoryname, setCategoryname] = useState("");

    useEffect(() => {
        books_by_category(route.params.category_id, publisherId);
    }, [route.params.category_id,]);

    const books_by_category = async (cat_id, pub_id) => {
        let json = {
            categoryid: cat_id,
            publisherid: pub_id
        };
        let current_page_no = 1;
        let records_per_page = 6;
        // console.log("JSON : ", json);

        const resp = await getBook_by_category(current_page_no, records_per_page, json);
        console.log("GET BOOK BY CATEGORY : ", resp);
        if (resp === undefined || resp === null) {
            setTempBooks([])
            setBooks([])
            setRawbooksdata([])
        }
        else {
            if (resp?.output?.books?.length > 0) {
                setTempBooks(resp?.output?.books)
                setBooks(resp?.output?.books)
                setAllBooks(resp?.output?.books)
                setRawbooksdata(resp?.output?.books)
                setNoofbooks(resp?.output?.books?.length)
                setCategoryname(resp.output.books[0].category)
                // price_ranges(resp?.output?.books)
            }
            else {
                setBooks([])
                setAllBooks([])
                setRawbooksdata([])
            }
        }
    }

    const sortSelectionChange = (itemValue, itemIndex) => {
        setSortSelected(itemValue);
        console.log("Item val", itemValue);
        console.log("Item index", itemIndex);
        let sort_val = itemValue
        if (sort_val === 1) {
            setLowToHigh();
        }
        else if (sort_val === 2) {
            setHightoLow();
        }
        else if (sort_val === 3) {
            // console.log('A-Z')
            AtoZ();
        }
        else {
            // console.log('Z-A')
            ZtoA();
        }
    }

    const sortValue = [
        {
            id: 1,
            title: 'Price Low to High'
        },
        {
            id: 2,
            title: 'Price High to Low'
        },
        {
            id: 3,
            title: 'A -> Z'
        },
        {
            id: 4,
            title: 'Z -> A'
        },
    ]

    const setLowToHigh = () => {
        const sortedProducts = books.sort((a, b) => a.price - b.price);
        // console.log("sortedproducts", sortedProducts)
        setBooks([...sortedProducts]);
    };

    const setHightoLow = () => {
        const sortedProducts = books.sort((a, b) => b.price - a.price);
        setBooks([...sortedProducts]);
    };

    const AtoZ = () => {
        const sortedProducts = books.sort((a, b) => a.title > b.title ? 1 : -1)
        // console.log("A-Z", sortedProducts)
        setBooks([...sortedProducts]);
    }

    const ZtoA = () => {
        const sortedProducts = books.sort((a, b) => a.title > b.title ? -1 : 1)
        // console.log("Z-A", sortedProducts)
        setBooks([...sortedProducts]);
    }

    const filterModalHandler = () => {
        setmodalvisibility(true);
    }

    const backbuttonhandler = () => {
        setmodalvisibility(false);
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
    }

    const wishlistHandler = (event, book_id, index) => {
        event.stopPropagation();
        let tempArr = books;
        if (wishlistshow === true) {
            if(tempArr[index].isFavourite === 1){
                tempArr[index].isFavourite = 0;
            }
            else{
                tempArr[index].isFavourite = 1;
            }
            toggleWishlistHandler(book_id);
        }
        else {
            alert("Please login first");
        }
        setBooks(tempArr);
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
        <SafeAreaView>
            <ScrollView style={xStyle.categoryDetailsBodyBg} stickyHeaderIndices={[0]}>
                <TopMenuPub />
                <View style={xStyle.categoryDetailsHeaderView}>
                    <Text style={xStyle.categoryDetailsHeader}>
                        {categoryname}
                    </Text>
                    <Text style={xStyle.categoryDetailsHeaderResults}>
                        {noofbooks} Results found
                    </Text>
                </View>
                <View style={xStyle.categoryDetailsSortingMainView}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={xStyle.categoryDetailsSortText}>
                            Sort By
                        </Text>
                        <View style={[xStyle.categoryDetailsDropDown]}>
                            <Picker
                                style={xStyle.categoryDetailsDropDownPicker}
                                selectedValue={sortSelected}
                                onValueChange={(itemValue, itemIndex) =>
                                    sortSelectionChange(itemValue, itemIndex)
                                }
                            >
                                <Picker.Item label="Please Select" value="0" />
                                {/* <Picker.Item label="Best Seller" value="1" />
                                <Picker.Item label="New Arrivals" value="2" /> */}
                                {
                                    sortValue.map((data, index) => (
                                        <Picker.Item label={data.title} value={data.id} key={index} />
                                    ))
                                }
                            </Picker>
                        </View>
                    </View>
                    {/* <TouchableOpacity onPress={filterModalHandler}>
                        <Image
                            source={require('../assets/images/filterBtn.png')}
                        />
                    </TouchableOpacity> */}
                </View>
                <View style={xStyle.categoryDetailsBooksMainDiv}>
                    {
                        books.map((data, index) => (
                            books &&
                            <TouchableOpacity style={xStyle.pub_home_best_card} key={index}  onPress={() => navigation.navigate('productdetails',{bookId:data.id})}>
                                <Image
                                    // source={require('../assets/images/bcov1.png')}
                                    source={{ uri: Config.API_URL + Config.PUB_IMAGES + publisherId + "/" + data.image + '?d=' + new Date() }}
                                    style={xStyle.pub_home_best_cover}
                                    height={134}
                                    width={138}
                                />
                                <View style={xStyle.pub_home_best_card_col2}>
                                    <View style={xStyle.pub_home_best_card_col2_top}>
                                        <View>
                                            <Text style={xStyle.pub_home_best_card_title}>{data.title.length > 15 ? data.title.substring(0, 15) + ".." : data.title}</Text>
                                            <View style={xStyle.pub_home_card_author_view}>
                                                <Text style={xStyle.pub_home_card_author}>
                                                    Author: <Text style={xStyle.pub_home_card_author_name}>
                                                    {data.authors.length > 15 ? data.authors.substring(0, 15) + ".." : data.authors}
                                                    </Text>
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={(e) => wishlistHandler(e, data.id, index)}>
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
                                        </TouchableOpacity>
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
                        ))
                    }

                    {/* <TouchableOpacity style={xStyle.categoryDetailsViewMore_btn}>
                        <Text style={xStyle.categoryDetailsViewMore}>
                            View More
                        </Text>
                    </TouchableOpacity> */}
                </View>
                <BuyStepsPub />
            </ScrollView>
            <Footer />

            <View>
                <Overlay
                    // animationType={ZoomIn}
                    // transparent={true}
                    visible={modalvisibility}
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
                        style={xStyle.categoryDetailsModalCross}
                        onPress={backbuttonhandler}
                    >
                        <Image
                            source={require('../assets/images/close-circle.png')}
                        />
                    </TouchableOpacity>
                    <View style={xStyle.categoryDetailsModalHeaderView}>
                        <Text style={xStyle.categoryDetailsModalHeader}>Refine your Search by Price</Text>
                    </View>

                    <View style={xStyle.categoryDetailsModalBody}>
                        <View style={xStyle.categoryDetailsModalRadioBtn}>
                            <RadioButton
                                value="1"
                                status={priceFilter === 1 ? 'checked' : 'unchecked'}
                                onPress={() => setPriceFilter(1)}
                            />
                            <Text style={xStyle.categoryDetailsModalRadioBtnTextFont}>
                                Under ₹500
                            </Text>
                        </View>
                        <View style={xStyle.categoryDetailsModalRadioBtn}>
                            <RadioButton
                                value="2"
                                status={priceFilter === 2 ? 'checked' : 'unchecked'}
                                onPress={() => setPriceFilter(2)}
                            />
                            <Text style={xStyle.categoryDetailsModalRadioBtnTextFont}>
                                ₹1,000 - ₹1,500
                            </Text>
                        </View>
                        <View style={xStyle.categoryDetailsModalRadioBtn}>
                            <RadioButton
                                value="3"
                                status={priceFilter === 3 ? 'checked' : 'unchecked'}
                                onPress={() => setPriceFilter(3)}
                            />
                            <Text style={xStyle.categoryDetailsModalRadioBtnTextFont}>
                                ₹1,500 - ₹3,000
                            </Text>
                        </View>
                    </View>
                </Overlay>
            </View>
        </SafeAreaView>
    )
}
export default CategoryDetails;