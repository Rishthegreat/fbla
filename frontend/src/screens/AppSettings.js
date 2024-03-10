/* eslint-disable */

import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {CustomButton, CustomInput, PopupModal} from "../components";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TempLogo from '../../assets/images/Logo.png'
import {useFocusEffect} from "@react-navigation/native";
import {designChoices} from "../../GlobalConsts";
import {CREATE_BUG_REPORT} from "../graphql";
import {useMutation} from "@apollo/client";
import {AlertContext} from "../contexes/AlertContext";

const IndividualSetting = ({name, onPress}) => {
    return (
        <TouchableOpacity style={settingStyles.individual_setting_container} onPress={onPress}>
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

const ReportBug = ({setReportBugModal}) => {
    const [bugTitle, setBugTitle] = useState('')
    const [bugDescription, setBugDescription] = useState('')
    const [createBugMutation] = useMutation(CREATE_BUG_REPORT)
    const {setAlert} = useContext(AlertContext)
    const {_id} = useContext(AuthContext)
    const submitBug = () => {
        if (!bugTitle || !bugDescription) {
            Alert.alert('Please fill out both fields')
            return
        }
        createBugMutation({variables: {title: bugTitle, description: bugDescription, owner: _id}, onError: (e) => console.log(JSON.stringify(e, null, 2))})
            .then(r => {
                console.log(r)
                setAlert('Bug Report Submitted!', 'success')
                setReportBugModal(false)
            })
    }
    return (
        <PopupModal onClose={() => setReportBugModal(false)}>
            <View>
                <Text style={styles.reportBugTitle}>Report a Bug</Text>
                <CustomInput value={bugTitle} setValue={setBugTitle} placeholder={'Bug Title'} />
                <CustomInput value={bugDescription} setValue={setBugDescription} expandable={true} placeholder={'What went wrong?'} minHeight={300} maxHeight={500} />
                <CustomButton text={'Submit'} onPress={submitBug} />
            </View>
        </PopupModal>
    )
}

export const AppSettings = ({navigation}) => {
    const {logout, setCurrentTab} = useContext(AuthContext)
    const [reportBugModal, setReportBugModal] = useState(false)
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => setCurrentTab('AppSettings'), [])
    )
    return (
        <View style={{paddingHorizontal: 20, width: "100%", backgroundColor: designChoices.white, flexGrow: 1}}>
            <View style={styles.root}>
                <Image source={TempLogo} style={styles.user_pic} resizeMode='contain' />
                <Text style={styles.title}>Change and View Settings</Text>
                <View style={styles.individual_settings_container}>
                    <IndividualSetting name='Account Settings' />
                    <IndividualSetting name='Theme' />
                    <IndividualSetting name='Visibility' />
                    <IndividualSetting onPress={() => setReportBugModal(true)} name='Report a Bug' />
                </View>
                <View>
                    {reportBugModal &&
                        <ReportBug setReportBugModal={setReportBugModal} />
                    }
                </View>
                <CustomButton text={'Log Out'} onPress={logout} />
            </View>
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
    },
    reportBugTitle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    }
})