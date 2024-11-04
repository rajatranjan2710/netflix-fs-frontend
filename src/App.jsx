import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import HomeScreen from "./components/HomeScreen";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/userAuthSore";
import WatchPage from "./components/WatchPage";
import SearchPage from "./components/SearchPage";
import SearchHistoryPage from "./components/SearchHistoryPage";

const App = () => {
  const { isAuthenticated, authCheck } = useAuthStore();
  useEffect(() => {
    authCheck();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/signup"
          element={isAuthenticated ? <HomeScreen /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <HomeScreen /> : <Login />}
        />
        <Route
          path="/watch/:id"
          element={isAuthenticated ? <WatchPage /> : <Login />}
        />
        <Route
          path="/search"
          element={isAuthenticated ? <SearchPage /> : <Login />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <SearchHistoryPage /> : <Login />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
