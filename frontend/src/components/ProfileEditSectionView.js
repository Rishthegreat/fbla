import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices, profileSectionsSchema} from "../../GlobalConsts";
import React, {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {DELETE_SECTION, UPDATE_MULTIPLE_PROFILE} from "../graphql";
import {AuthContext} from "../contexes/auth-context";
import {CustomInput} from "./CustomInput";
import {CustomButton} from "./CustomButton";
import {AlertContext} from "../contexes/AlertContext";

const Property = ({setProfileUserTemp, itemKey, item, editSectionType}) => {
    const updateItem = (value) => {
        setProfileUserTemp(prev => {
            const index = prev.profile[editSectionType].findIndex(x => x._id === item._id)
            if (index !== -1) {
                const updatedArray = [...prev.profile[editSectionType]]
                updatedArray[index] = { ...updatedArray[index], [itemKey]: value}
                return {
                    ...prev,
                    profile: {
                        ...prev.profile,
                        [editSectionType]: updatedArray
                    }
                }
            }
            return prev
        })
    }
    return (
        <View>
            <Text>{itemKey}</Text>
            <CustomInput value={item[itemKey]} setValue={updateItem} placeholder={null} expandable={true} />
        </View>
    )
}

const ListItem = ({item, profileUserTemp, setProfileUserTemp, editSectionType, refetch}) => {
    const {_id} = useContext(AuthContext)
    const [deleteSectionMutation] = useMutation(DELETE_SECTION)
    const deleteItem = () => {
        if (item._id) {
            deleteSectionMutation({variables: {_id: _id, section: editSectionType, subsectionId: item._id}, onError: error => console.log(JSON.stringify(error, null, 2))})
                .then(r => {
                    refetch()
                    setProfileUserTemp(prev => {
                        return {
                            ...prev,
                            profile: {
                                ...prev.profile,
                                [editSectionType]: prev.profile[editSectionType].filter(
                                    sectionItem => sectionItem._id !== item._id
                                )
                            }
                        }
                    })
                })
        }
    }
    return (
        <View style={styles.listItem}>
            {
                Object.keys(item).map(value => {
                    if (value !== '__typename' && value !== '_id') {
                        return (
                            <Property editSectionType={editSectionType} profileUserTemp={profileUserTemp} setProfileUserTemp={setProfileUserTemp} item={item} itemKey={value} />
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
    const [updateMultipleProfileMutation] = useMutation(UPDATE_MULTIPLE_PROFILE)
    const {_id} = useContext(AuthContext)
    const {setAlert} = useContext(AlertContext)
    const [profileUserTemp, setProfileUserTemp] = useState(profileUser)
    const deleteSection = () => {
        console.log(editSectionType)
        deleteSectionMutation({variables: {_id: _id, section: editSectionType, subsectionId: 'null'}, onError: error => console.log(JSON.stringify(error, null, 2))})
            .then(r => {
                setEditSectionType(null)
                refetch()
                setAlert('Successfully Deleted', 'success')
            })
    }
    const addItem = () => {
        setProfileUserTemp(prev => {
            const keys = profileSectionsSchema[editSectionType].items
            return {
                ...prev,
                profile: {
                    ...prev.profile,
                    [editSectionType]: [
                        ...prev.profile[editSectionType],
                        keys.reduce((acc, key) => {
                            acc[key] = ""
                            return acc
                        }, {})
                    ]
                }
            }
        })
    }

    const save = () => {
        updateMultipleProfileMutation({variables: {_id: _id, section: editSectionType, changes: JSON.stringify(profileUserTemp.profile[editSectionType])}})
            .then(() => {
                refetch()
                setAlert("Saved", "success")
            })
    }
    return (
        <Modal animationType={'fade'} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeContainer} onPress={() => setEditSectionType(null)}>
                        <Icon name={'close'} size={20} color={designChoices.almostBlack} />
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false} style={{height: '90%'}} contentContainerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}>
                        <Text style={styles.headerText}>{editSectionType[0].toLocaleUpperCase()+editSectionType.slice(1, editSectionType.length)}</Text>
                        <CustomButton text='Delete Entire Section' onPress={deleteSection} />
                        <View style={styles.listContainer}>
                            {
                                profileUserTemp.profile?.[editSectionType].map(item => {
                                    return (
                                        <ListItem refetch={refetch} editSectionType={editSectionType} item={item} profileUserTemp={profileUserTemp} setProfileUserTemp={setProfileUserTemp} />
                                    )
                                })
                            }
                        </View>
                        <View style={styles.bottomBtnContainer}>
                            <CustomButton text='Add Item' style={styles.bottomBtn} onPress={addItem}/>
                            <CustomButton text='Save' style={styles.bottomBtn} onPress={save} />
                        </View>
                    </ScrollView>
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
        backgroundColor: designChoices.white,
        borderRadius: 3,
        overflowY: "scroll",
        minHeight: '90%',
        width: '90%',
        position: 'relative'
    },
    closeContainer: {
        width: 20,
        position: "absolute",
        top: 8,
        right: 8
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