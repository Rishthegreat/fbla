/* eslint-disable */

import {View, Text, StyleSheet} from "react-native";
import {TopNav} from "../components";


export const Homepage = ({navigation}) => {
    return (
        <View>
            <View>
                <Text>Welcome to the Application, User</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%'
    }
})