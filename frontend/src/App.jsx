import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Loading from './components/Loading';
import { useAuth } from './context/AuthContext';

const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Employees = React.lazy(() => import('./components/Employees'));
const NotFound = React.lazy(() => import('./components/NotFound'));

function App() {
  const { state } = useAuth();
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              state.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              state.isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Register />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              state.isAuthenticated ? <Dashboard /> : <Navigate to="/" />
            }
          />
          <Route
            path="/dashboard/employees"
            element={
              state.isAuthenticated ? <Employees /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
