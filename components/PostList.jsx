import { useState, useEffect } from "react";
import Link from "next/link";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { deleteDoc } from "../utils/firestoreApi";
import fire from "../config/fire-config";

const PostList = ({ isAuth = false, onEdit, collectionName }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fire
      .firestore()
      .collection(collectionName)
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);

  const onDelete = async (id) => {
    deleteDoc(id, collectionName);
  };

  const DeleteButton = ({ postId }) => (
    <IconButton aria-label="delete" onClick={() => onDelete(postId)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );

  const EditButton = ({ postData }) => (
    <IconButton aria-label="edit" onClick={() => onEdit(postData)}>
      <EditIcon fontSize="small" />
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
            {isAuth && (
              <EditButton
                postData={{
                  orgTitle: blog.title,
                  orgContent: blog.content,
                  orgId: blog.id,
                  orgIsPublic: blog.isPublic,
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PostList;
