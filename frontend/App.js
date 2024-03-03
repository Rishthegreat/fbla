/* eslint-disable */

import {Login, Signup, MainScreen} from './src/screens';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthProvider} from "./src/contexes/auth-context";
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {backendLink} from "./GlobalConsts";
import {AlertProvider} from "./src/contexes/AlertContext";
import {AlertPopup} from "./src/components";
import {setContext} from "@apollo/client/link/context";
import {MMKV} from "react-native-mmkv";
import {ProfileProvider} from "./src/contexes/ProfileContext";
import {LogBox} from "react-native";

const storage = new MMKV()
const Stack = createNativeStackNavigator()
const httpLink = createHttpLink({
    uri: backendLink
})
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    //const {userToken} = useContext(AuthContext)
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: storage.contains('userToken') ? `Bearer ${storage.getString('userToken')}` : "",
        }
    }
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export const App = () => {
    LogBox.ignoreAllLogs()
    return (
        <AlertProvider>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <ProfileProvider>
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
                    </ProfileProvider>
                </AuthProvider>
            </ApolloProvider>
        </AlertProvider>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: "relative",
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
