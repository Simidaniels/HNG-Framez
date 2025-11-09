import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../src/context/AuthContext";

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth(); // get signup function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError(""); // clear previous errors

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await signup(email.trim(), password); // Firebase signup
      router.replace("/feed"); // navigate to feed after signup
    } catch (err) {
      console.log("Signup error:", err);
      // Show friendly error messages
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Minimum 6 characters required.");
          break;
        default:
          setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Framez Account</Text>

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
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
    marginBottom: 24,
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
  error: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
  },
});
