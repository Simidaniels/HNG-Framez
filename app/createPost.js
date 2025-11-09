import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PostContext } from "../src/context/postContext";

export default function CreatePost() {
  const router = useRouter();
  const { addPost } = useContext(PostContext);
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim() === "") return;
    addPost(content);
    setContent("");
    router.push("/feed"); // go back to feed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <TextInput
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        style={styles.input}
        multiline
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    minHeight: 60,
    textAlignVertical: "top",
  },
});
