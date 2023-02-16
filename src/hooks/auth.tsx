import React , { Children, ReactNode, createContext, useContext, useState } from "react";

import * as AuthSession from 'expo-auth-session'



interface AuthProviderProps {
    children: ReactNode
}
interface User {
    id: string,
    name: string,
    email: string,
    photo?: string
}

interface IAuthContentData{
    user: User;
    sigInWithGoogle(): Promise<void>;
}
interface AthorizationResponse{
    params:{
        access_token: string;
    }
    type: string;
}

const AuthContext = createContext({} as IAuthContentData);

function AuthProvider({children}:AuthProviderProps){
        const [user, setUser] = useState<User>({} as User)
    async function sigInWithGoogle(){
        try{
            const CLIENT_ID = '166077300320-e24n10mq7q6jade92tgcar5ee4l50ro2.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@will019/goFinances';
            const RESPONSE_TYPE= 'token';
            const SCOPE = encodeURI( 'profile email');

           
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
           
            const {type , params} = await AuthSession.startAsync({authUrl}) as AthorizationResponse;
            if (type === 'success') {
                const response = await fetch(`https://google.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json();
                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.name,
                    photo: userInfo.photo
                })
            }
            console.log(response);
        } catch(error) {
            throw new Error(error);
    }}

    return (
        <AuthContext.Provider value={{user,sigInWithGoogle}}>
        { children }
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context;

}


export {AuthProvider, useAuth}
