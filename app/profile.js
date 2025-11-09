import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { PostContext } from "../src/context/postContext";
import { useAuth } from "../src/context/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { posts } = useContext(PostContext);
  const { user, logout } = useAuth();
  const router = useRouter();

  // If no user is logged in yet (still loading or logged out)
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  // Filter posts created by this logged-in user
  const userPosts = posts.filter(
    (post) => post.author === user.displayName || post.author === user.email
  );

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (err) {
      console.log("Logout error:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.displayName || user.email || "User"
            )}`,
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>{user.displayName || "Anonymous"}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.posts}>Posts: {userPosts.length}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

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
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
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
