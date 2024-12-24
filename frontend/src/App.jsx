import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NavBar from "./components/nav/Navbar";
import PostProvider from "./context/PostContext";

function App() {
  return (
    <>
      <PostProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </PostProvider>
    </>
  );
}

export default App;
