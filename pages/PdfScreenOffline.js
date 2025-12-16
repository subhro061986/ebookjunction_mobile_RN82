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
    Dimensions
} from 'react-native';

import { useAuth } from '../Context/Authcontext.js';
import { UserProfile } from '../Context/Usercontext.js';
import Config from "../config/Config.json"
import Pdf from 'react-native-pdf';
import TopBarReader from '../Global/TopBarReader.js';
import { WebView } from 'react-native-webview';

export const PdfScreenOffline = ({route,navigation}) => {

const {authData} = useAuth()
const { getBookShelf,myBookList} = UserProfile()
const [loadingContent, setLoadingContent] = useState(true);
const EPDF_URL = `file://${route.params.epdf.url}`
useEffect(() => {
console.log("PDF URL===>",route.params.epdf)
}, [authData]);

    return (
        <>
            <View style={xStyle.topbar}>
                <View style={[xStyle.topbar, {paddingTop: StatusBar.currentHeight}]}>
                                            <View style={[xStyle.topnav_top, { justifyContent: 'flex-start' }]}>
                                                <TouchableOpacity style={xStyle.topbar_back_btn}
                                                    onPress={() => navigation.navigate('offlinebookshelf')}
                                                >
                                                    <Image
                                                        source={require('../assets/images/backbtn.png')}
                                                    />
                                                </TouchableOpacity>
                                               
                                                
                                            </View>
                            </View>
            </View>
        
        {/* <PDFView
          fadeInDuration={250.0}
          style={{width:'100%',height: Dimensions.get('screen').height}}
          resource={EPDF_URL}
          resourceType='file'
          onLoad={() => 
            setLoadingContent(false)
            //console.log(`PDF rendered from URL`)
            }
          onError={(error) => console.log('Cannot render PDF', error)}
          horizontal={true}
        /> */}
            <View style={{ flex: 1 }}>
                    <Pdf
                        source={{ uri: EPDF_URL, cache: true }}
                        style={{ flex: 1 }}
                    />
            </View>        
        
        </>
    )
}
export default PdfScreenOffline;