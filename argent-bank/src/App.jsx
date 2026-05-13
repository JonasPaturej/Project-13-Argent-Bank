import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./features/auth/authSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if(token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/profile" element={<Profile  />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;