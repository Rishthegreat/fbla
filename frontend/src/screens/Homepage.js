/* eslint-disable */

import {View, Text, StyleSheet} from "react-native";
import {TopNav} from "../components";
import {useCallback, useContext, useEffect} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useAlert} from "../hooks/useAlert";
import {designChoices} from "../../GlobalConsts";


export const Homepage = ({navigation}) => {
    const {setCurrentTab} = useContext(AuthContext)
    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => {
            setCurrentTab('Homepage')
        }, [])
    )

    return (
        <View style={styles.root}>
            <View>
                <Text>Spark Social</Text>
            </View>
            <View>
                <Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: designChoices.white
    }
})