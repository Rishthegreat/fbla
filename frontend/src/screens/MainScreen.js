/* eslint-disable */
import {View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, Dimensions} from 'react-native';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {BottomNav, OtherProfile, TopNav} from "../components";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Homepage, AppSettings, MakePost, UserProfile} from "../screens";
import {CustomButton} from "../components";
import {designChoices} from "../../GlobalConsts";
import {ProfileContext} from "../contexes/ProfileContext";
import Logo from '../../assets/images/Logo.png'
import Svg, {Path} from "react-native-svg";

const Welcome = ({navigation}) => {
    return (
        <View style={{height: "100%"}}>
            <View style={styles.rootWelcome}>
                <View style={styles.welcomeLogoTextContainer}>
                    <Image source={Logo} style={{width: 200, height: 200}}/>
                    <Text style={styles.welcomeText}>Spark Social</Text>
                    <Text style={{...styles.welcomeText, fontSize: 16}}>Change the World</Text>
                </View>
                <Text style={{textAlign: "center", marginBottom: 10}}>Share your achievements with others and create new
                    connections with students all around the world.</Text>
                <View style={{display: "flex", flexDirection: "column", gap: 0, marginTop: "auto", zIndex: 2}}>
                    <CustomButton type={'primary'} text={'Log In'} onPress={() => navigation.navigate('Login')}/>
                    <CustomButton type={'primary'} text={'Sign Up'} onPress={() => navigation.navigate('Signup')}/>
                </View>
            </View>
            <View style={{position: "absolute", bottom: 0, width: "100%", zIndex: -1}}>
                <Svg style={{margin: 0, padding: 0}} height={320} width={1440} viewBox={"0 0 1440 320"}>
                    <Path fill={designChoices.secondary} fill-opacity="1"
                          d="M0,128L34.3,133.3C68.6,139,137,149,206,144C274.3,139,343,117,411,117.3C480,117,549,139,617,170.7C685.7,203,754,245,823,245.3C891.4,245,960,203,1029,170.7C1097.1,139,1166,117,1234,122.7C1302.9,128,1371,160,1406,176L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></Path>
                </Svg>
            </View>
        </View>
    )
}

const TabsStack = createNativeStackNavigator()
const MainApp = ({navigation}) => {
    const {userToken, login, logout} = useContext(AuthContext)
    const {otherProfileId} = useContext(ProfileContext)
    return (
        <View style={styles.bigContainer}>
            {otherProfileId &&
                <View style={{zIndex: 99}}>
                    <OtherProfile profileId={otherProfileId}/>
                </View>
            }
            <KeyboardAvoidingView behavior={'height'} style={styles.rootApp}>
                <TabsStack.Navigator initialRouteName='Homepage'>
                        <TabsStack.Screen name='Homepage' options={{headerShown: false}} component={Homepage}/>
                        <TabsStack.Screen name='AppSettings' options={{headerShown: false}} component={AppSettings}/>
                        <TabsStack.Screen name='UserProfile' options={{headerShown: false}} component={UserProfile}/>
                        <TabsStack.Screen name={'MakePost'} options={{headerShown: false}} component={MakePost} />
                    </TabsStack.Navigator>
            </KeyboardAvoidingView>
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
        height: '100%'
    },
    rootWelcome: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "transparent",
        height: '100%',
    },
    rootApp: {
        flexGrow: 1,
        backgroundColor: designChoices.white,
    },
    bottom_nav_container: {
        width: '100%'
    },
    welcomeLogoTextContainer: {
        alignItems: 'center',
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 10
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: "bold"
    }
})
