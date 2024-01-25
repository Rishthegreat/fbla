/* eslint-disable */

import {Text, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'

export const IconWithText = ({text, icon}) => {
    return (
        <View>
            <View style={styles.container}>
                <Icon name={icon} size={30} color={'#000000'} />
                <Text>{text}</Text>
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