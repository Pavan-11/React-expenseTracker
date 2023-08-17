import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';
const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const confirmPassword = useRef();
  const history = useHistory();


  const authCtx = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [resetEmailVisible, setResetEmailVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const resetPassword = async () => {
    setIsLoading(true);

    try {
      console.log('sending the reset password request')
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_Ik2WHyyKyhKlhNgcTRVWSvtApCGCspw', {
        method: 'POST',
        body: JSON.stringify({
          email: resetEmail,
          requestType: "PASSWORD_RESET"
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('reset password response: ', response);
      if (response.ok) {
        alert("Check your inbox for a link to reset the password");
      } else {
        throw new Error(`Error ${response}`);
      }
    } catch (err) {
      console.error("reset password error", err);
    }

    setIsLoading(false);

  }

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;



    setIsLoading(true);

    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_Ik2WHyyKyhKlhNgcTRVWSvtApCGCspw'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_Ik2WHyyKyhKlhNgcTRVWSvtApCGCspw'
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {

      setIsLoading(false);

      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication Failed';
          throw new Error(errorMessage);
        });
      }
    }).then(data => {
      authCtx.login(data.idToken, data.email);
      console.log("this is data", data)
      history.replace('/profile')
    }).catch(err => {
      alert(err.message);

    })
  }

  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler} >
        {!setResetEmailVisible && <div>

          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
        </div>}


        {resetEmailVisible && (<div className={classes.control}>
          <label htmlFor='resetEmail'>Enter Email for Password Reset</label>
          <input
            type='email'
            id='resetEmail'
            required
            value={resetEmail}
            onChange={(event) => setResetEmail(event.target.value)}
          />
          <div className={classes.actions}>

            <button
              type='button'
              className={classes.toggle}
              onClick={resetPassword}
            >
              Reset Password ?
            </button>
          </div>
        </div>)}

        {!setResetEmailVisible && <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={() => setResetEmailVisible(true)}
          >
            Forgot Password
          </button>
        </div>}



        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
