/* eslint-disable */

import {Login, Signup, MainScreen, AppSettings} from './src/screens';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthProvider} from "./auth-context";

const Stack = createNativeStackNavigator()
export const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer style={styles.root}>
                <Stack.Navigator initialRouteName={MainScreen}>
                    <Stack.Screen name='MainScreen' options={{headerShown: false}} component={MainScreen}/>
                    <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
                    <Stack.Screen name='Signup' options={{headerShown: false}} component={Signup}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});
