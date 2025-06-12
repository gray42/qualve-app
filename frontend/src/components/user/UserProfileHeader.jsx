const UserProfileHeader = ({ user }) => (
  <div className="mb-4 border-b pb-4">
    <h2 className="text-2xl font-bold">{user.name}</h2>
    <p className="text-gray-500">@{user.username}</p>
    <p>{user.bio}</p>
  </div>
);

export default UserProfileHeader;
