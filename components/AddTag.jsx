import React, { useState } from "react";

const whiteSpaceRegex = / /g;

const AddTag = ({ onAdd }) => {
  const [tag, setTag] = useState("");
  const [isTagAddition, setTagAddition] = useState(false);

  const handleSubmit = () => {
    setTagAddition(false);
    onAdd(tag);
    setTag("");
  };

  return (
    <div>
      {isTagAddition ? (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={tag}
              onChange={({ target }) => setTag(target.value)}
            />
          </div>
          <button key="submit-add-tag" onClick={handleSubmit}>
            Save
          </button>
        </form>
      ) : (
        <button onClick={() => setTagAddition(true)}>Add</button>
      )}
    </div>
  );
};
export default AddTag;
