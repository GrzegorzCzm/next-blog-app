import fire from "../../config/fire-config";
import Link from "next/link";
const Post = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <ul>
        {props.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
};
export const getServerSideProps = async ({ query }) => {
  const content = {};
  await fire
    .firestore()
    .collection("post")
    .doc(query.id)
    .get()
    .then((result) => {
      content.title = result.data().title;
      content.content = result.data().content;
      content.tags = result.data().tags;
    });
  return {
    props: {
      title: content.title,
      content: content.content,
      tags: content.tags || [],
    },
  };
};
export default Post;
