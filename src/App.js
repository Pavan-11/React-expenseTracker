import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import AuthContext from './store/auth-context';
import AuthPage from './pages/AuthPage';
import Profile from './pages/profile';
import CompleteProfile from './Profile/profileForm2';
import ExpensesForm from './pages/expensesForm';





function App() {

  const isAuth = useSelector(state => state.auth.isLoggedIn);

  return (
    <>
      <Switch>

        <Route path='/auth' component={AuthPage} />

        <Route path='/profile'>
          {isAuth ? <Profile /> : <Redirect to='/auth' />}
        </Route>

        <Route path='/profileForm' component={CompleteProfile} />

        <Route path='/expenseForm' component={ExpensesForm} />

        <Redirect from='/' to='/auth' />


      </Switch>
      {/* {!authCtx.isLoggedIn && (<Route path='/auth'>
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
      </Route> */}
    </>
  )
}

export default App;