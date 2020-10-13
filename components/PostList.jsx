import { useState, useEffect } from "react";
import Link from "next/link";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { deleteDoc, getDocList } from "../utils/firestoreApi";
import fire from "../config/fire-config";

const PostList = ({ isAuth = false, onEdit, collectionName }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getDocList(collectionName, setPostsList);
  }, []);

  const setPostsList = (postList) => {
    setPosts(postList);
  };

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
        {posts.map((post) => (
          <li key={post.id}>
            <Link href="/post/[id]" as={"/post/" + post.id}>
              <a>{post.title}</a>
            </Link>
            {isAuth && <DeleteButton postId={post.id} />}
            {isAuth && (
              <EditButton
                postData={{
                  orgTitle: post.title,
                  orgContent: post.content,
                  orgTags: post.tags,
                  orgId: post.id,
                  orgIsPublic: post.isPublic,
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
