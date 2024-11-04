import React, { useEffect } from "react";
import Home from "../components/HomePage/Home";
import AuthPage from "../components/HomePage/AuthPage";
import { useAuthStore } from "../store/userAuthSore";

// const user = false;

const HomeScreen = () => {
  const { isAuthenticated, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, []);

  return <div>{isAuthenticated ? <Home /> : <AuthPage />}</div>;
};

export default HomeScreen;
