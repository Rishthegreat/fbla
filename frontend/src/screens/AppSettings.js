/* eslint-disable */

import {useCallback, useContext, useEffect} from "react";
import {AuthContext} from "../contexes/auth-context";
import {CustomButton} from "../components";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TempLogo from '../../assets/images/Logo.png'
import {useFocusEffect} from "@react-navigation/native";
import {designChoices} from "../../GlobalConsts";

const IndividualSetting = ({name}) => {
    return (
        <TouchableOpacity style={settingStyles.individual_setting_container}>
            <Text style={settingStyles.setting_text}>{name}</Text>
        </TouchableOpacity>
    )
}

const settingStyles = StyleSheet.create({
    individual_setting_container: {
        width: '100%',
        paddingVertical: 7
    },
    setting_text: {
        fontSize: 17
    }
})

export const AppSettings = ({navigation}) => {
    const {logout, setCurrentTab} = useContext(AuthContext)
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => setCurrentTab('AppSettings'), [])
    )
    return (
        <View style={styles.root}>
            <Image source={TempLogo} style={styles.user_pic} resizeMode='contain' />
            <Text style={styles.title}>Change and View Settings</Text>
            <View style={styles.individual_settings_container}>
                <IndividualSetting name='Account Settings' />
                <IndividualSetting name='Theme' />
                <IndividualSetting name='Visibility' />
            </View>
            <CustomButton text={'Log Out'} onPress={logout} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        height: '100%',
        width: '100%',
        backgroundColor: designChoices.white
    },
    title: {
        fontSize: 20,
        textAlign: "center"
    },
    user_pic: {
        height: '30%',
        aspectRatio: 1
    },
    individual_settings_container: {
        marginTop: 20,
        marginBottom: 10,
        display: "flex",
        alignItems: "flex-start",
        width: '100%'
    }
})