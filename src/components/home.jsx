import { useAuth } from "../context/AuthContext";
import GetLatestPost from "./getLatestPosts";

function Home() {
  return (
    <>
      <div className="hero">
        <h1>Just another random blog for TOP</h1>
      </div>
      <div className="dashboard">
        <GetLatestPost />
      </div>
    </>
  );
}

export default Home;
