/* eslint-disable */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Logo from '../../assets/images/Logo.png'
import {CustomButton, CustomInput} from "../components"
import {useContext, useEffect, useRef, useState} from "react";
import {designChoices} from "../../GlobalConsts";
import {AuthContext} from "../../auth-context";

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useContext(AuthContext)
    const login_user = () => {
        login()
        navigation.navigate('Home')
    }
    return (
        <View style={styles.root}>
            <Image source={Logo} style={styles.logo} resizeMode={'contain'}/>
            <CustomInput value={email} setValue={setEmail} placeholder={'Email'}/>
            <CustomInput value={password} setValue={setPassword} placeholder={'Password'} secureTextEntry={true}/>
            <CustomButton onPress={login_user} text={'Log In'}/>
        </View>
    )
}

export const Signup = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const checkConfirmPassword = (password) => {
        setConfirmPassword(() => password)
    }
    const length8 = useRef(null)
    const passMatch = useRef(null)
    useEffect(() => {
        length8.current.setNativeProps({
            style: {color: password.length >= 8 ? 'green' : 'red'}
        })
        passMatch.current.setNativeProps({
            style: {color: password === confirmPassword && password.length > 0 ? 'green' : 'red'}
        })
    }, [password, confirmPassword]);

    return (
        <View style={styles.root}>
            <Image source={Logo} style={styles.logo} resizeMode={'contain'}/>
            <CustomInput value={email} setValue={setEmail} placeholder={'Email'}/>
            <CustomInput value={password} setValue={setPassword} placeholder={'Password'} secureTextEntry={true}/>
            <CustomInput value={confirmPassword} setValue={setConfirmPassword} placeholder={'Confirm Password'}
                         secureTextEntry={true}/>
            <CustomButton text={'Sign Up'}/>
            <View id={'errors'} style={styles.errors}>
                <Text ref={length8} style={styles.error_text}>Password needs to be at least 8 characters long</Text>
                <Text ref={passMatch} style={styles.error_text}>Passwords need to match</Text>
            </View>
            <Text>Already have an account? <Text onPress={() => navigation.navigate('Login')}>Login</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        position: 'relative',
        height: '100%',
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        height: '40%',
        maxHeight: 300
    },
    error_text: {
        color: 'green'
    }
})
