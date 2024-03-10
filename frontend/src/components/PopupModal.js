import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {designChoices} from "../../GlobalConsts";
import React from "react";

export const PopupModal = ({onClose, children}) => {
    return (
        <Modal animationType="fade" transparent={true} statusBarTranslucent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
                        <Icon name={'close'} size={20} color={designChoices.almostBlack} />
                    </TouchableOpacity>
                    {children}
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
        backgroundColor: 'white',
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
    }
})