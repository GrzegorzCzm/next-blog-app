import React, { useState } from "react";
import fire from "../config/fire-config";

const whiteSpaceRegex = / /g;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");
  const handleSubmit = (event) => {
    const postId = title.replace(whiteSpaceRegex, "-").toLowerCase();
    event.preventDefault();

    const usersRef = fire.firestore().collection("blog").doc(postId);

    usersRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        usersRef.onSnapshot((doc) => {
          setNotification("Post with given name already exists");
        });
      } else {
        usersRef
          .set({
            title: title,
            content: content,
          })
          .then(() => {
            setTitle("");
            setContent("");
            setNotification("Blogpost created");
            setTimeout(() => {
              setNotification("");
            }, 2000);
          })
          .catch((error) => {
            console.warn(e);
            setNotification("Unable to crete new post");
          });
      }
    });
  };

  return (
    <div>
      <h2>Add Blog</h2>
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
