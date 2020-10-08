import fire from "../../config/fire-config";
import Link from "next/link";
const Tag = (props) => {
  return (
    <div>
      <h2>Tag page</h2>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
};

// export const getServerSideProps = async ({ query }) => {
//   const content = {};
//   await fire
//     .firestore()
//     .collection("post")
//     .doc(query.id)
//     .get()
//     .then((result) => {
//       content["title"] = result.data().title;
//       content["content"] = result.data().content;
//     });
//   return {
//     props: {
//       title: content.title,
//       content: content.content,
//     },
//   };
// };
export default Tag;
