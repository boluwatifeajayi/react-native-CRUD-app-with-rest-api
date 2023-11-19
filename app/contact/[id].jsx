import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native'; 
import { useLocalSearchParams } from 'expo-router';
import { useContacts } from '../../context/ContactsContext';
import { router, Stack } from 'expo-router';
import { TextInput as PaperInput, Button as PaperButton, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { getContactById, contact, loading, error, updateContact, deleteContact } = useContacts();
  const { id } = useLocalSearchParams();


  const [editedContact, setEditedContact] = useState(contact || {});

  useEffect(() => {
    getContactById(id);
  }, [id]);

  useEffect(() => {
    setEditedContact(contact || {});
  }, [contact]);

  const handleSaveClick = () => {
    // Call the updateContact function with the edited contact data
    updateContact(id, editedContact);
  };

  const handleDeleteClick = () => {
    // Show a confirmation alert before deleting the contact
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            // Call the deleteContact function with the contact ID
            await deleteContact(id);

            // Navigate to the home screen after deletion
            router.replace('/home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleInputChange = (field, value) => {
    setEditedContact((prevContact) => ({
      ...prevContact,
      [field]: value,
    }));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <Appbar.Header style={{ backgroundColor: 'white' }}>
        <Appbar.BackAction onPress={() => router.replace('/home')} />
        <Appbar.Content title="Edit Note" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitle: '',
          }}
        />
        <View style={{ flex: 1, padding: 20 }}>
          <TextInput
            placeholder="Name"
            value={editedContact.name || ''}
            onChangeText={(text) => handleInputChange('name', text)}
            style={{fontSize: 20, fontWeight: "bold", marginBottom:20}}
            clasName="font-bold text-xl"
          />
          <TextInput
            placeholder="Email"
            value={editedContact.email || ''}
            onChangeText={(text) => handleInputChange('email', text)}
            multiline={true}
            style={{fontSize: 15, marginTop:20}}
            numberOfLines={100} 
          />
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#444', // Light gray background color
                borderRadius: 8, // Rounded corners
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 10,
              }}
              onPress={handleSaveClick}
            >
              <Text style={{color: 'white'}}>Save Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: 'lightcoral', // Light coral background color for the 'Delete' button
                borderRadius: 8, // Rounded corners
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 10,
              }}
              onPress={handleDeleteClick}
            >
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
   
  );
}
