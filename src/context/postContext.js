import React, { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([
    { id: "1", author: "Daniel", content: "My first Framez post 🎬" },
    { id: "2", author: "Jane", content: "Loving this new app!" },
  ]);

  const addPost = (content) => {
    const newPost = {
      id: (posts.length + 1).toString(),
      author: "You",
      content,
    };
    setPosts([newPost, ...posts]); // newest posts on top
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
