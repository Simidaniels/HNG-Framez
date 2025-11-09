import React, { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([
    { id: "1", author: "Daniel", content: "My first Framez post 🎬", image: null },
    { id: "2", author: "Jane", content: "Loving this new app!", image: null },
  ]);

  // Add a new post with optional image
  const addPost = (content, image = null) => {
    const newPost = {
      id: (posts.length + 1).toString(),
      author: "You",
      content,
      image, // image URI or null
    };
    setPosts([newPost, ...posts]); // newest posts on top
  };

  // Delete a post by ID
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}
