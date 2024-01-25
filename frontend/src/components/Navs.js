/* eslint-disable */
import {StyleSheet, View} from "react-native";
import {IconWithText} from "../components";

export const TopNav = () => {
    return (
        <View>

        </View>
    )
}

export const BottomNav = () => {
    return (
        <View style={styles.bottom_nav_big_container}>
            <View style={styles.bottom_nav_container}>
                <IconWithText text={'Home'} icon={'home'} />
                <IconWithText text={'Post'} icon={'plus'} />
                <IconWithText text={'Profile'} icon={'user'} />
                <IconWithText text={'Settings'} icon={'setting'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottom_nav_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottom_nav_big_container: {
        display: "flex",
        width: '90%',
        marginLeft: '5%'
    }
})