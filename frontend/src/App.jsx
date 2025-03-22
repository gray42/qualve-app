import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NavBar from "./components/nav/Navbar";
import PostProvider from "./context/PostContext";


//need to wrap post provider outside with BrowserRouter?
function App() {
  return (
    <>
      <BrowserRouter>
        <PostProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<PostPage />} />
          </Routes>
        </PostProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
