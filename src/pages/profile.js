import React from 'react';
import { Link } from 'react-router-dom';
import classes from './profile.module.css';
import VerifyEmail from '../Buttons/verifyEmail';
import LogoutButton from '../Buttons/logoutButton';

const Profile = () => {
  return (
    <>
    <header className={classes.header}>

    <div>
        <h2>Welcome to Expense Tracker</h2>
    </div>

    <div>
        <h2>Your Profile is incomplete <Link to ="/profileForm">Complete Now</Link></h2>
    </div>
    </header>

    <VerifyEmail />
    <LogoutButton />
    </>
  )
}
export default Profile;
