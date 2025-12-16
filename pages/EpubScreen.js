import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image
} from 'react-native';

import { Reader, useReader } from '@epubjs-react-native/core';
import RNFS from 'react-native-fs';
//import { useHybridFileSystem } from './useHybridFileSystem';
import { createHybridFileSystem } from './useHybridFileSystem';
import xStyle from '../assets/css/x_style.js';
import TopBarReader from '../Global/TopBarReader.js';
const { width, height } = Dimensions.get('window');

const REMOTE_EPUB_URL = 'https://react-reader.metabits.no/files/alice.epub';
const LOCAL_EPUB_PATH = RNFS.DocumentDirectoryPath + '/alice.epub';

// ✅ Keep your original FS reference


/* Controls Component */


const ReaderContent = (props) => {
  console.log("ReaderContent",props)
  const FS = createHybridFileSystem;
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    let mounted = true;

    const prepareEpub = async () => {
      try {
        //const exists = await RNFS.exists(LOCAL_EPUB_PATH);
        const exists = await RNFS.exists(props.local_url);
        if (!exists) {
          console.log('⬇️ Downloading EPUB...');
          await RNFS.downloadFile({
            fromUrl: props.remote_url,
            toFile: props.local_url,
          }).promise;
          console.log('✅ EPUB downloaded');
        }

        if (mounted && !localUri) { // ✅ Only set once
          const uri =
            Platform.OS === 'android'
              ? 'file://' + props.local_url
              : props.local_url;

          setLocalUri(uri); // ✅ Stable URI prevents reload loop
        }
      } catch (e) {
        console.error('❌ EPUB prepare error:', e);
      }
    };

    prepareEpub();

    return () => {
      mounted = false;
    };
  }, []); // ✅ Run only once

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

export default function EpubReaderScreen({ route, navigation }) {
  const EPUB_URL = route.params.epub;
  const fileName = EPUB_URL.split("/");
  const latFname = fileName[fileName.length - 1]
  const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/` + latFname;
  console.log("EPUB_PATH",EPUB_PATH);
  console.log("EPUB_URL",EPUB_URL);
  return (
    < ScrollView style={styles.container}>
      <TopBarReader/>
      <ReaderContent 
        remote_url={EPUB_URL}
        local_url={EPUB_PATH}
      />
    </ScrollView>
  );
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
