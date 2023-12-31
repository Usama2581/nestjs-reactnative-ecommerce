import { StyleSheet, Text, View, StatusBar, Pressable, Keyboard, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedIn } from '../redux/actions/authAction';
import Loader from '../components/OverlayLoader';
// import { set } from 'react-native-reanimated';


export default function Auth() {

    const [form, setForm] = useState({})
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [screen, setScreen] = useState('login')
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [loading, setLoading] = useState()
    const [errorMsg, setErrorMsg] = useState('')
    // const [opacity, setOpacity] = useState(1)
    const dispatch = useDispatch()

    const updateForm = (e, key) => {
        setForm({ ...form, [key]: e })

    }

    useEffect(() => {
        const showListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true)
            // setOpacity(0)
        })
        const hideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false)
            // setOpacity(1)
            // setIsFocused(false)
        })

        return () => {
            showListener.remove()
            hideListener.remove()
        }
    }, [])

    useEffect(() => {
        if (form.name) {
            let name = form.name
            // console.log(name.length)
            if (name.length < 3) {
                setNameError('*Name is too short.')
            }
            // if(!form.name) {
            //     setNameError('')
            // }
            else {
                setNameError('')
            }
        }
    }, [form.name])

    useEffect(() => {
        if (form.password && screen === 'register') {
            let password = form.password
            // console.log(name.length)
            if (password.length < 6) {
                setPasswordError('*Password must be atleast six characters long.')
            }
            else {
                setPasswordError('')
            }
        }
    }, [form.password])

    useEffect(() => {
        const email = form.email
        if (email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const result = regex.test(email);
            // alert(result)
            // console.log(result)
            if (result === false) {
                setEmailError('*Email address is not valid.')
            }
            else {
                setEmailError('')
            }
        }
    }, [form.email])

    const changeScreen = () => {
        if (screen === 'login') {
            setScreen('register')
            setEmailError('')
            setPasswordError('')
            setErrorMsg('')
        } else {
            setScreen('login')
            setNameError('')
            setEmailError('')
            setPasswordError('')
            setErrorMsg('')
        }

    }

    const register = async () => {

        if (!form.name) {
            setNameError('*Name is required')
        }
        if (!form.email) {
            setEmailError('*Email is required')
        }
        if (!form.password) {
            setPasswordError('*Password is required')
        }
        else {
            setLoading(true)
            try {
                const response = await axios.post('https://curious-toad-suspenders.cyclic.app/auth/register', form);
                alert(response.data.message);
                console.log(response.data) // Log the response data
                setLoading(false)
                setScreen('login')
            } catch (error) {
                console.log('Error:', error.message);
                if (error.response) {
                    setLoading(false)
                    setEmailError(error.response.data.message)
                }
            }
        }
    }


    const login = async () => {

        if (!form.email) {
            setEmailError('*Email is required')
        }
        if (!form.password) {
            setPasswordError('*Password is required')
        }
        else {
            // alert('')
            setLoading(true)
            try {
                const response = await axios.post('https://curious-toad-suspenders.cyclic.app/auth/login', form);
                console.log(response)
                if(response.data.message === 'loggedin') {
                    setErrorMsg('')
                    // alert('')
                    const cookies = response.headers['set-cookie']
                    const cookie = cookies.pop()
                    const userCookie = JSON.stringify(cookie)
                    await AsyncStorage.setItem('cookie', userCookie)
                    // await AsyncStorage.getItem('cookie')
                    
                    axios.get(`https://curious-toad-suspenders.cyclic.app/auth/email/${form.email}`)
                    .then(async res => {
    
                        const data = res.data
                        // console.log(res)
                        const { _id, email, name, picture } = data
    
                        const userName = JSON.stringify(name)
                        const userId = JSON.stringify(_id)
                        const userEmail = JSON.stringify(email)
                        const userPicture = JSON.stringify(picture)
    
                        await AsyncStorage.setItem('name', userName)
                        await AsyncStorage.setItem('email', userEmail)
                        await AsyncStorage.setItem('id', userId)
                        await AsyncStorage.setItem('picture', userPicture)
                        console.log('user', name)
                        
                        dispatch(isLoggedIn(true))
                        setLoading(false)
                        setLoading(false)
                    })
                    .catch(err => console.error('err', err))
                }
            } catch (error) {
                console.error('Error:', error.message);
                if (error.response) {
                    // setErrorMsg(error.response.data.message); // Log the response data from the server
                    setEmailError(error.response.data.message); // Log the response data from the server
                    
                    setLoading(false)
                }
              }
        }
    }




    return (
        <>
            <View style={styles.page}>
                <View style={styles.container}>
                    {
                        screen === 'login' && (
                            <>
                                <View style={styles.header}>
                                    <Text style={styles.heading}>Login Here</Text>
                                    <Text style={styles.sub_heading}>Welcome back you have</Text>
                                    <Text style={styles.sub_heading}>been missed!</Text>
                                </View>
                                <Text style={styles.error}>{errorMsg}</Text>
                                <InputField label={'Email'}
                                    width={'100%'}
                                    onChangeText={(e) => updateForm(e, 'email')}
                                    secureText={false}
                                    emailError={emailError}
                                    type={'email-address'} />
                                <InputField
                                    width={'90%'}
                                    secureText={true}
                                    label={'Password'}
                                    screen={'password'}
                                    passwordError={passwordError}
                                    onChangeText={(e) => updateForm(e, 'password')} />
                                <Text style={styles.forget_password}>Forgot your password?</Text>
                                <Pressable onPress={login}
                                    style={styles.action_box_login}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>Login</Text>
                                </Pressable>
                                <Pressable onPress={changeScreen} >
                                    <Text style={styles.new_account} >Don't have an account?</Text>
                                </Pressable>
                            </>
                        )
                    }
                    {
                        screen === 'register' && (
                            <>
                                <View style={styles.header}>
                                    <Text style={styles.heading}>Create Account</Text>
                                    <Text style={styles.sub_heading}>Create an account so you can explore all the products on store</Text>
                                </View>

                                <Text style={styles.error}>{errorMsg}</Text>
                                <InputField
                                    label={'Name'}
                                    onChangeText={(e) => updateForm(e, 'name')}
                                    width={'100%'}
                                    secureText={false}
                                    nameError={nameError} />
                                <InputField label={'Email'}
                                    width={'100%'}
                                    onChangeText={(e) => updateForm(e, 'email')}
                                    secureText={false}
                                    emailError={emailError}
                                    type={'email-address'} />
                                <InputField
                                    width={'90%'}
                                    secureText={true}
                                    label={'Password'}
                                    screen={'password'}
                                    passwordError={passwordError}
                                    onChangeText={(e) => updateForm(e, 'password')} />
                                <Pressable
                                    onPress={register}
                                    style={styles.action_box_register}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>Register</Text>
                                </Pressable>
                                <Pressable onPress={changeScreen} >
                                    <Text style={styles.new_account} >Already have an account?</Text>
                                </Pressable>
                            </>
                        )
                    }
                    {
                        keyboardVisible ? null
                            :
                            (
                                <View style={styles.footer} >
                                    <Text style={styles.text}>Or login with social account</Text>
                                    <View style={styles.icon_box}>
                                        <View style={styles.icon}>
                                            <Image source={require('../../assets/google.png')} style={styles.image}></Image>
                                        </View>
                                        <View style={styles.icon}>
                                            <Image source={require('../../assets/fb.png')} style={styles.image}></Image>
                                        </View>
                                    </View>
                                </View>

                            )
                    }
                </View>
            </View>
            <Loader visible={loading} />
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        // margin: '5%',
        // borderWidth: 2,
    },
    header: {
        width: '100%',
        height: 150,
        // borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    heading: {
        fontSize: 40,
        fontFamily: 'OpenSans-Bold',
        marginBottom: 7,
    },
    sub_heading: {
        fontSize: 17,
        // fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        // marginBottom: 0,
        textAlign: 'center'
    },
    forget_password: {
        alignSelf: 'flex-end',
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        // marginTop: 15
    },
    action_box_register: {
        backgroundColor: '#FAD16B',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // marginTop: 10
    },
    action_box_login: {
        backgroundColor: '#FAD16B',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    new_account: {
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
        fontSize: 15
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        // borderWidth: 2,
        width: '100%',
        height: 130,
        // display: 'flex',
        // flexDirection: 'row',
        // zIndex: -10
    },
    text: {
        alignSelf: 'center',
        // alignSelf: 'flex-end',
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
        // zIndex: -10,
        fontSize: 15
    },
    icon_box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: '#F1F6F7',
        height: 60,
        width: 60,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    image: {
        width: 35,
        height: 35,
    },
    new_account: {
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
        fontSize: 15
    },
    error: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: 'crimson',
        marginBottom: 10,
        // position: 'absolute',
    },
    image: {
        width: 35,
        height: 35,
    },
})