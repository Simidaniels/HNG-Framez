import { Stack } from "expo-router";
import { PostProvider } from "../src/context/postContext";
import { AuthProvider } from "../src/context/AuthContext"; // import AuthProvider

export default function Layout() {
  return (
    <AuthProvider>
      <PostProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="feed" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="createPost" />
        </Stack>
      </PostProvider>
    </AuthProvider>
  );
}
