import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningIn: false,
  isLoggigIn: false,
  isAuthenticated: false,
  initialValueAuthPage: "you@gmail.com",
  signup: async (credentials, navigate) => {
    set({ isSigningIn: true });
    let response;
    try {
      response = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        credentials,
        { withCredentials: true }
      );
      set({ user: response.data.user, isSigningIn: false });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      set({ user: null, isSigningIn: false });
      // Handle different types of errors
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      console.error("Error:", errorMessage);
      toast.error(errorMessage);
    }
  },
  login: async (credentials, navigate) => {
    // login logic
    set({ isLoggigIn: true });
    let response;
    try {
      response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        credentials,
        { withCredentials: true }
      );
      set({ user: response.data.user, isSigningIn: false });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      set({ user: null, isLoggigIn: false });
      // Handle different types of errors
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      console.error("Error:", errorMessage);
      toast.error(errorMessage);
    }
  },
  authCheck: async () => {
    console.log("check in authCheck");
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/auth/authcheck",
        { withCredentials: true }
      );
      console.log(response.data);
      set({ isAuthenticated: true });
    } catch (error) {
      console.log("Not authenticated");
      set({ isAuthenticated: false });
    }
  },
  logout: async (navigate) => {
    try {
      console.warn("check");
      const res = await axios.get("http://localhost:5000/api/v1/auth/logout", {
        withCredentials: true,
      });
      set({ user: null, isAuthenticated: false });

      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      // Handle different types of errors
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      console.error("Error:", errorMessage);
      toast.error(errorMessage);
    }
  },
  setInitialValue: (value, navigate) => {
    set({ initialValueAuthPage: value });
    navigate("/signup");
  },
}));
