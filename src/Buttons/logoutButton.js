import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../store/auth-context';
import {Button} from 'react-bootstrap';

const LogoutButton = () => {
    const authCtx = useContext(AuthContext);

    const history = useHistory();

    const logoutHandler = () => {
        authCtx.logout();
        history.replace('/auth');
    }
    
    const isLoggedIn = authCtx.isLoggedIn;
 
    return (
    <div>
        {isLoggedIn && (
            <>
                <Button onClick={logoutHandler}>Logout</Button>
            </>
        )}
    </div>
  )
}
export default LogoutButton;