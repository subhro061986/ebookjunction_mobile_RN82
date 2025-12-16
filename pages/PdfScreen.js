import React, { Component, useState, useEffect,useRef } from 'react';
import xStyle from '../assets/css/x_style.js';
import { WebView } from 'react-native-webview';
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
import RNBlobUtil from 'react-native-blob-util';

export const PdfScreen = ({route,navigation}) => {

const {authData} = useAuth()
const { getBookShelf,myBookList,bookMarkForPdf,markPdf} = UserProfile()
const [loadingContent, setLoadingContent] = useState(true);
const [currentPage, setCurrentPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const [localFile, setLocalFile] = useState(null);
const EPDF_URL = route.params.epdf
const inputRef = useRef(markPdf);
useEffect(() => {
console.log("PDF URL===>",route.params.epdf)
}, [authData]);

useEffect(() => {
    download()
    setCurrentPage(markPdf)
    inputRef.current=markPdf
    }, [markPdf]);


const download = async () => {

    setLoadingContent(true);
      const path = RNBlobUtil.fs.dirs.CacheDir + '/temp.pdf';

      try {
        const res = await RNBlobUtil.config({ path }).fetch('GET', EPDF_URL);

        const filePath = res.path();
        console.log('Downloaded:', filePath);

        setLocalFile(`file://${filePath}`);
        setLoadingContent(false);
      } catch (err) {
        console.log('Download Error:', err);
        setLoadingContent(false);
      }
    };

const setBookmark=async(val,count)=>{
    console.log("CHECK PAGE",val)
    setCurrentPage(val)
    setTotalPages(count)
    if(val >0){
        const resp = await bookMarkForPdf(val)
    }
    else{
        setCurrentPage(markPdf)
        inputRef.current=markPdf
    }
    
}
const chkBookMark=async(pdf)=>{
    const resp = await bookMarkForPdf(pdf)
    //inputRef.current=pdf
}

    return (
        <>
            <TopBarReader/>
        {loadingContent===true &&
        <View 
            style={{
                // flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#ffffff',
                height:Dimensions.get('screen').height,
                //paddingVertical:Dimensions.get('screen').height*0.1
            }}>
        <Image
            source={require('../assets/images/playstore.png')}
            style={{height:50,width:50}}
          />
          <Text style={xStyle.pub_home_best_card_title}>Loading</Text>
        </View>
        }
            <View style={{ flex: 1 }}>
            <Pdf
                source={{ uri: localFile }}
                style={{ flex: 1 }}
            />
            </View>
        
        </>
    )
}
export default PdfScreen;