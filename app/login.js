import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../src/context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect to feed if user is already logged in
  useEffect(() => {
    if (user) {
      router.replace("/feed");
    }
  }, [user, router]); // ✅ include router to satisfy hook dependency

  const handleLogin = async () => {
    setError(""); // clear previous error

    // Validate inputs
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await login(email.trim(), password); // Firebase login
      router.replace("/feed"); // Navigate on success
    } catch (err) {
      console.log("Login error:", err);
      // Show friendly error messages
      switch (err.code) {
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Try again later.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Framez</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/signup" style={styles.link}>
        Don’t have an account? Sign Up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 15 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center" },
  link: { marginTop: 20, color: "#007AFF", textAlign: "center" },
  error: { color: "red", marginBottom: 15, textAlign: "center" },
});
