import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/api";
import { usePosts } from "../context/PostContext";
import UserProfileHeader from "../components/user/UserProfileHeader";
import Tabs from "../components/user/Tabs";
import UserPostsTab from "../components/user/UserPostsTab";
import AboutTab from "../components/user/AboutTab";

export default function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  const { userPosts, fetchPostsByUserId } = usePosts();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUserById(userId);
      setUser(fetchedUser);
      await fetchPostsByUserId(userId);
    };

    fetchData();
  }, [userId, fetchPostsByUserId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <UserProfileHeader user={user} />
      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={["posts", "about"]}
      />
      {activeTab === "posts" && <UserPostsTab posts={userPosts} />}
      {activeTab === "about" && <AboutTab user={user} />}
    </div>
  );
}
