import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostQuestion from "./pages/PostQuestion";
import ProtectedRoute from "./services/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import UserPosts from "./pages/UserPosts";
import HotPostsPage from "./pages/HotPostsPage";
import TagPostsPage from "./pages/TagPostsPage";
import TagPage from "./pages/TagPage";
import NotificationPage from "./pages/NotificationPage";
import UserPage from "./pages/UserPage";
import UserProfilePage from "./pages/UserProfilePage";

import MainLayout from "./components/layout/MainLayout";
import SimpleLayout from "./components/layout/SimpleLayout";

import TagProvider from "./context/TagContext";
import UserProvider from "./context/UserContext";
import PostProvider from "./context/PostContext";
import NotificationProvider from "./context/NotificationContext";

//need to wrap post provider outside with BrowserRouter?
function App() {
  return (
    <>
      <UserProvider>
        <NotificationProvider>
          <PostProvider>
            <TagProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/posts/:postId" element={<PostPage />} />
                  <Route path="/hot" element={<HotPostsPage />} />
                  <Route path="/tags/:tag" element={<TagPostsPage />} />
                  {/* <Route path="/trending-tags" element={<TrendingPage />} /> */}

                  <Route
                    path="/user/:userId/questions"
                    element={<UserPosts />}
                  />
                  <Route
                    path="/:userId/public-profile"
                    element={<UserProfilePage />}
                  />

                  <Route path="/post/:postId" element={<PostPage />} />
                  <Route path="/tags" element={<TagPage />} />
                  <Route path="/users" element={<UserPage />} />
                  <Route path="/notifications" element={<NotificationPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/post" element={<PostQuestion />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                  </Route>
                </Route>

                <Route element={<SimpleLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* Add other minimal pages like Signup here */}
                </Route>
              </Routes>
            </TagProvider>
          </PostProvider>
        </NotificationProvider>
      </UserProvider>
    </>
  );
}

export default App;
