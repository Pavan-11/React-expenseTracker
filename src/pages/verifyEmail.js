import React, { useContext, useState } from 'react';
import {Button, Spinner} from 'react-bootstrap';
import AuthContext from '../store/auth-context';



const VerifyEmail = () => {
    const authCtx = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    
    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_Ik2WHyyKyhKlhNgcTRVWSvtApCGCspw',{
                method : 'POST',
                body : JSON.stringify({
                    idToken : authCtx.token,
                    email : authCtx.email,
                    requestType: "VERIFY_EMAIL",
                }),
                headers: {
                    'Content-Type': 'application/json',
                },

            })

            console.log("hi",response)
            if(response.ok){
                setVerificationResult('success')
                alert("Your account has been verified");
            }else{
                setVerificationResult('error')
                console.log("this is response",response)

                // throw new Error('Something went wrong!');
            }
        }
        catch (error) {

            console.error("An error occurred:", error.message);
            setVerificationResult('error')
        }
        setIsLoading(false);
    }

  return (
    <div>
        {isLoading ? (
            <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        ) : (
            <>
                <Button onClick={submitHandler}>Verify Email</Button>
                {verificationResult === 'success' && (
                    <p>Your account has been verified</p>
                )}
                {verificationResult === 'error' && (
                    <p>An error occured while verifying your account</p>
                )}
            </>
        )}
    </div>
  )
}

export default VerifyEmail;
