import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
  const user = {
    name: "Daniel Adepitan",
    email: "daniel@example.com",
    avatar: "https://ui-avatars.com/api/?name=Daniel+Adepitan",
    posts: 5,
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.posts}>Posts: {user.posts}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "700" },
  email: { fontSize: 16, color: "#555" },
  posts: { marginTop: 10, fontSize: 16 },
});
