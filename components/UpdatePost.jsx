import React, { useState, useEffect } from "react";

import fire from "../config/fire-config";

const whiteSpaceRegex = / /g;

const CreatePost = ({ currentPost = {}, onPostSaved }) => {
  const { orgTitle, orgContent, orgId } = currentPost;
  useEffect(() => {
    if (currentPost.orgId) {
      setContent(orgContent);
      setTitle(orgTitle);
    }
  }, [orgTitle, orgContent, orgId]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");

  const clearState = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (orgId) {
      try {
        const postRef = await fire.firestore().collection("blog").doc(orgId);
        await postRef.update({
          title,
          content,
        });
        clearState();
        setNotification("Blogpost updated");
        onPostSaved();
      } catch (err) {
        console.error("ERROR ON UPDATE", JSON.stringify(err));
        setNotification("ERROR ON UPDATE: ", JSON.stringify(err));
      }
    } else {
      const urlPath = title.replace(whiteSpaceRegex, "-").toLowerCase();
      try {
        const postRef = await fire.firestore().collection("blog").doc(urlPath);
        const docContent = await postRef.get();
        if (docContent.exists) {
          setNotification("Post already exists");
        } else {
          await fire.firestore().collection("blog").doc(urlPath).set({
            urlPath,
            title,
            content,
          });
          clearState();
          setNotification("Post created");
          onPostSaved();
        }
      } catch (err) {
        console.log("ERROR ON CREATE", JSON.stringify(err));
        setNotification("ERROR ON CREATE: ", JSON.stringify(err));
      }
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default CreatePost;
