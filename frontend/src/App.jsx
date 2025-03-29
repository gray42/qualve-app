import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NavBar from "./components/nav/Navbar";
import PostProvider from "./context/PostContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProvider from "./context/UserContext";
import PostQuestion from "./pages/PostQuestion";

//need to wrap post provider outside with BrowserRouter?
function App() {
  return (
    <>
      <UserProvider>
        <PostProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post" element={<PostQuestion />} />
          </Routes>
        </PostProvider>
      </UserProvider>
    </>
  );
}

export default App;
