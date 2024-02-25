/* eslint-disable */
import {View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {useContext} from "react";
import {AuthContext} from "../contexes/auth-context";
import {BottomNav, TopNav} from "../components";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Profile, Homepage, AppSettings, MakePost} from "../screens";
import {CustomButton} from "../components";
import {designChoices} from "../../GlobalConsts";

const Welcome = ({navigation}) => {
    return (
        <View style={styles.root}>
            <View style={styles.countContainer}>
                <Text>Spark Social</Text>
            </View>
            <View style={styles.countContainer}>
                <Text>Change the World</Text>
            </View>
            <CustomButton text={'Log In'} onPress={() => navigation.navigate('Login')}/>
            <CustomButton text={'Sign Up'} onPress={() => navigation.navigate('Signup')}/>
        </View>
    );
}

const TabsStack = createNativeStackNavigator()
const MainApp = ({navigation}) => {
    const {userToken, login, logout} = useContext(AuthContext)
    return (
        <View style={styles.bigContainer}>
            <View style={styles.root}>
                <TabsStack.Navigator initialRouteName='Homepage'>
                    <TabsStack.Screen name='Homepage' options={{headerShown: false}} component={Homepage}/>
                    <TabsStack.Screen name='AppSettings' options={{headerShown: false}} component={AppSettings}/>
                    <TabsStack.Screen name='Profile' options={{headerShown: false}} component={Profile}/>
                    <TabsStack.Screen name={'MakePost'} options={{headerShown: false}} component={MakePost} />
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
    bigContainer: {
        display: "flex",
        height: '100%',
    },
    root: {
        flexGrow: 1,
        //paddingHorizontal: 20,
    },
    bottom_nav_container: {
        width: '100%',
        marginTop: "auto"
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,

    }
})
