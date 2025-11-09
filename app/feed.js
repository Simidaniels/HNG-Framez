import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { PostContext } from "../src/context/postContext";
import { useAuth } from "../src/context/AuthContext";

export default function Feed() {
  const router = useRouter();
  const { posts, deletePost } = useContext(PostContext);
  const { logout } = useAuth();

  // Format timestamp
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Handle logout
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
      {/* Header with title + logout button */}
      <View style={styles.header}>
        <Text style={styles.title}>Feed</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
            <Text>{item.content}</Text>

            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}

            <View style={styles.buttons}>
              <Button
                title="View Profile"
                onPress={() => router.push(`/profile?userId=${item.id}`)}
              />
              <Button title="Delete" color="red" onPress={() => deletePost(item.id)} />
            </View>
          </View>
        )}
      />

      {/* Create Post button at the bottom */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/createPost")}
      >
        <Text style={styles.createText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  // Header with Feed title + Logout button
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  post: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  author: { fontWeight: "bold", marginBottom: 2 },
  timestamp: { fontSize: 12, color: "#888", marginBottom: 5 },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  image: { width: "100%", height: 200, marginVertical: 10, borderRadius: 10 },

  // Create post button (bottom)
  createButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  createText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
