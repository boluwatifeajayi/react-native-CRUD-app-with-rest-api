// Register.js
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import {router} from 'expo-router';
import { Stack} from "expo-router";
import { Link } from 'expo-router';

const Register = () => {
  const { register, isLoading, error, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      // Navigate to the home screen or handle it based on your navigation structure
    } catch (error) {
      Alert.alert('Registration Failed', 'Unable to register. Please try again.', [{ text: 'OK' }]);
      console.log(error);
    }
  };

  useEffect(() => {
    if(user){
      router.replace('/home')
    }
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
         <Stack.Screen
      options={{
        headerShadowVisible: false,
        headerTitle: "",
      }}
    />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 12, color: '#333' }}>Register</Text>
          <Text style={{ marginBottom: 24, color: '#333' }}>Create a new account to get started</Text>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ width: '100%', marginBottom: 16, backgroundColor: 'transparent' }}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ width: '100%', marginBottom: 16, backgroundColor: 'transparent' }}
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{ width: '100%', marginBottom: 16, backgroundColor: 'transparent' }}
          />
          {error && <Text style={{ color: 'red', marginTop: 10, marginBottom: 10 }}>{error}</Text>}
          <Button
            mode="contained"
            onPress={handleRegister}
            loading={isLoading}
            style={{ width: '100%', paddingVertical: 10, backgroundColor: '#333', marginTop: 10 }}
          >
            {isLoading ? 'Loading...' : 'Register'}
          </Button>
          <Text className="text-center mt-4">Or</Text>
          <Link href="/login" className="mt-3 bg-gray-100 rounded-2xl w-full text-center py-6"><Text className="text-center">Sign in</Text></Link>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;
