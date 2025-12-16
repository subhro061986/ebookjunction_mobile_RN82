import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export function createHybridFileSystem() {
  const documentDirectory = RNFS.DocumentDirectoryPath;

  const normalizePath = (path) =>
    Platform.OS === 'android' ? 'file://' + path : path;

  return {
    documentDirectory,

    downloadAsync: async (url, fileUri) => {
      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: fileUri,
      }).promise;

      return {
        uri: normalizePath(fileUri),
        status: 200,
        headers: {},
      };
    },

    writeAsStringAsync: async (fileUri, content) =>
      RNFS.writeFile(fileUri, content, 'utf8'),

    readAsStringAsync: async (fileUri) =>
      RNFS.readFile(fileUri, 'utf8'),

    deleteAsync: async (fileUri) => {
      const path = Platform.OS === 'android' ? fileUri.replace('file://', '') : fileUri;
      const exists = await RNFS.exists(path);
      if (exists) await RNFS.unlink(path);
    },

    getInfoAsync: async (fileUri) => {
      const path = Platform.OS === 'android' ? fileUri.replace('file://', '') : fileUri;
      const exists = await RNFS.exists(path);
      let size = 0;
      if (exists) {
        const stat = await RNFS.stat(path);
        size = Number(stat.size);
      }
      return { exists, size };
    },
  };
}
