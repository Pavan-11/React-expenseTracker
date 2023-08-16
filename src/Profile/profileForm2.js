import React from 'react';

import classes from './ProfileForm.module.css';

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import { useRef } from 'react';

import { useContext } from 'react';

import AuthContext from '../store/auth-context';

import { useEffect, useState } from 'react';

import LogoutButton from '../Buttons/logoutButton';



const CompleteProfile = () => {

    const authCtx = useContext(AuthContext);

    const nameInputRef = useRef();

    const imageInputRef = useRef();



    const [userData, setUserData] = useState({

        displayName: '',

        photoUrl: ''

    });

    const submitHandler = async (event) => {

        event.preventDefault();

        const enteredName = nameInputRef.current.value;

        const photoUrl = URL.createObjectURL(imageInputRef.current.files[0]);

        console.log(enteredName);

        console.log(photoUrl.name)

        if (!photoUrl) {

            console.log("upload image");

            return;

        }

        console.log(photoUrl)

        let token = authCtx.token





        try {

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB_Ik2WHyyKyhKlhNgcTRVWSvtApCGCspw', {

                method: 'POST',

                body: JSON.stringify({

                    idToken: token,

                    displayName: enteredName,

                    photoUrl: photoUrl,

                    deleteAttribute: ["DISPLAY_NAME"],

                    returnSecureToken: true

                }),

                headers: {

                    'Content-Type': 'application/json',

                    // 'Authorization': `Bearer ${authCtx.token}`, // Use Bearer token format



                },

            })

            if (response.ok) {

                alert("Profile updated successfully");

            } else {

                console.log(response)

                alert("Profile update failed");

            }

        }

        catch (error) {

            console.error("An error occurred:", error);

        }

    }

    useEffect(() => {

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB_Ik2WHyyKyhKlhNgcTRVWSvtApCGCspw', {

            method: 'POST',

            body: JSON.stringify({

                idToken: authCtx.token

            }),

            headers: {

                'Content-Type': 'application/json'

            }

        }).then((response) => {

            if (response.ok) {

                console.log(response);

                return response.json();

            }

            throw new Error("Failed to fetch user data");

        }).then((data) => {

            const user = data.users[0];

            if (user) {

                setUserData({

                    displayName: user.displayName || '',

                    photoUrl: user.photoUrl || ''

                })

            }



        }).catch(err => {

            console.log(err)

        })

    }, [])

    return (

        <Form onSubmit={submitHandler} className={classes.form}>

            <Form.Group className={classes.control} controlId="name">

                <Form.Label>Name</Form.Label>

                <Form.Control type="text" placeholder="Name" ref={nameInputRef} defaultValue={userData.displayName} />



            </Form.Group>



            <Form.Group className={classes.control} controlId="photo">

                <Form.Label>Update your photo</Form.Label>

                <Form.Control type="file" placeholder="upload Profile picture " ref={imageInputRef} />

                {

                    userData.photoUrl ? (

                        <img src={userData.photoUrl} alt="Profile" />

                    ) : (

                        <p>No profile picture available</p>

                    )

                }            </Form.Group>



            <Button variant="primary" type="submit" className={classes.action}>

                Update details

            </Button>

            <LogoutButton />

        </Form>

    )

}



export default CompleteProfile
