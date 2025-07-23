import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/api";
import { usePosts } from "../context/PostContext";
import UserProfileHeader from "../components/user/UserProfileHeader";
import Tabs from "../components/user/Tabs";
import UserPostsTab from "../components/user/UserPostsTab";
import AboutTab from "../components/user/AboutTab";
import EditProfileModal from "../components/user/EditProfileModal";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [editing, setEditing] = useState(false); // lifted editing state up to include edit button in profile header

  const { userPosts, fetchPostsByUserId } = usePosts();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUserById(userId);
      setUser(fetchedUser);
      await fetchPostsByUserId(userId);
    };

    fetchData();
  }, [userId, fetchPostsByUserId]);

  const handleProfileUpdate = (updatedUser) => {
    // function to update user profile upon edit
    setUser(updatedUser);
    setEditing(false);
    toast.success("Profile updated!");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <UserProfileHeader user={user} onEdit={() => setEditing(true)} />
      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={["posts", "about"]}
      />
      {activeTab === "posts" && <UserPostsTab posts={userPosts} />}
      {activeTab === "about" && (
        <AboutTab
          user={user}
          onUpdate={handleProfileUpdate}
          onEdit={() => setEditing(true)}
        />
      )}
      {editing && ( // if editing is true, then display the editing modal
        <EditProfileModal
          user={user}
          onClose={() => setEditing(false)}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default ProfilePage;
