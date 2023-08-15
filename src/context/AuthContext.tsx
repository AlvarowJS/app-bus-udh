import React, { Children, createContext, useEffect, useReducer, useState } from "react";
import { LoginData, LoginResponse } from "../interfaces/appInterfaces";
import { AuthState, authReducer } from "./authReducer";
import busApi from "../api/busApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: LoginResponse;
    status: 'checking' | 'authenticated' | 'not-authenticate';
    signUp: () => void;
    signIn: (LoginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;

}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')
        
        // No hay token
        if (!token) return dispatch({ type: 'notAuthenticated' })
        // hay token
        const resp = await busApi.get('/auth');
        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }
        
        await AsyncStorage.setItem('token', resp.data.token );
        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data
            }
        });


    }

    const signIn = async ({ email, password }: LoginData) => {
        try {
            const { data } = await busApi.post<LoginResponse>('/login-user', { email, password })
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data,
                }
            })
            await AsyncStorage.setItem('token', data.token)
        } catch (error) {
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Informacion Incorrecta'
            })
        }
    };
    const signUp = () => { };
    const logOut = () => { };
    const removeError = () => {
        dispatch({ type: 'removeError' })
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}