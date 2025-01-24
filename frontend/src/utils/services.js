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
  },

  
 
};

export const promoService = {
  createPromo: async (promoData) => {
    try {
      const response = await api.post('/promos', promoData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  
 getPromos: async (userId) => {
    try {
      const response = await api.post('/promos/getPromos', { userId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getPromoById: async (id) => {
    try {
      const response = await api.get(`/promos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updatePromo: async (id, promoData) => {
    try {
      const response = await api.put(`/promos/${id}`, promoData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deletePromo: async (id) => {
    try {
      const response = await api.delete(`/promos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },


};

export const profileService = {
  createProfile: async (profileData) => {
    try {
      const response = await api.post('/profile/create', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getProfile: async (userId) => {
    try {
      const response = await api.post('/profile/get', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (id, profileData) => {
    try {
      const response = await api.put(`/profile/update/${id}`, profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteProfile: async (id) => {
    try {
      const response = await api.delete(`/profile/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export const invoiceAccountService = {
  createInvoiceAccount: async (invoiceAccountData) => {
    try {
      const response = await api.post('/invoice-account/create', invoiceAccountData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getInvoiceAccounts: async (userId) => {
    try {
      const response = await api.post('/invoice-account/get-all', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getInvoiceAccountById: async (id) => {
    try {
      const response = await api.get(`/invoice-account/get/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateInvoiceAccount: async (id, invoiceAccountData) => {
    try {
      const response = await api.put(`/invoice-account/update/${id}`, invoiceAccountData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteInvoiceAccount: async (id) => {
    try {
      const response = await api.delete(`/invoice-account/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export const emailChangeService = {
  requestEmailChange: async (userId, newEmail) => {
    try {
      const response = await api.post('/email-change/request-email-change', { userId, newEmail });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  verifyEmailChange: async (userId, verificationToken, newEmail) => {
    try {
      const response = await api.post('/email-change/verify-email-change', { 
        userId, 
        verificationToken, 
        newEmail 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};