/* eslint-disable */

import {Text, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import {designChoices} from "../../GlobalConsts";

export const IconWithText = ({text, icon, color, size, textColor}) => {
    return (
        <View>
            <View style={styles.container}>
                <Icon name={icon} size={size ? size : 30} color={color ? color : designChoices.almostBlack} />
                <Text style={textColor ? {color: textColor} : null}>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
})