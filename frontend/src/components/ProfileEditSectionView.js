import {Modal, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import React, {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {DELETE_SECTION} from "../graphql";
import {AuthContext} from "../contexes/auth-context";
import {CustomInput} from "./CustomInput";
import {CustomButton} from "./CustomButton";
import {AlertContext} from "../contexes/AlertContext";

const Property = ({profileUser, itemKey, item}) => {
    const [inputVal, setInputVal] = useState(item[itemKey])
    return (
        <View>
            <Text>{itemKey}</Text>
            <CustomInput value={inputVal} setValue={setInputVal} placeholder={null} expandable={true} />
        </View>
    )
}

const ListItem = ({item, profileUser, editSectionType, refetch}) => {
    const [deleteSectionMutation] = useMutation(DELETE_SECTION)
    const deleteItem = () => {
        deleteSectionMutation({variables: {_id: profileUser._id, section: editSectionType, subsectionId: item._id}})
            .then(r => {
                refetch()
            })
    }
    return (
        <View style={styles.listItem}>
            {
                Object.keys(item).map(value => {
                    if (value !== '__typename' && value !== '_id') {
                        return (
                            <Property profileUser={profileUser} item={item} itemKey={value} />
                        )
                    }
                })
            }
            <TouchableOpacity style={styles.deleteIcon} onPress={deleteItem}>
                <Icon name='delete' color={designChoices.almostBlack} size={15} />
            </TouchableOpacity>
        </View>
    )
}

export const ProfileEditSectionView = ({profileUser, editSectionType, setEditSectionType, refetch}) => {
    const [deleteSectionMutation] = useMutation(DELETE_SECTION)
    const {_id} = useContext(AuthContext)
    const {setAlert} = useContext(AlertContext)
    const deleteSection = () => {
        console.log(editSectionType)
        deleteSectionMutation({variables: {_id: _id, section: editSectionType, subsectionId: 'null'}, onError: error => console.log(JSON.stringify(error, null, 2))})
            .then(r => {
                setEditSectionType(null)
                refetch()
                setAlert('Successfully Deleted', 'success')
            })
    }
    return (
        <Modal animationType={'fade'} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeContainer} onPress={() => setEditSectionType(null)}>
                        <Icon name={'close'} size={20} color={designChoices.almostBlack} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{editSectionType[0].toLocaleUpperCase()+editSectionType.slice(1, editSectionType.length)}</Text>
                    <CustomButton text='Delete Entire Section' onPress={deleteSection} />
                    <View style={styles.listContainer}>
                        {
                            profileUser.profile?.[editSectionType].map(item => {
                                return (
                                    <ListItem refetch={refetch} editSectionType={editSectionType} item={item} profileUser={profileUser} />
                                )
                            })
                        }
                    </View>
                    <View style={styles.bottomBtnContainer}>
                        <CustomButton text='Add Item' style={styles.bottomBtn}/>
                        <CustomButton text='Save' style={styles.bottomBtn} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
    },
    container: {
        padding: 25,
        backgroundColor: 'rgb(239,239,239)',
        borderRadius: 3,
        overflowY: "scroll",
        minHeight: '90%',
        width: '90%'
    },
    closeContainer: {
        width: 20,
        position: "absolute",
        top: 10,
        right: 10
    },
    listContainer: {

    },
    listItem: {
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginVertical: 5,
        position: "relative",
        borderStyle: "solid",
        borderBottomWidth: 0.5,
        borderBottomColor: "grey"
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 5
    },
    deleteIcon: {
        position: "absolute",
        top: 10,
        right: 10
    },
    bottomBtnContainer: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
        justifyContent: "center",
        gap: 10
    },
    bottomBtn: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0
    }
})