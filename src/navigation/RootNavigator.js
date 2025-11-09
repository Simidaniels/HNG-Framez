import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainTab from "./MainTab";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
