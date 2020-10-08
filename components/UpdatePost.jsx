import React, { useState, useEffect } from "react";

import { deleteDoc, getRef, setDoc } from "../utils/firestoreApi";
import TagList from "./TagList";

const whiteSpaceRegex = / /g;

const UpdatePost = ({ currentPost = {}, onPostSaved }) => {
  const { orgTitle, orgContent, orgTags, orgId, orgIsPublic } = currentPost;
  useEffect(() => {
    if (currentPost.orgId) {
      setContent(orgContent);
      setTitle(orgTitle);
      setTags(orgTags ? orgTags : []);
      setPublic(orgIsPublic);
    }
  }, [orgTitle, orgContent, orgId, orgTags]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [notification, setNotification] = useState("");
  const [isPublic, setPublic] = useState(false);

  const clearState = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setPublic(false);
  };

  const addNewPost = async (post, collectionName) => {
    try {
      const postRef = await getRef(post.urlPath, collectionName);

      const docContent = await postRef.get();
      if (docContent.exists) {
        setNotification("Post already exists");
      } else {
        await setDoc({ collectionName, docKey: post.urlPath, content: post });
        clearState();
        setNotification("Post created");
        onPostSaved();
      }
    } catch (err) {
      console.error("ERROR ON CREATE", JSON.stringify(err));
      setNotification("ERROR ON CREATE: ", JSON.stringify(err));
    }
  };

  const updatePost = async (post, collectionName) => {
    const isSameCollection = isPublic === orgIsPublic;
    if (isSameCollection) {
      try {
        const postRef = await getRef(orgId, collectionName);
        await postRef.update(post);
        clearState();
        setNotification("Blogpost updated");
        onPostSaved();
      } catch (err) {
        console.error("ERROR ON UPDATE", JSON.stringify(err));
        setNotification("ERROR ON UPDATE: ", JSON.stringify(err));
      }
    } else {
      deleteDoc(orgId, orgIsPublic ? "post" : "post-draft");
      addNewPost({ ...post, urlPath: orgId }, collectionName);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const collectionName = isPublic ? "post" : "post-draft";
    if (orgId) {
      updatePost(
        {
          title,
          content,
          tags,
          isPublic,
        },
        collectionName
      );
    } else {
      const urlPath = title.replace(whiteSpaceRegex, "-").toLowerCase();
      addNewPost(
        {
          urlPath,
          title,
          content,
          tags,
          isPublic,
        },
        collectionName
      );
    }
  };

  return (
    <div>
      <h2>Add post</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <br />
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Content
          <br />
          <textarea
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <div>
          <hr />
          <h2>Tags</h2>
          <TagList
            tags={tags}
            onAdd={(tag) => {
              setTags([...tags, tag]);
            }}
            onDelete={(tag) => setTags(tags.filter((t) => t !== tag))}
          />
        </div>
        <div>
          <input
            id="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={() => setPublic(!isPublic)}
          />
          <label for="isPublic">Is public</label>
        </div>
        <button key="submit-update-post" type="submit">
          Save Post
        </button>
      </form>
    </div>
  );
};
export default UpdatePost;
