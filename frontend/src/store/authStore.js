import { create } from "zustand";
import axios from "axios";
import { profileService } from "../utils/services";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: "User created successfully. Please verify your email."
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Sign up failed";
      if (error.response) {
        switch (error.response.data.msg) {
          case "Please enter all fields":
            errorMessage = "Please fill in all required fields";
            break;
          case "User already exists with this email":
            errorMessage = "An account with this email already exists";
            break;
          default:
            errorMessage = error.response.data.msg || "Sign up failed";
        }
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
        isLoading: false,
        message: "Login successful"
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Login failed";
      if (error.response) {
        switch (error.response.data.msg) {
          case "Please enter all fields":
            errorMessage = "Please provide both email and password";
            break;
          case "Invalid email or password":
            errorMessage = "Incorrect email or password";
            break;
          case "Please verify your email to login":
            errorMessage = "Please verify your email before logging in";
            break;
          default:
            errorMessage = error.response.data.msg || "Login failed";
        }
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const profileData = await profileService.getProfile(response.data.user._id);
      
      set({
        user: {
          ...response.data.user,
          profileImage: profileData.avatar || null
        },
        isAuthenticated: true,
        error: null,
        isLoading: false,
        message: "Login successful"
      });
      return response.data;
    } catch (error) {
      // ... existing error handling
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: "Email verified successfully"
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Email verification failed";
      if (error.response) {
        switch (error.response.data.msg) {
          case "Invalid verification code":
            errorMessage = "The verification code is invalid or has expired";
            break;
          default:
            errorMessage = error.response.data.msg || "Email verification failed";
        }
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      const userId = response.data.user._id;
      
      // Fetch profile separately
      const profileData = await profileService.getProfile(userId);
      
      set({
        user: {
          ...response.data.user,
          profileImage: profileData.avatar || null // Use avatar from profile
        },
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },


  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({
        isLoading: false,
        message: "Password reset email sent successfully",
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to send password reset email";
      if (error.response) {
        switch (error.response.data.msg) {
          case "User not found":
            errorMessage = "No account found with this email address";
            break;
          default:
            errorMessage = error.response.data.msg || "Failed to send password reset email";
        }
      }
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ 
        message: "Password reset successfully", 
        isLoading: false 
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to reset password";
      if (error.response) {
        switch (error.response.data.msg) {
          case "Invalid or expired reset token":
            errorMessage = "The password reset link is invalid or has expired";
            break;
          default:
            errorMessage = error.response.data.msg || "Failed to reset password";
        }
      }
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  setUserProfileImage: (profileImage) => {
    set(state => ({
      user: {
        ...state.user,
        profileImage
      }
    }));
  },
  

}));