import { createContext, useEffect, useState } from "react";




 export const AuthContext = createContext()


export default function AuthContextProvider({children}){
 
    let [userIsLoggedIn,setUserIsLoggedIn] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem('token') != null){
            setUserIsLoggedIn(true)
        }
    },[])
    return <AuthContext.Provider value={{userIsLoggedIn , setUserIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
}