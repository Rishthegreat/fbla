/* eslint-disable */

import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import {designChoices} from "../../GlobalConsts";

export const CustomButton = ({text, onPress, style, type}) => {
    const typeStyle = {backgroundColor: type ? designChoices[type] : designChoices.primary}
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container, ...style, ...typeStyle}}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
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