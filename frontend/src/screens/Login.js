/* eslint-disable */
import {Image, StyleSheet, Text, View} from 'react-native'
import Logo from '../../assets/images/Logo.png'
import {CustomButton, CustomInput} from "../components"
import {useState} from "react";

export const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.root}>
      <Image source={Logo} style={styles.logo} resizeMode={'contain'} />
      <CustomInput value={email} setValue={setEmail} placeholder={'Email'} />
      <CustomInput value={password} setValue={setPassword} placeholder={'Password'} secureTextEntry={true} />
      <CustomButton text={'Log In'} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: '40%',
    maxHeight: 300
  }
})
