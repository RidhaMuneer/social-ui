import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// layouts
import StandardLayout from "@/layouts/StandardLayout";

// pages
import Registration from "@/pages/Registration";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import CreatePost from "@/pages/CreatePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StandardLayout />} >
          <Route path="/home" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/post" element={<CreatePost/>}/>
        </Route>
        <Route path="/auth/register" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
