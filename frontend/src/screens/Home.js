/* eslint-disable */
import {View, Text, TouchableOpacity} from 'react-native';
import {useContext} from "react";
import {AuthContext} from "../../auth-context";

const Welcome = ({navigation}) => {
    return (
        <View>
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
        <View>
            <Text>You are logged in</Text>
            <Text onPress={logout}>Log Out</Text>
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
