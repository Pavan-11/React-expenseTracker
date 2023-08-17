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
          <h3>Welcome to Expense Tracker</h3>
        </div>

        <div>
          <h3>Your Profile is incomplete <Link to="/profileForm">Complete Now</Link></h3>
        </div>


        <VerifyEmail />

        <div>
          <LogoutButton />
        </div>

      </header>


      <Link to='/expenseForm'>Go To Daily Expenses</Link>
    </>
  )
}
export default Profile;
