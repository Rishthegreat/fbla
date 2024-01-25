/* eslint-disable */
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {IconWithText} from "../components";
import Icon from "react-native-vector-icons/AntDesign";

export const TopNav = () => {
    return (
        <View>
            <View>
                <View>
                    <Icon name={'search1'} size={20} color={'#000000'} />
                </View>
            </View>
        </View>
    )
}

export const BottomNav = ({navigation}) => {
    return (
        <View style={styles.bottom_nav_big_container}>
            <View style={styles.bottom_nav_container}>
                <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
                    <IconWithText text={'Home'} icon={'home'} />
                </TouchableOpacity>
                <IconWithText text={'Post'} icon={'plus'} />
                <IconWithText text={'Profile'} icon={'user'} />
                <TouchableOpacity onPress={() => navigation.navigate('AppSettings')}>
                    <IconWithText text={'Settings'} icon={'setting'} />
                </TouchableOpacity>
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