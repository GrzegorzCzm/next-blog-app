import { useState, useEffect } from "react";
import Link from "next/link";

import { getTagsSet } from "../utils/firestoreApi";

const TagMap = () => {
  const [tagsMap, setTagsMap] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const postTag = await getTagsSet("post");
      const postDraftTag = await getTagsSet("post-draft");
      const mergedSets = new Set([...postDraftTag, ...postTag]);
      setTagsMap(Array.from(mergedSets));
    };

    getData();
  }, []);

  return (
    <div>
      <ul>
        {tagsMap.map((tag) => (
          <li key={tag}>
            <Link href="/tag/[id]" as={"/tag/" + tag}>
              <a>{tag}</a>
            </Link>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};
export default TagMap;
