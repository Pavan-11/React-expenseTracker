import { Switch, Route, Redirect } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import AuthPage from './pages/AuthPage';
import Profile from './pages/profile';
import CompleteProfile from './Profile/profileForm2';
import ExpensesForm from './pages/expensesForm';





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
        <CompleteProfile />
      </Route>

      <Route path='/expenseForm'>
          <ExpensesForm />
      </Route>

      <Route path="*">
        <Redirect to="/auth" />
      </Route>
    </Switch>
    </>
  )
}

export default App;