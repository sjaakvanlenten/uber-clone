import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import MapView from 'react-native-maps';
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack';
import RideOptionsCard from '../components/RideOptionsCard';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const MapScreen = () => {
    const Stack = createStackNavigator();
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full
                shadow-lg`}
            >
                <Icon name="menu" />
            </TouchableOpacity>
            
            <View style={tw`h-1/2` }>
                <Map />
            </View>

            <View style={tw`h-1/2` }>
                <Stack.Navigator initialRouteName="NavigateCard" screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                            gestureEnabled: true
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({

});
