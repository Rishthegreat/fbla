import {Modal, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import React from "react";

const ListItem = ({item}) => {
    return (
        <View style={styles.listItem}>
            {
                Object.keys(item).map(value => {
                    if (value !== '__typename' && value !== '_id') {
                        return (
                            <View style={styles.listItem}>
                                <Text>{value}</Text>
                                <Text>{item[value]}</Text>
                            </View>
                        )
                    }
                })
            }
        </View>
    )
}

export const ProfileEditSectionView = ({profileUser, editSectionType, setEditSectionType, refetch}) => {
    return (
        <Modal animationType={'fade'} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeContainer} onPress={() => setEditSectionType(null)}>
                        <Icon name={'close'} size={20} color={designChoices.almostBlack} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{editSectionType}</Text>
                    <View style={styles.listContainer}>
                        {
                            profileUser.profile?.[editSectionType].map(item => {
                                return (
                                    <ListItem item={item} />
                                )
                            })
                        }
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
        backgroundColor: designChoices.offWhite,
        borderRadius: 3,
        paddingHorizontal: 5,
        marginVertical: 5
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 5
    }
})