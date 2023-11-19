// ContactsContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import server from '../utils/server';

const ContactsContext = createContext();

const initialState = {
  contacts: [],
  contact: null, // Initial state for a single contact
  loading: true,
  error: null,
};

const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload, loading: false, error: null };
    case 'SET_CONTACT':
      return { ...state, contact: action.payload, loading: false, error: null };
    case 'ADD_CONTACT':
      return { ...state, contacts: [action.payload, ...state.contacts], loading: false, error: null };
    case 'UPDATE_CONTACT':
      const updatedContacts = state.contacts.map(contact =>
        contact._id === action.payload._id ? action.payload : contact
      );
      return { ...state, contacts: updatedContacts, loading: false, error: null, contact: null }; // Clear contact after update
    case 'DELETE_CONTACT':
      const filteredContacts = state.contacts.filter(contact => contact._id !== action.payload);
      return { ...state, contacts: filteredContacts, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_CONTACT':
      return { ...state, contact: null }; // Clear contact
    default:
      return state;
  }
};
  

const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactsReducer, initialState);
  
  const getContacts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${server}/contacts`, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: 'SET_CONTACTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error fetching contacts' });
    }
  };

  const getContactById = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
  
      
  
      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${server}/contacts/${id}`, {
        headers: {
          Authorization: token,
        },
      });
  
      dispatch({ type: 'SET_CONTACT', payload: response.data }); // Set the contact data
    } catch (error) {
      console.error('Error fetching contact by ID:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error fetching contact by ID' });
    }
  };
  



  const addContact = async contactData => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(`${server}/contacts`, contactData, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: 'ADD_CONTACT', payload: response.data });
    } catch (error) {
      console.error('Error adding contact:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error adding contact' });
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
  
      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
  
      const response = await axios.put(`${server}/contacts/${id}`, contactData, {
        headers: {
          Authorization: token,
        },
      });
  
      dispatch({ type: 'UPDATE_CONTACT', payload: response.data });
  
      // Fetch the updated contact again and set it in the state
      await getContactById(id);
    } catch (error) {
      console.error('Error updating contact:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error updating contact' });
    }
  };
  

  const deleteContact = async id => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      await axios.delete(`${server}/contacts/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      console.error('Error deleting contact:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error deleting contact' });
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        ...state,
        getContacts,
        getContactById,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};

export { ContactsProvider, useContacts };
