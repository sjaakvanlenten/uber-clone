import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from "react-redux";
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';

export default function App() {
  const Stack = createStackNavigator();


  
  return (
      <Provider store={store}>
          <NavigationContainer>
                <SafeAreaProvider>
                    <KeyboardAvoidingView 
                        style={{ flex: 1 }}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
                    >    
                        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
                            <Stack.Screen
                                name="HomeScreen"
                                component={HomeScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="MapScreen"
                                component={MapScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: true,
                                }}
                            />
                        </Stack.Navigator>
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </NavigationContainer>
      </Provider>
  );
}

