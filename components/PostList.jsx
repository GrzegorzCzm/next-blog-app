import { useState, useEffect } from "react";
import Link from "next/link";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import fire from "../config/fire-config";

const PostList = ({ isAuth = false }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);

  const onDelete = async (id) => {
    try {
      const res = await fire.firestore().collection("blog").doc(id).delete();
      console.log("Document successfully deleted!", JSON);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const DeleteButton = ({ postId }) => (
    <IconButton aria-label="delete" onClick={() => onDelete(postId)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href="/blog/[id]" as={"/blog/" + blog.id}>
              <a>{blog.title}</a>
            </Link>
            {isAuth && <DeleteButton postId={blog.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PostList;
