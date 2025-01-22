// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const websiteService = {
  createWebsite: async (websiteData) => {
    try {
      const response = await api.post('/websites', websiteData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getWebsites: async () => {
    try {
      const response = await api.get('/websites');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getWebsiteById: async (id) => {
    try {
      const response = await api.get(`/websites/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateWebsite: async (id, websiteData) => {
    try {
      const response = await api.put(`/websites/${id}`, websiteData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteWebsite: async (id) => {
    try {
      const response = await api.delete(`/websites/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // New discount endpoint
  applyDiscount: async (id, discountData) => {
    try {
      const response = await api.put(`/websites/discount/${id}`, discountData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // New highlight media endpoint
  highlightMedia: async (id, highlightData) => {
    try {
      const response = await api.put(`/websites/highlight/${id}`, highlightData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getWebsitesNotApproved: async (userId) => {
    try {
      const response = await api.post('/websites/notApproved', { userId });
      return response.data;
    } catch (error) {
      console.error('Error:', error.response?.data || error);
      throw error.response?.data || error;
    }
},
  
  
  getWebsitesApproved: async (userId) => {
    try {
      const response = await api.post('/websites/approved', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};