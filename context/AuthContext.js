// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import server from '../utils/server';

const AuthContext = createContext();

const initialState = {
  token: null,
  user: null,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          dispatch({ type: 'SET_TOKEN', payload: token });
          // Fetch user details after setting the token
          await getUserDetails(token);
        }
      } catch (error) {
        console.error('Error checking token from AsyncStorage:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkToken();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await axios.post(`${server}/auth`, { email, password });

      await AsyncStorage.setItem('token', response.data.token);

      dispatch({ type: 'SET_TOKEN', payload: response.data.token });
     
      await getUserDetails(response.data.token);
    } catch (error) {
      console.log('Request Details:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await axios.post(`${server}/users`, { name, email, password });

      await AsyncStorage.setItem('token', response.data.token);

      dispatch({ type: 'SET_TOKEN', payload: response.data.token });
     
      await getUserDetails(response.data.token);
    } catch (error) {
      console.error('Registration failed:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getUserDetails = async (token) => {
    try {
      const response = await axios.get(`${server}/auth`, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: 'SET_USER', payload: response.data });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch({ type: 'SET_TOKEN', payload: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
