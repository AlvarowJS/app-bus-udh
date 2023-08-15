import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Text, TextInput, View } from 'react-native'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme'
import { GoogleLogo } from '../components/GoogleLogo'
import { useForm } from '../hooks/useForm'
import { AuthContext } from '../context/AuthContext'

export const LoginScreen = () => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert('Login Incorrecto', errorMessage, [
            {
                text: 'Ok',
                onPress: removeError
            }
        ]);

    }, [errorMessage])

    const onLogin = () => {
        console.log({ email, password })
        signIn({ email, password })
    }
    const [estado, setEstado] = useState(true)

    const cambiarEstado = () => {
        setEstado(!estado)

    }

    return (
        <>
            <Background />

            <WhiteLogo />
            <View style={loginStyles.title}>
                {
                    estado ? (
                        <Text style={loginStyles.text_active} >INGRESAR</Text>
                    ) : (
                        <Text style={loginStyles.text} onPress={cambiarEstado}>INGRESAR</Text>
                    )
                }
                {
                    estado ? (
                        <Text style={loginStyles.text} onPress={cambiarEstado}>REGISTRAR</Text>

                    ) : (
                        <Text style={loginStyles.text_active}>REGISTRAR</Text>
                    )
                }

            </View>
            {
                estado ? (
                    <View style={loginStyles.content_inputs}>
                        <TextInput
                            placeholder='correo institucional'
                            autoCorrect={false}
                            style={loginStyles.input}
                            onChangeText={(value) => onChange(value, 'email')}
                            value={email}
                            onSubmitEditing={onLogin}
                        />
                        <TextInput
                            onChangeText={(value) => onChange(value, 'password')}
                            value={password}
                            onSubmitEditing={onLogin}
                            secureTextEntry
                            placeholder='contraseña'
                            autoCapitalize='none'
                            style={loginStyles.input}
                        />
                        <Text style={loginStyles.aviso}>Su contraseña viene a ser su codigo de estudiante en todo caso puede ingresar directamente desde su cuenta institucional de Google</Text>
                    </View>
                ) : (
                    <View>
                        <Text style={loginStyles.aviso}>Recuerda que la app es exclusiva para estudiantes de la Universidad de Huánuco</Text>
                    </View>
                )
            }

            <View style={loginStyles.container}>
                {
                    estado ? (
                        <View style={loginStyles.login_button}>
                            <Button onPress={onLogin} color={'#ffff'} title='Ingresar' />
                        </View>
                    ) : null
                }

                {
                    estado ? (
                        <View style={loginStyles.google}>
                            <GoogleLogo />
                            <Text>Ingresar con google</Text>
                        </View>
                    ) : (
                        <View style={loginStyles.google}>
                            <GoogleLogo />
                            <Text>Registrar con google</Text>
                        </View>
                    )

                }

            </View>

        </>
    )
}
