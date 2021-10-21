import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity, } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from 'react-redux';
import { Icon } from "react-native-elements";
import * as Location from 'expo-location';


import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();

    function getLocation() {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          location = {lat : location.coords.latitude, lng : location.coords.longitude}
          console.log(location);
          dispatch(
            setOrigin({
                location: location,
                description: 'Current Location'
            })
        );
        })();
      }

    
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
         
        text = JSON.stringify(location);
       
      }
    




    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image  
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                    source={{
                        uri: "https://links.papareact.com/gzs"
                    }}
                />

                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    onPress={(data, details = null) => {
                        console.log(data);
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description
                            })
                        );

                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                <NavOptions />
                <NavFavourites />
                <TouchableOpacity style={tw`flex-row items-center p-5`}
                    onPress={() => getLocation()}
                >
                    
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name='home'
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-bold text-lg`}>test</Text>
                        <Text style={styles.paragraph}>{text}</Text>
                    </View>
                </TouchableOpacity>               
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({})
