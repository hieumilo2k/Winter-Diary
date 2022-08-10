import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, SignIn, SignUp, Error, ProtectedRoute } from './pages';
import { AddDiary, AllDiaries, Profile } from './pages/dashboard';

function App() {
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
        <Route path='/*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
