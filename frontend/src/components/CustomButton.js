/* eslint-disable */

import {View, Text, StyleSheet, Pressable} from "react-native";
import {designChoices} from "../../GlobalConsts";

export const CustomButton = ({text, onPress}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: designChoices.primary,
        width: '100%',
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 15,
        marginVertical: 5
    },
    text: {
        color: designChoices.offWhite
    }
})