import React, { Component } from 'react';
import {View,Image} from 'react-native';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

export const ActivityLoader=(props)=>{
    return(
      <OrientationLoadingOverlay
            visible={props.isLoaderShow}
            >
            <View>
              <Image
                source={require('../assets/images/playstore.png')}
                style={{height:50,width:50}}
                />
            </View>
          </OrientationLoadingOverlay>
    )
  }
  export default ActivityLoader;