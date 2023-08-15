import AuthContext from '../store/auth-context';
import classes from './ProfileForm.module.css';
import {useRef, useContext} from 'react';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const nameInputRef = useRef();
  const photoInputRef = useRef();


  const submitHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB_Ik2WHyyKyhKlhNgcTRVWSvtApCGCspw',
    {
      method : 'POST',
      body : JSON.stringify({
        idToken : authCtx.token,
        name : enteredName,
        imageUrl:enteredPhotoUrl,
        returnSecureToken : false,
      }),
      headers : {
        "Content-Type" : "application/json",
      }
    }).then(res => {
      console.log('success');
      history.replace('/');
    })

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1>Profile Details</h1>
      <div className={classes.control}>
        <label htmlFor='name'>Full Name</label>
        <input type='text' minLength="5" id='name' ref={nameInputRef} />
      </div>

      <div className={classes.control}>
        <label htmlFor='profile-photo'>Profile Photo Url</label>
        <input type='text' minLength="5" id='profile-photo' ref={photoInputRef} />
      </div>

      <div className={classes.action}>
        <button>Update</button>
      </div>
    </form>
  );
}

export default ProfileForm;
