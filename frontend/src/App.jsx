import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NavBar from "./components/nav/Navbar";
import PostProvider from "./context/PostContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

//need to wrap post provider outside with BrowserRouter?
function App() {
  return (
    <>
      <PostProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </PostProvider>
    </>
  );
}

export default App;
