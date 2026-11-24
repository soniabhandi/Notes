import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./Pages/CreatePost";
import Feed from "./Pages/Feed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePost />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
