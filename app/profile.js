import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { PostContext } from "../src/context/postContext";

export default function ProfileScreen() {
  const { posts } = useContext(PostContext);

  // Mock logged-in user
  const user = {
    name: "Daniel Adepitan",
    email: "daniel@example.com",
    avatar: "https://ui-avatars.com/api/?name=Daniel+Adepitan",
  };

  // Filter posts created by this user
  const userPosts = posts.filter((post) => post.author === user.name || post.author === "You");

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.posts}>Posts: {userPosts.length}</Text>

      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        style={{ width: "100%", marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text>{item.content}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
          </View>
        )}
        ListEmptyComponent={<Text>No posts yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "700" },
  email: { fontSize: 16, color: "#555" },
  posts: { marginTop: 10, fontSize: 16 },
  post: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
  },
  postImage: { width: "100%", height: 200, marginTop: 10, borderRadius: 10 },
});
