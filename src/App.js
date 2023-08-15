import { Switch, Route, Redirect } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import AuthPage from './pages/AuthPage';
import Profile from './pages/profile';
import ProfileForm from './Profile/ProfileForm';





function App() {
  const authCtx = useContext(AuthContext);
  return(
    <>
    <Switch>
      {!authCtx.isLoggedIn && (<Route path='/auth'>
        <AuthPage />
      </Route>)}

      <Route path='/profile'>
        {authCtx.isLoggedIn && <Profile />}
        {!authCtx.isLoggedIn && <Redirect to='/auth'/>}
      </Route>

      <Route path="/profileForm">
        <ProfileForm />
      </Route>

      <Route path="*">
        <Redirect to="/auth" />
      </Route>
    </Switch>
    </>
  )
}

export default App;