import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { authActions } from './app/features/auth/authSlice';
import { userActions } from './app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppState } from './app/store';
import {
  Home,
  SignIn,
  SignUp,
  Error,
  ForgotPassword,
  ResetPassword,
  ActivationEmail,
} from './pages';
import { AddDiary, AllDiaries, Profile } from './pages/dashboard';

function App() {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state: AppState) => state.auth);

  useEffect(() => {
    const firstLogin =
    localStorage.getItem('firstLogin') ||
    sessionStorage.getItem('firstLogin');
    if (firstLogin) {
      dispatch(authActions.loginSuccess(true));
      dispatch(userActions.getUserStart());
    }
  }, [isLogged, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/all-diaries'
          element={isLogged ? <AllDiaries /> : <SignIn />}
        />
        <Route path='/profile' element={isLogged ? <Profile /> : <SignIn />} />
        <Route path='/sign-up' element={isLogged ? <Home /> : <SignUp />} />
        <Route path='/sign-in' element={isLogged ? <Home /> : <SignIn />} />
        <Route
          path='/forgotPassword'
          element={isLogged ? <Home /> : <ForgotPassword />}
        />
        <Route path='/user/resetPassword/:token' element={<ResetPassword />} />
        <Route
          path='/user/activate/:activationToken'
          element={<ActivationEmail />}
        />
        <Route
          path='/add-diary/:docId'
          element={isLogged ? <AddDiary /> : <SignIn />}
        />
        <Route path='/*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
