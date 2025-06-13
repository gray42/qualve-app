import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/api";
import { getPostsByUserId } from "../services/api";
import UserProfileHeader from "../components/user/UserProfileHeader";
import Tabs from "../components/user/Tabs";
import UserPostsTab from "../components/user/UserPostsTab";
import AboutTab from "../components/user/AboutTab";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUserById(userId);
      const fetchedPosts = await getPostsByUserId(userId);
      setUser(fetchedUser);
      setPosts(fetchedPosts);
    };

    fetchData();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <UserProfileHeader user={user} />
      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={["posts", "about"]}
      />
      {activeTab === "posts" && <UserPostsTab posts={posts} />}
      {activeTab === "about" && (
        <AboutTab
          user={user}
          onUpdate={(updatedUser) => setUser(updatedUser)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
