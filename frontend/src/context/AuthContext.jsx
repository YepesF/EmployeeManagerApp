import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const defaultAPIResponse = {
  data: [],
  total: 0,
  limit: 10,
  page: 1,
  pages: 1,
};

const initialState = JSON.parse(localStorage.getItem('authState')) || {
  isAuthenticated: false,
  user: null,
  token: null,
  employees: { ...defaultAPIResponse, allEmployees: [] },
  requests: defaultAPIResponse,
  alert: { status: '', message: '' },
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        employees: action.payload.employees || {
          ...defaultAPIResponse,
          allEmployees: [],
        },
        requests: action.payload.requests || defaultAPIResponse,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        employees: { ...defaultAPIResponse, allEmployees: [] },
        requests: defaultAPIResponse,
        alert: { status: '', message: '' },
      };
    case 'UPDATE_REQUESTS':
      return {
        ...state,
        requests: action.payload,
      };
    case 'UPDATE_EMPLOYEES':
      return {
        ...state,
        employees: action.payload,
      };
    case 'SET_ALERT':
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(initialState);

let globalDispatch = null;
let globalGetState = null;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  globalDispatch = dispatch;
  globalGetState = () => state;

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const getGlobalAuthState = () => globalGetState();
const globalLogout = () => {
  globalDispatch({ type: 'LOGOUT' });
  localStorage.removeItem('authState');
};

const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth, getGlobalAuthState, globalLogout };
