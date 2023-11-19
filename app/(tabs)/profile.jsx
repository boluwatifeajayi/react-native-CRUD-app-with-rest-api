import React from 'react';
import { View, Text, } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, Appbar } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router'

const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('token');
      // Navigate to the Login route
      router.replace('/login');
    } catch (error) {
      console.error('Error during logout:', error);
     
    }
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {router.replace("/home")}} />
        <Appbar.Content title="Profile" />

        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
    <View style={{ padding: 16 }}>
      <Card elevation={0} style={{backgroundColor: 'ghostwhite'}}>
        <Card.Content style={{ alignItems: 'center' }}>
        
          <Title>{user.name}</Title>
          <Paragraph>Email: {user.email}</Paragraph>
        </Card.Content>
      </Card>

      <View style={{ marginTop: 16 }}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={{ backgroundColor: '#DDD', borderRadius: 8, }}
        >
          <Text style={{color: "#333"}}>Logout</Text>
        </Button>
      </View>
    </View>
    </View>
  );
};

export default Profile;
