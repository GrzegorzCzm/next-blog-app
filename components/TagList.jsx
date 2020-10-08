import { useState, useEffect } from "react";
import Link from "next/link";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteDoc } from "../utils/firestoreApi";
import fire from "../config/fire-config";
import AddTag from "./AddTag";

const TagList = ({ tags = [], onDelete, onAdd }) => {
  const DeleteButton = ({ tag }) => (
    <IconButton aria-label="delete" onClick={() => onDelete(tag)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href="/tag/[id]" as={"/tag/" + tag}>
              <a>{tag}</a>
            </Link>
            <DeleteButton tag={tag} />
          </li>
        ))}
      </ul>
      <AddTag onAdd={onAdd} />
      <hr />
    </div>
  );
};
export default TagList;
