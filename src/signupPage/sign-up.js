import React, { useRef } from 'react';
import classes from './sign-up.module.css';

const SignUp = () => {

    const emailinputRef = useRef();
    const passwordinputRef = useRef();
    const confirminputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailinputRef.current.value;
        const enteredPassword = passwordinputRef.current.value;
        const enteredConfirmPassword = confirminputRef.current.value;
        if (enteredConfirmPassword !== enteredPassword) {
            alert("password and confirm password does not match");
        } else {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_Ik2WHyyKyhKlhNgcTRVWSvtApCGCspw', {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    confirmPassword: enteredConfirmPassword,
                    returnSecureToken: true,
                }),
                headers: { 'Content-Type': "application/json" }
            }).then(res => {
                if (res.ok) {
                    console.log('response', res)
                    return res.json();
                } else {
                    return res.json().then(data => {

                        localStorage.setItem('email', data.email);
                        let errorMessage = 'INVALID';
                        throw new Error(errorMessage);
                    });
                }
            })
                .catch(error => {
                    console.log(`Error ${error}`)
                    alert(error.message)
                })
        }
    }

        return (
            <>
                <form className={classes.form} onSubmit={formSubmitHandler}>
                    <h1>Sign Up</h1>
                    {/* <label htmlFor="email">Email</label> */}
                    <input className={classes.input} type='email' name='email' id='email' required placeholder='email' ref={emailinputRef} />
                    {/* <label htmlFor="password">Password</label> */}
                    <input type='password' className={classes.input} name='password' id='password' required placeholder='password' ref={passwordinputRef} />
                    {/* <label htmlFor="conf-password">Confirm Password</label> */}
                    <input type='password' className={classes.input} name='conf-password' id='conf-password' required placeholder='confirm-password' ref={confirminputRef} />
                    <button className={classes.signupBtn}>Sign Up</button>
                </form>
            </>
        );
    }
    export default SignUp;