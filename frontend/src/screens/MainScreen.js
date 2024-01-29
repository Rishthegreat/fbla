/* eslint-disable */
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useContext} from "react";
import {AuthContext} from "../contexes/auth-context";
import {AppSettings} from "./AppSettings";
import {BottomNav, TopNav} from "../components";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Homepage} from "./Homepage";
import {Profile} from "./Profile";

const Welcome = ({navigation}) => {
    return (
        <View style={styles.root}>
            <Text>Welcome to our application</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const TabsStack = createNativeStackNavigator()
const MainApp = ({navigation}) => {
    const {userToken, login, logout} = useContext(AuthContext)
    return (
        <View>
            <View style={styles.root}>
                <TabsStack.Navigator initialRouteName='Homepage'>
                    <TabsStack.Screen name='Homepage' options={{headerShown: false}} component={Homepage}/>
                    <TabsStack.Screen name='AppSettings' options={{headerShown: false}} component={AppSettings}/>
                    <TabsStack.Screen name='Profile' options={{headerShown: false}} component={Profile}/>
                </TabsStack.Navigator>
            </View>
            <View style={styles.bottom_nav_container}>
                <BottomNav navigation={navigation} />
            </View>
        </View>
    )
}
export const MainScreen = ({navigation}) => {
    const {userToken} = useContext(AuthContext)
    return (
        <View>
            {userToken !== null ? <MainApp navigation={navigation} /> : <Welcome navigation={navigation} />}
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 20,
        height: '100%'
    },
    bottom_nav_container: {
        position: "absolute",
        bottom: 0,
        width: '100%',
    }
})
