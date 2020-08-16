import Head from "next/head";
import PostList from "../components/PostList";

import { useState } from "react";
import fire from "../config/fire-config";
import Link from "next/link";

const Home = () => {
  const [notification, setNotification] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        setNotification("Logged out");
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
  };
  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      {notification}
      {!loggedIn ? (
        <div>
          |
          <Link href="/users/login">
            <a> Login</a>
          </Link>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <PostList />
      {loggedIn && (
        <Link href="/management/dashboard">
          <a> Admin</a>
        </Link>
      )}
    </div>
  );
};
export default Home;
