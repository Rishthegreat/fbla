import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {designChoices, getPictureLink} from "../../GlobalConsts";
import {useContext, useState} from "react";
import {AuthContext} from "../contexes/auth-context";

export const Post = ({postData, navigation}) => {
    const {_id} = useContext(AuthContext)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const pictureLink = getPictureLink + "/" + postData.image
    const regularSize = 200
    Image.getSize(pictureLink, (width, height) => {
        setWidth(width)
        setHeight(height)
    })
    const returnWidth = () => {
        if (!width || !height) {
            return regularSize
        }
        const aspectRatio = width / height
        if (aspectRatio === 1) {
            return regularSize
        }
        if (aspectRatio > 1) {
            return regularSize * aspectRatio
        }
        if (aspectRatio < 1) {
            return regularSize
        }
    }

    const returnHeight = () => {
        if (!width || !height) {
            return regularSize
        }
        const aspectRatio = width / height
        if (aspectRatio === 1) {
            return regularSize
        }
        if (aspectRatio > 1) {
            return regularSize
        }
        if (aspectRatio < 1) {
            return regularSize / aspectRatio
        }
    }
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
            <View style={styles.nameTimeContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', {profileId: postData.owner})}>
                    <Text>{postData.owner === _id ? "Me" : postData.user.firstName + " " + postData.user.lastName}</Text>
                </TouchableOpacity>
                <Text> · </Text>
                <Text>{timestampToTimeAgo(postData.timestamp)}</Text>
            </View>
            <Text style={styles.title}>{postData.title}</Text>
            <Text>{postData.content}</Text>
            {
                postData.image &&
                <Image resizeMethod={"resize"} resizeMode="contain" source={{uri: pictureLink}} style={{...styles.image, width: returnWidth(), height: returnHeight()}} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: designChoices.offWhite,
        padding: 12,
        marginVertical: 10,
        borderRadius: 3
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    image: {
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 3
    },
    nameTimeContainer: {
        display: "flex",
        flexDirection: "row"
    }
})