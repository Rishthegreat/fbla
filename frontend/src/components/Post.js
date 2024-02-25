import {View, Text, StyleSheet, Image} from "react-native";
import {designChoices, getPictureLink} from "../../GlobalConsts";

export const Post = ({postData}) => {
    const timestampToTimeAgo = (timestamp) => {
        const time = new Date(timestamp)
        const now = new Date()
        const diff = now - time
        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const weeks = Math.floor(days / 7)
        const months = Math.floor(weeks / 4)
        const years = Math.floor(months / 12)
        if (years > 0) {
            return years + " years ago"
        } else if (months > 0) {
            return months + " months ago"
        } else if (weeks > 0) {
            return weeks + " weeks ago"
        } else if (days > 0) {
            return days + " days ago"
        } else if (hours > 0) {
            return hours + " hours ago"
        } else if (minutes > 0) {
            return minutes + " minutes ago"
        } else {
            return seconds + " seconds ago"
        }
    }
    return (
        <View style={styles.postContainer}>
            <Text>{postData.user.firstName} {postData.user.lastName} · {timestampToTimeAgo(postData.timestamp)}</Text>
            <Text style={styles.title}>{postData.title}</Text>
            <Text>{postData.content}</Text>
            {
                postData.image &&
                <Image source={{uri: (getPictureLink + "/" + postData.image)}} style={styles.image} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: designChoices.offWhite,
        padding: 10,
        marginVertical: 10,
        borderRadius: 3
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
    }
})