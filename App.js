import React from 'react';
import {
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './navs/Navigation';
import { UserProvider } from './Context/Usercontext';
import { AuthProvider } from './Context/Authcontext';
import { ReaderProvider } from '@epubjs-react-native/core';

const App = () => {
  return (
    <ReaderProvider>
    <SafeAreaProvider>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <AuthProvider>
        <UserProvider>
          <SafeAreaView
            style={{ flex: 1 }}
            edges={['left', 'right', 'bottom']}
          >
            <Navigation />
          </SafeAreaView>
        </UserProvider>
      </AuthProvider>

    </SafeAreaProvider>
    </ReaderProvider>
  );
};

export default App;
