import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { TextInput as PaperInput, Button as PaperButton, Appbar } from 'react-native-paper';
import { useContacts } from '../../context/ContactsContext';
import { router } from 'expo-router';
import { Link } from 'expo-router';

const Add = () => {
  const { addContact, loading, error } = useContacts();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');

  const handleAddContact = async () => {
    try {
      // Create a new contact object
      const newContact = {
        name,
        email,
        phone: "sample",
        type: "sample",
      };

      await addContact(newContact);
      router.replace("/home")

      // Clear the form fields after adding the contact
      setName('');
      setEmail('');
      setPhone('');
      setType('');

      Alert.alert('Success', 'Contact added successfully');
    } catch (error) {
      console.error('Error adding contact:', error);

      Alert.alert('Error', 'Error adding contact. Please try again.');
    }
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {router.replace("/home")}} />
        <Appbar.Content title="Add Note" />

        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <SafeAreaView>
      <View style={{ padding: 16 }} className="mt-10">
        <Text className="text-md font-semibold" style={{ marginBottom: 10 }}>Title</Text>
        <TextInput
          label="Note Title"
          placeholder='Note Title'
          placeholderTextColor="#888"
          className="text-xl font-semibold"
          value={name}
          onChangeText={(text) => setName(text)}
          returnKeyType="next" 
          style={styles.input}
        />
        <Text className="text-md font-semibold" style={{ marginBottom: 10 }}>Note Body</Text>
        <TextInput
        label="Note Title"
        value={email}
        placeholder='Body, start typing...'
        placeholderTextColor="#888"
        className="text-lg"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        multiline
        returnKeyType="done"
        blurOnSubmit={true} // Add this prop
        numberOfLines={100}
        />

        <PaperButton
          mode="contained"
          onPress={handleAddContact}
          disabled={loading}
          loading={loading}
          className="mt-10"
          style={{ width: '100%', paddingVertical: 10, backgroundColor: '#333' }}
        >
         {loading ? 'Loading...' : 'Add Note'}
        </PaperButton>
        <Link href="/home" className="mt-3 rounded-lg w-full text-center py-4"><Text className="text-center">Go Back</Text></Link>
        {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
      </View>
    </SafeAreaView>
    </View>
    
  );
};

const styles = {
  input: {
    marginBottom: 16,
    borderColor: '#fff',
    backgroundColor: 'transparent'
  },
  textAreaInput: {
    marginBottom: 20,
    backgroundColor: 'transparent' // Adjust the height as needed
  },
  button: {
    marginTop: 16,
  },
};

export default Add;
