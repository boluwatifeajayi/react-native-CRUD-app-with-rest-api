import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useContacts } from '../../context/ContactsContext';
import { router } from 'expo-router';
import { List, Text, Appbar, TouchableRipple, Searchbar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 

const Home = () => {
  const { user } = useAuth();
  const { getContacts, contacts, loading } = useContacts();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    if (user) {
      getContacts();
    }
    else if (!user){
      router.replace('/login')
    }
  }, [user]);

  const calculateGreeting = () => {
    if (!user) {
      return 'Home';
    }

    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return `Good morning, ${user.name}`;
    } else if (currentHour >= 12 && currentHour < 18) {
      return `Good afternoon, ${user.name}`;
    } else {
      return `Good evening, ${user.name}`;
    }
  };

  const greeting = calculateGreeting();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: '#333' }}>
        <Appbar.BackAction onPress={() => {}} color="#fff" />
        <Appbar.Content title="Note Taker" color='#fff' />
        <Appbar.Action
          icon={isSearchVisible ? "close" : "magnify"}
          onPress={() => setIsSearchVisible(!isSearchVisible)}
          color="#fff"
        />
      </Appbar.Header>

      <SafeAreaView>
        <View className="px-5 py-7">
          <Text variant="headlineSmall">{greeting}</Text>

          {isSearchVisible && (
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{ marginVertical: 10 }}
            />
          )}

          {loading ? (
            <View className="mt-44"><ActivityIndicator size="large" color="#444" /></View>
          ) : (
            <View>
              <Text variant="titleMedium">Your Notes:</Text>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <TouchableRipple
                    key={contact._id}
                    onPress={() => {
                      router.replace(`/contact/${contact._id}`);
                    }}
                  >
                    <List.Item
                      title={contact.name}
                      description={
                        contact.email.split(' ').slice(0, 10).join(' ') +
                        (contact.email.split(' ').length > 10 ? '...' : '')
                      }
                      left={(props) => <List.Icon {...props} icon="folder" />}
                      right={() => <View className="mt-2"><AntDesign name="right" size={20} color="#444" /></View>} // Right-angled bracket
                    />
                  </TouchableRipple>
                ))
              ) : (
                <Text style={{textAlign: 'center', marginTop: 60}}>
                  {searchQuery ? 'No matching notes found.' : 'No notes yet.'}
                </Text>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
