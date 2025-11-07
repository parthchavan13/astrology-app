import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pandits from "./pages/Pandits";
import AstrologerProfile from "./pages/AstrologerProfile";
import ChatPage from "./pages/ChatPage";
import BookSession from "./pages/BookSession";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pandits" element={<Pandits />} />
        <Route path="/astrologer/:id" element={<AstrologerProfile />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/book/:id" element={<BookSession />} />
      </Routes>
    </Router>
  );
}

export default App;
