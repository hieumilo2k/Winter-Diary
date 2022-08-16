import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { authActions } from './app/features/auth/authSlice';
import { useAppDispatch } from './app/hooks';
import {
  Home,
  SignIn,
  SignUp,
  Error,
  ForgotPassword,
  ResetPassword,
  ActivationEmail,
  ProtectedRoute,
} from './pages';
import { AddDiary, AllDiaries, Profile } from './pages/dashboard';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const firstLogin =
      localStorage.getItem('firstLogin') ||
      sessionStorage.getItem('firstLogin');
    if (firstLogin) {
      dispatch(authActions.loginSuccess(true));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path='/all-diaries' element={<AllDiaries />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add-diary/:docId' element={<AddDiary />} />
        </Route>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/user/resetPassword' element={<ResetPassword />} />
        <Route
          path='/user/activate/:activationToken'
          element={<ActivationEmail />}
        />
        <Route path='/*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
