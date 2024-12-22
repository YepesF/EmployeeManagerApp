import { createContext, use, useContext, useReducer } from "react";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };