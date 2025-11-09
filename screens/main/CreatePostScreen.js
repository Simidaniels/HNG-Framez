import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../src/context/AuthContext";

export default function CreatePostScreen() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePost = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        text,
        userId: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Post</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="What's on your mind?"
        multiline
      />
      <Button title={loading ? "Posting..." : "Post"} onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, height: 100, marginBottom: 10 },
});
