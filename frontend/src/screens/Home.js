/* eslint-disable */
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useContext} from "react";
import {AuthContext} from "../../auth-context";
import {AppSettings} from "./AppSettings";
import {BottomNav, TopNav} from "../components";

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

const MainPage = ({navigation}) => {
    const {userToken, login, logout} = useContext(AuthContext)

    return (
        <View style={styles.root}>
            <TopNav />
            <Text>You are logged in</Text>
            <AppSettings />
            <View style={styles.bottom_nav_container}>
                <BottomNav />
            </View>
        </View>
    )
}
export const Home = ({navigation}) => {
    const {userToken} = useContext(AuthContext)
    return (
        <View>
            {userToken !== null ? <MainPage navigation={navigation} /> : <Welcome navigation={navigation} />}
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
        bottom: 10,
        width: '100%'
    }
})
