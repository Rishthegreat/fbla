/* eslint-disable */

import {ScrollView, View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {designChoices, uploadPictureLink} from "../../GlobalConsts";
import React, {useCallback, useContext, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useMutation} from "@apollo/client";
import {CREATE_POST} from "../graphql";
import Icon from "react-native-vector-icons/AntDesign";
import {CustomButton, CustomInput} from "../components";
import {AlertContext} from "../contexes/AlertContext";
import {launchImageLibrary} from 'react-native-image-picker';
export const MakePost = ({navigation}) => {
    const {setCurrentTab, _id} = useContext(AuthContext)
    const {setAlert} = useContext(AlertContext)
    const [createProfileMutation] = useMutation(CREATE_POST)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [image, setImage] = useState(null)
    const reset = () => {
        setTitle(null)
        setContent(null)
        setImage(null)
    }
    useFocusEffect(
        useCallback(() => {
            setCurrentTab('MakePost')
            reset()
        }, [setCurrentTab])
    )
    const selectImage = () => {
        const option = {
            mediaType: 'photo',
            includeBase64: false
        }
        launchImageLibrary(option, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera')
            } else if (response.error) {
                console.log('Camera Error: ', response.error)
            } else {
                setImage(response)
            }
        })
    }
    const uploadImage = async () => {
        if (!image) return null
        try {
            const formData = new FormData()
            const type = image.assets?.[0]?.type
            const name = _id + Date.now() + '.' + type.split('/')[1]
            formData.append('image', {
                uri: image.assets?.[0]?.uri,
                type: image.assets?.[0]?.type,
                name: name
            })
            const response = await fetch(uploadPictureLink, {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                console.log('Image uploaded')
                return name.split('.')[0]
            } else {
                console.error('Image not uploaded')
                return null
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }
    const createPost = () => {
        if (title !== null && title !== "" && content !== null && content !== "") {
            uploadImage().then(img => {
                createProfileMutation({variables: {owner: _id, title: title, content: content, image: img}})
                    .then(r => {
                        setAlert("Post Created!", "success")
                        navigation.navigate('Homepage')
                    })
            })
        } else {
            setAlert("Please fill out all fields!", "error")
        }
    }
    return (
        <View style={{paddingHorizontal: 20, width: "100%", backgroundColor: designChoices.white, flexGrow: 1}}>
            <ScrollView contentContainerStyle={{backgroundColor: designChoices.white, flexGrow: 1, paddingTop: 15}}>
                <TouchableOpacity style={styles.closeContainer} onPress={() => navigation.navigate('Homepage')}>
                    <Icon name={'close'} size={20} color={designChoices.almostBlack} />
                </TouchableOpacity>
                <Text style={styles.header}>Create a Post</Text>
                {image &&
                    <View style={styles.imageContainer}>
                        <TouchableOpacity style={styles.removeImageContainer} onPress={() => setImage(null)}>
                            <Icon name='close' size={15} />
                        </TouchableOpacity>
                        <Image source={{uri: image.assets?.[0]?.uri}} resizeMode="contain" style={styles.image} />
                    </View>
                }
                <View style={styles.titleContainer}>
                    <Text>Title: </Text>
                    <CustomInput placeholder={'Title'} value={title} setValue={setTitle} />
                </View>
                <CustomInput minHeight={200} maxHeight={700} expandable={true} placeholder={'Start typing content...'} value={content} setValue={setContent} />
                <CustomButton onPress={selectImage} text={image ? "Change Image" : "Upload Image"} />
                <CustomButton onPress={createPost} text={'Post'} style={{marginTop: "auto", marginBottom: 15}} />
            </ScrollView>
        </View>
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
    },
    image: {
        borderWidth: 1,
        borderColor: "gray",
        alignSelf: "center",
        width: "100%",
        height: "100%",
        borderRadius: 3
    },
    imageContainer: {
        width: 100,
        height: 100,
        marginVertical: 15,
        position: "relative",
        alignSelf: "center"
    },
    removeImageContainer: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: designChoices.white,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "gray",
        padding: 2,
        zIndex: 1,
    }
})