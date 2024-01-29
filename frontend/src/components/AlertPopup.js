/* eslint-disable */

import {Animated, StyleSheet, Text, View} from "react-native";
import {useAlert} from "../hooks/useAlert";
import {designChoices} from "../../GlobalConsts";
import {useEffect, useState} from "react";

const AnimatedPopup = ({text, type, setAlert}) => {
    const [opacity] = useState(new Animated.Value(0))
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }).start(() => setAlert('', ''))
            }, 2000)
        })
    }, []);
    const bgSelector = () => {
        switch (type) {
            case 'error':
                return designChoices.error
            case 'success':
                return designChoices.success
            case 'alert':
                return designChoices.secondary
        }
    }
    return (
        <Animated.View style={{...styles.root, opacity: opacity, backgroundColor: bgSelector()}}>
            <Text style={styles.text}>{text}</Text>
        </Animated.View>
    )
}

export const AlertPopup = () => {
    const {text, type, setAlert} = useAlert()
    if (text && type) {
        return (
           <AnimatedPopup text={text} type={type} setAlert={setAlert} />
        )
    } else {
        return (<></>)
    }
}

const styles = StyleSheet.create({
    root: {
        width: '90%',
        height: 'fit-content',
        alignItems: "center",
        borderRadius: 3
    },
    text: {
        padding: 10,
        color: designChoices.almostBlack
    }
})
