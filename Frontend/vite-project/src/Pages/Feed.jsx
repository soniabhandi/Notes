import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      caption: "Enjoying the beautiful view!",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
      caption: "Nature always makes me happy.",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data.post);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Feed</h2>

        {posts?.length === 0 ? (
          <p className="text-center text-gray-500">No posts available yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md mb-6 overflow-hidden"
            >
              <img src={post.image} alt="Post" className="w-full h-auto" />

              <div className="p-4">
                <p className="text-gray-800 text-base">{post.caption}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
