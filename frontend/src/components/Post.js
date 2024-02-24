import {View, Text, StyleSheet} from "react-native";
import {designChoices} from "../../GlobalConsts";

export const Post = ({postData}) => {
    return (
        <View style={styles.postContainer}>
            <Text>{postData.owner}</Text>
            <Text>{postData.timestamp}</Text>
            <Text>{postData.title}</Text>
            <Text>{postData.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: designChoices.offWhite,
        padding: 10,
        marginVertical: 10,
        borderRadius: 3
    }
})