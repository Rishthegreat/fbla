/* eslint-disable */

import {Login, Signup, MainScreen, AppSettings} from './src/screens';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthProvider} from "./src/contexes/auth-context";
import {ApolloClient, InMemoryCache, ApolloProvider, useLazyQuery} from '@apollo/client';
import {backendLink} from "./GlobalConsts";
import {AlertProvider} from "./src/contexes/AlertContext";
import {AlertPopup} from "./src/components";

const Stack = createNativeStackNavigator()
const client = new ApolloClient({
    uri: backendLink,
    cache: new InMemoryCache()
});
export const App = () => {
    return (
        <AlertProvider>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <NavigationContainer style={styles.root}>
                        <Stack.Navigator initialRouteName={MainScreen}>
                            <Stack.Screen name='MainScreen' options={{headerShown: false}} component={MainScreen}/>
                            <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
                            <Stack.Screen name='Signup' options={{headerShown: false}} component={Signup}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                    <View style={styles.alert_container}>
                        <AlertPopup />
                    </View>
                </AuthProvider>
            </ApolloProvider>
        </AlertProvider>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: "relative"
    },
    alert_container: {
        top: 10,
        left: 0,
        width: '100%',
        position: "absolute",
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    }
})
