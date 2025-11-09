import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button, Image } from "react-native";
import { useRouter } from "expo-router";
import { PostContext } from "../src/context/postContext";

export default function Feed() {
  const router = useRouter();
  const { posts, deletePost } = useContext(PostContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.author}>{item.author}</Text>
            <Text>{item.content}</Text>

            {/* ✅ Display image if it exists */}
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}

            <View style={styles.buttons}>
              <Button
                title="View Profile"
                onPress={() => router.push(`/profile?userId=${item.id}`)}
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => deletePost(item.id)}
              />
            </View>
          </View>
        )}
      />
      <Button title="Create Post" onPress={() => router.push("/createPost")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  post: { marginBottom: 15, padding: 10, borderWidth: 1, borderRadius: 5 },
  author: { fontWeight: "bold", marginBottom: 5 },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  image: { width: "100%", height: 200, marginVertical: 10, borderRadius: 10 }, // added style for post images
});
