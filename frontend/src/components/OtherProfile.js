import {Profile} from "./Profile";
import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import React, {useContext} from "react";
import {ProfileContext} from "../contexes/ProfileContext";

export const OtherProfile = ({profileId}) => {
    const {setOtherProfileId} = useContext(ProfileContext)
    return (
        <Modal animationType={'fade'} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeContainer} onPress={() => setOtherProfileId(null)}>
                        <Icon name={'close'} size={20} color={designChoices.almostBlack} />
                    </TouchableOpacity>
                    <Profile profileId={profileId} selfProfile={false} />
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
    closeContainer: {
        width: 20,
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1
    },
    container: {
        backgroundColor: "transparent",
        borderRadius: 3,
        minHeight: '90%',
        width: '90%',
        overflow: "hidden"
    }
})