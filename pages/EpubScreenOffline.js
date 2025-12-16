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
    ActivityIndicator
} from 'react-native';
import FooterPub from '../Global/FooterPub.js';
import TopBar from '../Global/TopBar.js';
import Footer from '../Global/Footer.js';
import { useAuth } from '../Context/Authcontext.js';
import { UserProfile } from '../Context/Usercontext.js';
import Config from "../config/Config.json"
import { Reader, useReader } from '@epubjs-react-native/core';
import RNFS from 'react-native-fs';
import TopBarReader from '../Global/TopBarReader.js';
import { createHybridFileSystem } from './useHybridFileSystem';


const ReaderContent = (props) => {
  console.log("ReaderContent",props)
  const FS = createHybridFileSystem;
  const [localUri, setLocalUri] = useState(null);
    const { width, height } = Dimensions.get('window');
    useEffect(() => {
        setLocalUri(props.local_url);
    }, []);

  if (!localUri) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading EPUB...</Text>
      </View>
    );
  }

  return (
    <View style={styles.readerContainer}>
      {/* ✅ Render Reader only after localUri is ready */}
      <Reader
        src={localUri}
        width={width}
        height={height * 0.82}
        fileSystem={FS} 
      />
      
    </View>
  );
};

export default function EpubScreenOffline({route,navigation}) {
console.log("EPUB",route.params.epub)
const {authData} = useAuth()
const { getBookShelf,myBookList} = UserProfile()
const [urifile, setFile] = useState();
const [loadingContent, setLoadingContent] = useState(true);
//const EPUB_URL = `https://react-reader.metabits.no/files/alice.epub`;




    return (
        <ScrollView>
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

            <ReaderContent
            local_url={Platform.OS === 'android'? 'file://' + route.params.epub.url: route.params.epub.url}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  readerContainer: { flex: 1 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  btn: { flex: 1, padding: 15, alignItems: 'center' },
  btnText: { fontWeight: 'bold', fontSize: 16 },
});
