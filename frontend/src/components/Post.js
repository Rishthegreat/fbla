import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {designChoices, getPictureLink, timestampToTimeAgo} from "../../GlobalConsts";
import {useContext, useRef, useState} from "react";
import {AuthContext} from "../contexes/auth-context";
import {ProfileContext} from "../contexes/ProfileContext";
import Icon from "react-native-vector-icons/AntDesign";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
import {AlertContext} from "../contexes/AlertContext";
export const Post = ({postData, navigation}) => {
    const {_id, userToken} = useContext(AuthContext)
    const {setOtherProfileId} = useContext(ProfileContext)
    const {setAlert} = useContext(AlertContext)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const pictureLink = getPictureLink + "/" + postData.image
    const regularSize = 200
    const postRef = useRef(null)
    const contentRef = useRef(null)
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
    const getImg = async () => {
        if (postData.image) {
            try {
                const res = await RNFetchBlob.fetch('GET' ,pictureLink, {
                    Authorization: `Bearer ${userToken}`
                })
                if (res.respInfo.status === 200) {
                    return res.base64()
                } else {
                    return null
                }
            } catch (e) {
                return null
            }
        } else {
            return null
        }
    }
    const sharePost = async () => {
        const {isInstalled} = await Share.isPackageInstalled('com.instagram.android')
        if (isInstalled) {
            const img = await getImg()
            const shareOptions = {
                title: postData.title,
                type: 'image/jpeg',
                backgroundImage: img ? `data:image/jpeg;base64,${img}` : null,
                //stickerImage: imgData,
                social: Share.Social.INSTAGRAM_STORIES,
                appId: '385875147498173',
                forceDialog: true,
            }
            try {
                const ShareResponse = await Share.shareSingle(shareOptions);
                console.log('Response =>', ShareResponse);
            } catch (e) {
                console.log(e)
            }
        } else {
            setAlert('Instagram not installed', 'error')
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
            <Text ref={contentRef}>{postData.content}</Text>
            {
                postData.image &&
                <Image resizeMethod={"resize"} resizeMode="contain" source={{uri: pictureLink}} style={{...styles.image, width: returnWidth(), height: returnHeight()}} />
            }
            <TouchableOpacity style={styles.shareContainer} onPress={sharePost}>
                <Icon name={'sharealt'} size={15} />
                <Text>Share to Instagram</Text>
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