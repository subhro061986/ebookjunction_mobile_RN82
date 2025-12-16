import React, { Component } from 'react';
import xStyle from '../assets/css/x_style.js';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
// import { useAuth } from '../context/AuthContext.js';
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../Context/Usercontext';
import Config from "../config/Config.json"

export const PubList = () => {

    const navigation = useNavigation();
    const { allActivePublisher } = UserProfile()

    // useEffect(() => {
    //   }, [])

    const goToCatagory = (val) => {
        console.log('pub_data', val);
        navigation.navigate('pubhome', { publisher_id: val.id })
      }

    return (
        <>
            <View style={xStyle.publist_bg}>
                <View style={xStyle.publist_head_view}>
                    <Text style={xStyle.publist_head}>Listed Publishers</Text>
                </View>
                <ScrollView horizontal={true}>
                    {allActivePublisher.map((data, index) => (

                        data.isactive === 1 && (
                            <TouchableOpacity
                                key={index}
                                onPress={() => goToCatagory(data)}
                            >
                                <View style={xStyle.pub_cards}>
                                    <Image
                                        // source={require('../assets/images/pub_1.png')}
                                        source={{uri:Config.API_URL + Config.PUB_IMAGES + data.id + '/' + data.logo}}
                                        style={{
                                            height:108,
                                            width:85,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </View>
                                <Text style={xStyle.pub_name}>{data.name}</Text>
                            </TouchableOpacity>
                        )

                    ))}
                    {/* <View>
                        <TouchableOpacity style={xStyle.pub_cards}>
                            <Image
                                source={require('../assets/images/pub_2.png')}
                            />
                        </TouchableOpacity>
                        <Text style={xStyle.pub_name}>Simon & Schuster</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={xStyle.pub_cards}>
                            <Image
                                source={require('../assets/images/pub_3.png')}
                            />
                        </TouchableOpacity>
                        <Text style={xStyle.pub_name}>Houghton Mifflin..</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={xStyle.pub_cards}>
                            <Image
                                source={require('../assets/images/pub_1.png')}
                            />
                        </TouchableOpacity>
                        <Text style={xStyle.pub_name}>Penguin Books</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={xStyle.pub_cards}>
                            <Image
                                source={require('../assets/images/pub_2.png')}
                            />
                        </TouchableOpacity>
                        <Text style={xStyle.pub_name}>Simon & Schuster</Text>
                    </View> */}
                </ScrollView>
            </View>
        </>
    )
}
export default PubList;