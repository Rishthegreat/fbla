/* eslint-disable */

import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {designChoices} from "../../GlobalConsts";
import React, {useCallback, useContext, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useMutation} from "@apollo/client";
import {CREATE_POST} from "../graphql";
import Icon from "react-native-vector-icons/AntDesign";
import {CustomButton, CustomInput} from "../components";
import {AlertContext} from "../contexes/AlertContext";

export const MakePost = ({navigation}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const {setAlert} = useContext(AlertContext)
    const [createProfileMutation] = useMutation(CREATE_POST)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    useFocusEffect(
        useCallback(() => {
            setCurrentTab('MakePost')
        }, [setCurrentTab])
    )
    const createPost = () => {
        if (title !== null && title !== "" && content !== null && content !== "") {
            createProfileMutation({variables: {owner: _id, title: title, content: content}})
                .then(r => {
                    setAlert("Post Created!", "success")
                    navigation.navigate('Homepage')
                })
        } else {
            setAlert("Please fill out all fields!", "error")
        }
    }
    return (
        <ScrollView contentContainerStyle={{backgroundColor: designChoices.white, flexGrow: 1, paddingTop: 15}}>
            <TouchableOpacity style={styles.closeContainer} onPress={() => navigation.navigate('Homepage')}>
                <Icon name={'close'} size={20} color={designChoices.almostBlack} />
            </TouchableOpacity>
            <Text style={styles.header}>Create a Post</Text>
            <View style={styles.titleContainer}>
                <Text>Title: </Text>
                <CustomInput placeholder={'Title'} value={title} setValue={setTitle} />
            </View>
            <CustomInput minHeight={200} maxHeight={700} expandable={true} placeholder={'Start typing content...'} value={content} setValue={setContent} />
            <CustomButton text={"Upload Image"} />
            <CustomButton onPress={createPost} text={'Post'} style={{marginTop: "auto", marginBottom: 15}} />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    header: {
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center",
        marginBottom: 15
    },
    closeContainer: {
        width: 20,
        position: "absolute",
        top: 15,
        right: 15,
        zIndex: 1
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    }
})