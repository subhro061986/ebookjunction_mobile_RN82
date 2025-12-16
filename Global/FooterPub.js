import React, { Component, useEffect, useState } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
  View,
  Text,
  Image,
  TouchableOpacity,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Overlay from 'react-native-modal-overlay';
import { ScrollView } from 'react-native-gesture-handler';

import { UserProfile } from '../Context/Usercontext.js';

export const FooterPub = () => {
  const navigation = useNavigation();
  const { categoryByPublisherList } = UserProfile();
  const [categoryModalvisibility, setCategoryModalvisibility] = useState(false);

  useEffect(() => {
    // console.log("categories", categoryByPublisherList)
  }, []);

  const modalHandler = () => {
    setCategoryModalvisibility(true);
  }

  const backButtonHandler = () => {
    setCategoryModalvisibility(false);
  }

  const getCatgegoryData = (data) => {
    console.log("data : ", data.id);
    navigation.navigate('categorydetails',
      { category_id: data.id }
    )
    setCategoryModalvisibility(false);
  }

  return (
    <>
      <View style={xStyle.bottomnav}>
        <TouchableOpacity
          style={xStyle.footerBtn}
          onPress={() => navigation.navigate('home')}
        >
          <Image
            source={require('../assets/images/home.png')}
          />
          <Text style={xStyle.footerIconText}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={xStyle.footerBtn}
          onPress={modalHandler}
        >
          <Image
            source={require('../assets/images/categoryicon.png')}
          />
          <Text style={xStyle.footerIconText}>
            Categories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={xStyle.footerBtn}>
          <Image
            source={require('../assets/images/newarrivals.png')}
          />
          <Text style={xStyle.footerIconText}>
            New Arrivals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={xStyle.footerBtn}>
          <Image
            source={require('../assets/images/bestsellers.png')}
          />
          <Text style={xStyle.footerIconText}>
            Best Sellers
          </Text>
        </TouchableOpacity>
      </View>
      {/* --------PUBLISHER LIST MODAL------- */}

      <View>
        <Overlay
          // animationType={ZoomIn}
          // transparent={true}
          visible={categoryModalvisibility}
          // // isVisible={modalvisibility}
          // onRequestClose={backbuttonhandler}
          // hasBackdrop={true}
          // backdropColor={'black'}
          // // statusBarTranslucent={true}
          // backdropOpacity={0.5}
          onClose={backButtonHandler}
          closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(38, 37, 37, 0.78)' }}
          childrenWrapperStyle={{ backgroundColor: '#FFFFFF', borderRadius: 30 }}
        >
          <TouchableOpacity
            style={xStyle.buy_join_modal_cross}
            onPress={backButtonHandler}
          >
            <Image
              source={require('../assets/images/close-circle.png')}
            />
          </TouchableOpacity>
          <View style={xStyle.buy_join_modal_head_view}>
            <Text style={xStyle.buy_join_modal_head}>Select Category</Text>
          </View>
          <ScrollView>
            <View style={xStyle.list_modal_view}>
              {
                categoryByPublisherList.map((data, index) => (
                  <TouchableOpacity
                    style={[xStyle.list_modal_card_view, { alignItems: 'center' }]}
                    key={index}
                    onPress={() => getCatgegoryData(data)}
                  >
                    <View style={[xStyle.list_modal_card, { width: 50, height: 50, alignItems: 'center' }]}>
                      <Image
                        source={require('../assets/images/categoryimg.png')}
                        // width={90}
                        style={[xStyle.list_modal_icon, { height: 25, width: 25 }]}
                      // style={{resizeMode:'contain'}}
                      />
                    </View>
                    <Text style={xStyle.list_modal_legend}>{data.name}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          </ScrollView>
        </Overlay>
      </View>
    </>
  )
}
export default FooterPub;