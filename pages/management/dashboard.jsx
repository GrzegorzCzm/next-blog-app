import Head from "next/head";
import { useRouter } from "next/router";

import CreatePost from "../../components/CreatePost";
import PostList from "../../components/PostList";

import { useState } from "react";
import fire from "../../config/fire-config";

const Dashboard = () => {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      typeof window !== "undefined" && router.push("/");
    }
  });

  if (loggedIn) {
    return (
      <div>
        <Head>
          <title>Blog App</title>
        </Head>
        <h1>Dashboard</h1>
        <CreatePost />
        <PostList isAuth={loggedIn} />
      </div>
    );
  } else {
    return <div>Not authorize</div>;
  }
};
export default Dashboard;
