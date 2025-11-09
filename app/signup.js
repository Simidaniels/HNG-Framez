import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link, useRouter } from "expo-router";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }

    // TODO: Replace this with Firebase signup logic
    console.log("Sign up with:", email, password);

    // Navigate to home after signup
    router.push("./feed.js");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Framez Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Link href="/login" style={styles.link}>
        Already have an account? <Text style={{ fontWeight: "600" }}>Log In</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#34C759",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    marginTop: 20,
    color: "#007AFF",
    textAlign: "center",
    fontSize: 16,
  },
});
