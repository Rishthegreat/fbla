/* eslint-disable */
import {Keyboard, StyleSheet, TextInput, View} from "react-native";
import {designChoices} from "../../GlobalConsts";
import {useEffect, useRef} from "react";

export const CustomInput = ({value, setValue, placeholder, secureTextEntry, expandable, minHeight, maxHeight}) => {
    const textInputRef = useRef(null)
    const keyboardHideCallback = () => {
        textInputRef.current.blur?.()
    }

    useEffect(() => {
        const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardHideCallback);

        return () => {
            keyboardDidHideSubscription?.remove();
        };
    }, []);
    return (
      <View style={styles.container}>
          <TextInput ref={textInputRef} style={expandable ? {maxHeight: maxHeight ? maxHeight: 175, minHeight: minHeight ? minHeight : null, textAlignVertical: 'top'} : null} multiline={expandable} value={value} onChangeText={setValue} placeholder={placeholder} secureTextEntry={secureTextEntry}/>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: designChoices.offWhite,
        width: '100%',
        borderRadius: 3,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    tInput: {

    }
})