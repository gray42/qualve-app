import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/api";
import { usePosts } from "../context/PostContext";
import UserProfileHeader from "../components/user/UserProfileHeader";
import UserPostsTab from "../components/user/UserPostsTab";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

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
      <h1 className="text-3xl">{user.name}'s Questions</h1>
      <UserPostsTab posts={userPosts} />
    </div>
  );
};

export default ProfilePage;
