import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
function AllPost() {
  const [post, setPost] = useState([]);
  useEffect(() => {}, []);
  appwriteService.getPost([]).then((posts) => {
    if (posts) {
      setPost(posts.document);
    }
  });
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map(() => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
