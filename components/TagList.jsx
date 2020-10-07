import { useState, useEffect } from "react";
import Link from "next/link";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteDoc } from "../utils/firestoreApi";
import fire from "../config/fire-config";
import AddTag from "./AddTag";

const TagList = ({ isAuth = false, collectionName }) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    fire
      .firestore()
      .collection(collectionName)
      .onSnapshot((snap) => {
        const tagsDoc = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTags(tagsDoc);
      });
  }, []);

  const onDelete = async (id) => {
    deleteDoc(id, collectionName);
  };

  const DeleteButton = ({ tagId }) => (
    <IconButton aria-label="delete" onClick={() => onDelete(tagId)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href="/tag/[id]" as={"/tag/" + tag.id}>
              <a>{tag.title}</a>
            </Link>
            {isAuth && <DeleteButton tagId={tag.id} />}
          </li>
        ))}
      </ul>
      <AddTag collectionName="tags" />
    </div>
  );
};
export default TagList;
