import React from "react";
import { View, Text } from "react-native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 




export default function TabsLayout() {
  return (
   

   
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle:
          Platform.OS === "ios" && {
            backgroundColor: "transparent",
          },
        headerShown: false,
      }}
      tabBar={(props) =>
        Platform.OS === "ios" ? (
          <BlurView
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            intensity={95}
          >
            <BottomTabBar {...props} />
          </BlurView>
        ) : (
          <BottomTabBar {...props} />
        )
      }
    >
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              
              <Ionicons name="home-outline" size={24} color={color} />
              <Text style={{ marginTop: 3, fontSize: 10, opacity: 0.5 }}>
                
              </Text>
            </View>
          ),
        }}
      />
     
     <Tabs.Screen
        name="add"
        options={{
          href: "/add",
         
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              
              <AntDesign name="pluscircleo" size={24} color={color} />
              <Text style={{ marginTop: 3, fontSize: 10, opacity: 0.5 }}>
                
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          
          href: {
            pathname: "/profile",
          },
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              <FontAwesome5 name="user-circle" size={24} color={color} />
              <Text style={{ marginTop: 3, fontSize: 10, opacity: 0.5 }}>
      
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  
  );
}

function TabBarIcon(props) {
  return (
    // <FontAwesome5
    //   size={props.size || 26}
    //   style={{ marginBottom: -3 }}
    //   {...props}
    // />
    <Ionicons name="home-outline" size={props.size || 26} color="black" style={{ marginBottom: -3 }} {...props}/>
  );
}
