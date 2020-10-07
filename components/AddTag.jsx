import React, { useState } from "react";

import { getRef, setDoc } from "../utils/firestoreApi";

const whiteSpaceRegex = / /g;

const AddTag = ({ collectionName }) => {
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("");
  const [isTagAddition, setTagAddition] = useState("");

  const addTag = async (urlPath, tag, collectionName) => {
    try {
      const postRef = await getRef(urlPath, collectionName);

      const docContent = await postRef.get();
      if (docContent.exists) {
        setNotification("Post already exists");
      } else {
        await setDoc({ collectionName, docKey: urlPath, content: tag });
        setTitle("");
        setNotification("Tag created");
      }
    } catch (err) {
      console.error("ERROR ON CREATE", JSON.stringify(err));
      setNotification("ERROR ON CREATE: ", JSON.stringify(err));
    } finally {
      setTagAddition(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const urlPath = title.replace(whiteSpaceRegex, "-").toLowerCase();
    addTag(urlPath, { title }, collectionName);
  };

  return (
    <div>
      {notification}

      {isTagAddition ? (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <button onClick={() => setTagAddition(true)}>Add</button>
      )}
    </div>
  );
};
export default AddTag;
