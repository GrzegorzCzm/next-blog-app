import Head from "next/head";
import CreatePost from "../../components/CreatePost";

import { useState } from "react";
import fire from "../../config/fire-config";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Dashboard</h1>
      {loggedIn && <CreatePost />}
    </div>
  );
};
export default Dashboard;
