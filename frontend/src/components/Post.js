import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {designChoices, getPictureLink, timestampToTimeAgo} from "../../GlobalConsts";
import {useContext, useRef, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {ProfileContext} from "../contexes/ProfileContext";
import Icon from "react-native-vector-icons/AntDesign";

export const Post = ({postData, navigation}) => {
    const {_id} = useContext(AuthContext)
    const {setOtherProfileId} = useContext(ProfileContext)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const pictureLink = getPictureLink + "/" + postData.image
    const regularSize = 200
    const postRef = useRef(null)
    if (postData.image) {
        Image.getSize(pictureLink, (width, height) => {
            setWidth(width)
            setHeight(height)
        })
    }
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
    const navigateToProfile = () => {
        if (postData.owner === _id) {
            navigation.navigate('UserProfile')
        } else {
            setOtherProfileId(postData.owner)
        }
    }

    return (
        <View style={styles.postContainer} ref={postRef}>
            <View style={styles.nameTimeContainer}>
                <TouchableOpacity onPress={navigateToProfile}>
                    <Text>{postData.owner === _id ? "Me" : postData.user.firstName + " " + postData.user.lastName}</Text>
                </TouchableOpacity>
                <Text>·</Text>
                <Text>{timestampToTimeAgo(postData.timestamp)}</Text>
            </View>
            <Text style={styles.title}>{postData.title}</Text>
            <Text>{postData.content}</Text>
            {
                postData.image &&
                <Image resizeMethod={"resize"} resizeMode="contain" source={{uri: pictureLink}} style={{...styles.image, width: returnWidth(), height: returnHeight()}} />
            }
            <TouchableOpacity style={styles.shareContainer}>
                <Text>Share</Text>
                <Icon name={'sharealt'} size={15} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: designChoices.offWhite,
        padding: 12,
        marginVertical: 6,
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
        flexDirection: "row",
        gap: 5
    },
    shareContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    }
})