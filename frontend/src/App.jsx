import { Routes, Route } from "react-router-dom";
import Home from "./pages.Home";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <div className="bg-blue-600">Hello World!</div>
    </>
  );
}

export default App;
