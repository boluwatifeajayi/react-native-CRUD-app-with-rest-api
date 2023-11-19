import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { ContactsProvider } from "../context/ContactsContext";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A237E', // Dark blue
    secondary: '#333333', // Dark gray
  },
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        </PaperProvider>
      </ContactsProvider>
    </AuthProvider>
  );
}
