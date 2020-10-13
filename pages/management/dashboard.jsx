import Head from "next/head";
import { useRouter } from "next/router";

import UpdatePost from "../../components/UpdatePost";
import PostList from "../../components/PostList";
import TagMap from "../../components/TagMap";

import { useState } from "react";
import fire from "../../config/fire-config";

const Dashboard = () => {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      typeof window !== "undefined" && router.push("/");
    }
  });

  const onEditPost = (postData) => setCurrentPost(postData);
  const onPostSaved = () => setCurrentPost({});

  if (loggedIn) {
    return (
      <div>
        <Head>
          <title>Blog App</title>
        </Head>
        <h1>Dashboard</h1>
        <UpdatePost currentPost={currentPost} onPostSaved={onPostSaved} />

        <h2>Public</h2>
        <PostList isAuth={loggedIn} onEdit={onEditPost} collectionName="post" />
        <h2>Draft</h2>
        <PostList
          isAuth={loggedIn}
          onEdit={onEditPost}
          collectionName="post-draft"
        />
        <hr />
        <h2>Tag map</h2>
        <TagMap />
      </div>
    );
  } else {
    return <div>Not authorize</div>;
  }
};
export default Dashboard;
