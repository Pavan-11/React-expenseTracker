import { createContext, useState } from "react";

const AuthContext = createContext({
    token : '',
    email : '',
    isLoggedIn : false,
    login : (token) => {},
    logout : () => {},
});

export const AuthContextProvider = (props) => {
    const intialToken = localStorage.getItem('token');
    const initialEmail  = localStorage.getItem('email')

    const [token, setToken] = useState(intialToken);
    const [email, setEmail] = useState(initialEmail)

    const userIsLoggedIn = !!token;

    const loginHandler = (token, recievedEmail) => {
        localStorage.setItem('token', token);
        setToken(token);

        localStorage.setItem('email', recievedEmail)
        setEmail(recievedEmail);
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    const ContextValue = {
        token : token,
        email : email,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    };
    
    return <AuthContext.Provider value={ContextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;