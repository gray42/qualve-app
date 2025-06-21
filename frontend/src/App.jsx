import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NavBar from "./components/nav/Navbar";
import PostProvider from "./context/PostContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProvider from "./context/UserContext";
import PostQuestion from "./pages/PostQuestion";
import ProtectedRoute from "./services/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

import MainLayout from "./components/layout/MainLayout";
import SimpleLayout from "./components/layout/SimpleLayout";

//need to wrap post provider outside with BrowserRouter?
function App() {
  return (
    <>
      <UserProvider>
        <PostProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              {/* <Route path="hot" element={<HotPostsPage />} />
              <Route path="trending" element={<TrendingPage />} /> */}
              <Route element={<ProtectedRoute />}>
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="/post" element={<PostQuestion />} />
              </Route>
            </Route>

            <Route element={<SimpleLayout />}>
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Add other minimal pages like Signup here */}
            </Route>
          </Routes>
        </PostProvider>
      </UserProvider>
    </>
  );
}

export default App;
