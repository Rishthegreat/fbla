/* eslint-disable */

import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useCallback, useContext, useEffect} from "react";
import {AuthContext} from "../contexes/auth-context";
import {useFocusEffect} from "@react-navigation/native";
import {useAlert} from "../hooks/useAlert";
import {designChoices} from "../../GlobalConsts";
import {useQuery} from "@apollo/client";


export const Homepage = ({navigation}) => {
    const {setCurrentTab} = useContext(AuthContext)

    useFocusEffect ( // Run each time the tab is loaded
        useCallback(() => {
            setCurrentTab('Homepage')
        }, [setCurrentTab])
    )

    return (
        <ScrollView style={styles.root}>
            <View>
                <Text>Spark Social</Text>
            </View>
            <View>
                <Text></Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: designChoices.white
    }
})