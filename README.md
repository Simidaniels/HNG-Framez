# Getting started with any react native app 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project


Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



## Framez Mobile App

Framez is a lightweight social media app built with React Native and Expo Router. Users can sign up, log in, create posts with text and images, view a live feed, and manage their profiles. The app is designed to provide a simple, intuitive, and elegant social experience on mobile devices.

## Features

## Authentication
-Secure signup and login with email and password using Firebase Authentication
-Persistent login sessions until the user logs out
-Friendly error messages for invalid input, already registered email, or weak password

## Feed
-Dynamic feed showing posts from all users
-Each post displays author, timestamp, content, and image (optional)
-Delete posts functionality for posts you created

## Create Post
-Create posts with text content and optional images
-Live updates to the feed after creating a post
-Simple image picker powered by Expo Image Picker

## Profile
-View your profile details including name, email, and avatar
-View all posts created by you
-Quick access to create a new post directly from your profile
-Logout button to securely exit the account

## Navigation
-Navigation handled using Expo Router Stack
-Smooth transitions between Login, Signup, Feed, Profile, and Create Post pages



## Tech Stack

-Frontend: React Native
-Navigation: Expo Router
-State Management: React Context API (PostContext & AuthContext)
-Authentication & Backend: Firebase Authentication
-Image Uploads: Expo Image Picker
-Development Tools: Expo CLI

## Screens

-Login Page: Enter email and password to access the app
-Signup Page: Enter name, email, and password to create an account
-Feed Page: Browse posts from all users, view profile, delete own posts
-Profile Page: View personal info and all posts created by the user
-Create Post Page: Add text and/or image posts
