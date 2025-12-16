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
    PermissionsAndroid
} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

import TopBar from "../Global/TopBar.js";
import Footer from "../Global/Footer.js";
// import { useAuth } from '../context/AuthContext.js';
import { UserProfile } from '../Context/Usercontext.js';
import Config from "../config/Config.json"

export const Profile = () => {
    const optionsImg = {
        mediaType: 'photo',
        selectionLimit: 5,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    const navigation = useNavigation();
    const { my_profile, get_country_list, get_state_list, change_personal_details, change_contact_details, change_billing_address } = UserProfile();

    const [contactInfoModalVisibility, setmodalvisibility] = useState(false);
    const [personalInfoModalVisibility, setPersonalmodalvisibility] = useState(false);
    const [countryIdSelected, setCountryIdSelected] = useState(0);
    const [stateIdSelected, setStateIdSelected] = useState(0);
    const [buildImgArr, setBuildImgArr] = useState('');
    const [campPicModal, setCampPicModal] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')
    const [profileImage, setProfileImage] = useState('')

    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])

    useEffect(() => {
        myProfileApi()
        renderCountryList();
    }, []);

    const renderStateList = async (countyId) => {
        try {
            const resp = await get_state_list(countyId)
            setStateList(resp.output)
            
        } catch (err) {
            console.error(err);
        }
    }
    const renderCountryList = async () => {
        try {
            const resp = await get_country_list()
            setCountryList(resp.output)
            
        } catch (err) {
            console.error(err);
        }
    }

    const myProfileApi = async () => {

        const resp = await my_profile()

        setName(resp.output.name)
        setEmail(resp.output.email)
        setPhone(resp.output.contactno)
        setAddress(resp.output.addressline)
        setSelectedCountry(resp.output.country)
        setSelectedState(resp.output.state)
        setCountryIdSelected(resp.output.countryid)
        setStateIdSelected(resp.output.stateid)
        setCity(resp.output.city)
        setPin(resp.output.pincode)

        setProfileImage(Config.API_URL + Config.UPLOAD_URL + resp.output.profileimage + '?d=' + new Date())

        if (resp.output.countryid !== null && resp.output.countryid !== '') {
            renderStateList(resp.output.countryid)
        }
    }

    const contactInfoModalHandler = () => {
        setmodalvisibility(true);

    }

    const contactBackbuttonhandler = () => {
        setmodalvisibility(false);
    }

    const personalInfoModalHandler = () => {
        setPersonalmodalvisibility(true);

    }

    const personalBackbuttonhandler = () => {
        setPersonalmodalvisibility(false);
    }

    const sortCountrySelectionChange = async (itemValue, itemIndex) => {
        setCountryIdSelected(itemValue);
        if (itemValue === 0 || itemValue === '0') {
            
        }
        else {
            
            let countryName = countryList.find((data) => data.id === itemValue).name;
            
            setSelectedCountry(countryName);
        }
        // setSelectedCountry(countryName);
        if (itemValue === 0 || itemValue === '0') {
            setStateList([]);
        }
        else {
            const resp = await get_state_list(itemValue);
            setStateList(resp.output);
        }
        
    }

    const sortStateSelectionChange = (itemValue, itemIndex) => {
        let stateName = stateList.find((data) => data.id === itemValue).name;
        setStateIdSelected(itemValue);
        setSelectedState(stateName);
        
    }

    const handleUploadGalPhoto = () => {
        // let tempArr = this.state.buildImgArr;
        // let tempArr = buildImgArr;

        launchImageLibrary(optionsImg, (response) => {
            if (response.didCancel === true) {
                setProfileImage('');
                // this.setState({buildImgArr:tempArr})
                setBuildImgArr('');
            }
            else {
                // this.setState({buildImgArr:tempArr})
                setBuildImgArr(response.assets[0]);
                
                setProfileImage(response.assets[0].uri);
            }
            //   this.setState({
            //     campPicModal:false
            //   })
            setCampPicModal(false);
        });
    }

    const savePersonalData = async () => {
        
        const userDetails = new FormData();
        userDetails.append('profileimage', {
            name: buildImgArr.fileName,
            type: buildImgArr.type,
            uri:
                Platform.OS === 'android' ? buildImgArr.uri : buildImgArr.uri.replace('file://', ''),
        });
        // userDetails.append('profileimage', profileImage);
        userDetails.append('name', name)

        let changecontactDetails = {
            email: email,
            contactno: phone,
        }

        const personalDetailsPesponse = await change_personal_details(userDetails)
        

        const contactDetailsPesponse = await change_contact_details(changecontactDetails)
        
        if (personalDetailsPesponse.statuscode === '0' && contactDetailsPesponse.statuscode === '0') {
            alert("Details updated successfully!");
            setmodalvisibility(false);
            setPersonalmodalvisibility(false)
        }
        else {
            alert("Error in updating!");
            setmodalvisibility(false);
            setPersonalmodalvisibility(false)
        }
        // personalBackbuttonhandler();
    }

    const saveContactdata = async () => {
        let changebillingDetails = {
            addressline: address,
            city: city,
            pincode: pin,
            stateid: stateIdSelected,
            countryid: countryIdSelected,
        }

        

        const billingDetailsPesponse = await change_billing_address(changebillingDetails)
       
        if (billingDetailsPesponse.statuscode === '0') {
            alert("Details updated successfully!");
            //contactBackbuttonhandler();
            setmodalvisibility(false);
            setPersonalmodalvisibility(false)
        }
        else {
            alert("Error in updating!");
            setmodalvisibility(false);
            setPersonalmodalvisibility(false)
            //contactBackbuttonhandler()
        }
        // contactBackbuttonhandler();
    }


    return (
        <SafeAreaView>
            <ScrollView style={xStyle.profbg} stickyHeaderIndices={[0]}>
                <TopBar />
                <View style={xStyle.homepaddinng}>
                    <View style={xStyle.prof_head_view}>
                        <Text style={xStyle.prof_head}>Profile</Text>
                    </View>
                    <View style={xStyle.prof_contact_view}>
                        <View style={xStyle.prof_user_contact_info_view}>
                            <View style={xStyle.prof_user_img_view}>
                                {profileImage === null || profileImage === '' || profileImage === undefined ?
                                    (
                                        <Image
                                            source={require('../assets/images/user_big.png')}
                                            style={{ height: 60, width: 60, resizeMode: 'contain', borderRadius:100 }}
                                        />
                                    ) : (
                                        <Image
                                            source={{ uri: profileImage }}
                                            style={{ height: 60, width: 60, resizeMode: 'contain', borderRadius:100 }}
                                        // style={xStyle.topbar_btn_mb}
                                        />
                                    )
                                }
                            </View>
                            <View>
                                <Text style={xStyle.prof_user_name}>{name.length > 15 ? name.substring(0, 15) + '...' : name}</Text>
                                <View style={xStyle.prof_user_contact_info_txt_view}>
                                    <Text style={xStyle.prof_user_contact_info}>{email.length > 15 ? email.substring(0, 15) + '...' : email}</Text>
                                </View>
                                <Text style={xStyle.prof_user_contact_info}>{phone}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={contactInfoModalHandler}>
                            <Image
                                source={require('../assets/images/editicon.png')}
                            // style={xStyle.topbar_btn_mb}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={xStyle.prof_personal_view}>
                        <View style={xStyle.prof_personal_text_view}>
                            <Text style={xStyle.prof_user_personal_info_title}>Address: <Text style={xStyle.prof_user_contact_info}>{address}</Text></Text>
                            <Text style={xStyle.prof_user_personal_info_title}>Country: <Text style={xStyle.prof_user_contact_info}>{selectedCountry}</Text></Text>
                            <Text style={xStyle.prof_user_personal_info_title}>State: <Text style={xStyle.prof_user_contact_info}>{selectedState}</Text></Text>
                            <Text style={xStyle.prof_user_personal_info_title}>City: <Text style={xStyle.prof_user_contact_info}>{city}</Text></Text>
                            <Text style={xStyle.prof_user_personal_info_title}>Pin: <Text style={xStyle.prof_user_contact_info}>{pin}</Text></Text>
                        </View>
                        <TouchableOpacity onPress={personalInfoModalHandler}>
                            <Image
                                source={require('../assets/images/editicon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[xStyle.prof_change_password_view, xStyle.mb200]}>
                        <TouchableOpacity
                            // style={xStyle.mb200}
                            onPress={() => navigation.navigate('changepassword')}
                        >
                            <Text style={xStyle.prof_change_password_btn_txt}>
                                Change Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer />

            {/* --------CONTACT INFO MODAL------- */}

            <View>
                <Overlay
                    // animationType={ZoomIn}
                    // transparent={true}
                    visible={contactInfoModalVisibility}
                    // // isVisible={contactInfoModalVisibility}
                    // onRequestClose={contactBackbuttonhandler}
                    // hasBackdrop={true}
                    // backdropColor={'black'}
                    // // statusBarTranslucent={true}
                    // backdropOpacity={0.5}
                    onClose={contactBackbuttonhandler}
                    closeOnTouchOutside
                    containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
                    childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
                >

                    <TouchableOpacity
                        style={xStyle.buy_join_modal_cross}
                        onPress={contactBackbuttonhandler}
                    >
                        <Image
                            source={require('../assets/images/close-circle.png')}
                        />
                    </TouchableOpacity>

                    <View style={xStyle.buy_join_modal_head_view}>
                        <View style={xStyle.prof_upload_img_sec}>
                            {/* <Image
                                // source={require('../assets/images/profgrey.png')}
                                source={{ uri: profileImage }}
                                style={xStyle.prof_upload_img_margin}
                            /> */}
                            {profileImage === null || profileImage === '' || profileImage === undefined ?
                                (
                                    <Image
                                        source={require('../assets/images/profgrey.png')}
                                        style={xStyle.prof_upload_img_margin}
                                    />
                                ) : (
                                    <Image
                                        source={{ uri: profileImage }}
                                        style={xStyle.prof_upload_img_margin}
                                    // style={xStyle.topbar_btn_mb}
                                    />
                                )
                            }
                            
                            <TouchableOpacity style={xStyle.prof_upload_camera_btn} onPress={handleUploadGalPhoto}>
                                <Image
                                    source={require('../assets/images/camera.png')}
                                />
                            </TouchableOpacity>
                            <View style={{marginTop:'8%'}}>
                                <Text style={xStyle.prof_upload_img_txt}>Upload your Image</Text>
                            </View>
                        </View>
                    </View>

                    <View style={xStyle.buy_join_modal_body}>
                        <Text style={xStyle.buy_join_modal_legend}>Name</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput
                                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder="Your Name"
                                placeholderTextColor={'#7B8890'}
                                value={name}
                                onChangeText={(e) => setName(e)}
                            />
                            <Image
                                source={require('../assets/images/profile-circle.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            />
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>Email</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput
                                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder='Your email address'
                                placeholderTextColor={'#7B8890'}
                                value={email}
                                onChangeText={(e) => setEmail(e)}
                                editable={false}
                            />
                            <Image
                                source={require('../assets/images/smsbox.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            />
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>Phone no</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput
                                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder='Your phone number'
                                placeholderTextColor={'#7B8890'}
                                value={phone}
                                onChangeText={(e) => setPhone(e)}
                            />
                            <Image
                                source={require('../assets/images/call.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={xStyle.howToSouthShoreJoinNowBtn} onPress={savePersonalData}>
                        <Text style={[xStyle.howToSouthShoreJoinNowBtnText, xStyle.buy_submit_font]}>Save</Text>
                    </TouchableOpacity>



                </Overlay>
            </View>

            {/* --------PERSONAL INFO MODAL------- */}

            <View>
                <Overlay
                    // animationType={ZoomIn}
                    // transparent={true}
                    visible={personalInfoModalVisibility}
                    // // isVisible={contactInfoModalVisibility}
                    // onRequestClose={contactBackbuttonhandler}
                    // hasBackdrop={true}
                    // backdropColor={'black'}
                    // // statusBarTranslucent={true}
                    // backdropOpacity={0.5}
                    onClose={personalBackbuttonhandler}
                    closeOnTouchOutside
                    containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
                    childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
                >

                    <TouchableOpacity
                        style={xStyle.buy_join_modal_cross}
                        onPress={personalBackbuttonhandler}
                    >
                        <Image
                            source={require('../assets/images/close-circle.png')}
                        />
                    </TouchableOpacity>
                    <View style={xStyle.buy_join_modal_body}>
                        <Text style={xStyle.buy_join_modal_legend}>Address</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput
                                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder="Your Address"
                                placeholderTextColor={'#7B8890'}
                                value={address}
                                onChangeText={(e) => setAddress(e)}
                            />
                            {/* <Image
                                source={require('../assets/images/profile-circle.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            /> */}
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>Country</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            {/* <Text style={xStyle.buy_join_modal_legend}>ID : {countryIdSelected}</Text> */}
                            {/* <Text style={xStyle.buy_join_modal_legend}>Name : {selectedCountry}</Text> */}
                            <View style={xStyle.prof_picker_view}>
                                <Picker
                                    style={xStyle.categoryDetailsDropDownPicker}
                                    selectedValue={countryIdSelected}
                                    onValueChange={(itemValue, itemIndex) => {
                                        sortCountrySelectionChange(itemValue, itemIndex)
                                        // setCountryIdSelected(itemValue)
                                    }}
                                >
                                    <Picker.Item label="Please Select" value="0" />
                                    {
                                        countryList.map((data, index) => (
                                            // NOTE - WE CAN SEND OBJECT VALUE IN PICKER
                                            // <Picker.Item label={data.name} value={{ id: data.id, name: data.name }} key={index} />
                                            <Picker.Item label={data.name} value={data.id} key={index} />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>State</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <View style={xStyle.prof_picker_view}>
                                <Picker
                                    style={xStyle.categoryDetailsDropDownPicker}
                                    selectedValue={stateIdSelected}
                                    onValueChange={(itemValue, itemIndex) =>
                                        sortStateSelectionChange(itemValue, itemIndex)
                                    }
                                >
                                    <Picker.Item label="Please Select" value="0" />
                                    {
                                        stateList.map((data, index) => (
                                            // NOTE - WE CAN SEND OBJECT VALUE IN PICKER
                                            // <Picker.Item label={data.name} value={{ id: data.id, name: data.name }} key={index} />
                                            <Picker.Item label={data.name} value={data.id} key={index} />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>City</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput
                                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder='Your City'
                                placeholderTextColor={'#7B8890'}
                                value={city}
                                onChangeText={(e) => setCity(e)}
                            />
                            {/* <Image
                                source={require('../assets/images/call.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            /> */}
                        </View>
                        <Text style={xStyle.buy_join_modal_legend}>Pin</Text>
                        <View style={xStyle.buy_join_modal_input_view}>
                            <TextInput
                                style={[xStyle.buy_join_modal_input, xStyle.buy_join_modal_input_height]}
                                placeholder='Your Pin'
                                placeholderTextColor={'#7B8890'}
                                value={pin}
                                onChangeText={(e) => setPin(e)}
                            />
                            {/* <Image
                                source={require('../assets/images/call.png')}
                                style={xStyle.buy_join_modal_input_icon}
                            /> */}
                        </View>
                    </View>
                    <TouchableOpacity style={xStyle.howToSouthShoreJoinNowBtn} onPress={saveContactdata}>
                        <Text style={[xStyle.howToSouthShoreJoinNowBtnText, xStyle.buy_submit_font]}>Save</Text>
                    </TouchableOpacity>
                </Overlay>
            </View>

        </SafeAreaView>
    )
}
export default Profile;