import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { PostContext } from "../src/context/postContext";

export default function CreatePost() {
  const router = useRouter();
  const { addPost } = useContext(PostContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (content.trim() === "" && !image) return; // prevent empty posts
    addPost(content, image); // pass both content and image
    setContent("");
    setImage(null);
    router.push("/feed"); // navigate back to feed
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
      {image && <Image source={{ uri: image }} style={styles.preview} />}
      <Button title="Pick an Image" onPress={pickImage} />
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
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});
