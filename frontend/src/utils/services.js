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

  getAllWebsites: async () => {
    try {
      const response = await api.get('/websites/get-all');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getRecentlyCreatedWebsites: async (limit = 5) => {
    try {
      const response = await api.get(`/websites/recently-created/${limit}`);
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

  applyDiscount: async (id, discountData) => {
    try {
      const response = await api.put(`/websites/discount/${id}`, discountData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

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

  viewWebsite: async (id, userId) => {
    try {
      const response = await api.post(`/websites/view/${id}`, { userId });
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

  getAllPromos: async () => {
    try {
      const response = await api.get('/promos/get-all');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getRecentlyCreatedPromos: async (limit = 5) => {
    try {
      const response = await api.get(`/promos/recently-created/${limit}`);
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
      const response = await api.put(`/profile/update/${id}`, profileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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

export const searchService = {
  searchWebsites: async ({
    searchQuery,
    minPrice,
    maxPrice,
    da,
    ascore,
    mediaType,
    category,
    country,
    gambling,
    cbd,
    adult,
    trading,
    googleNews,
    page = 1, // Default page number
    limit = 10, // Default limit per page
  }) => {
    try {
      const response = await api.get('/advertiser/search-websites', {
        params: {
          searchQuery,
          minPrice,
          maxPrice,
          da,
          ascore,
          mediaType,
          category,
          country,
          gambling,
          cbd,
          adult,
          trading,
          googleNews,
          page, // Added for pagination
          limit, // Added for pagination
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export const cartService = {
  getCarts: async (userId) => {
    try {
      const response = await api.post('/advertiser/carts/get-all', { userId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  createCart: async (userId, websiteId) => {
    try {
      const response = await api.post('/advertiser/carts', { userId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getCartById: async (userId, cartId) => {
    try {
      const response = await api.get(`/advertiser/carts/${cartId}`, { params: { userId } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateCart: async (userId, cartId, websiteId) => {
    try {
      const response = await api.put(`/advertiser/carts/${cartId}`, { userId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteCart: async (userId, cartId) => {
    try {
      const response = await api.delete(`/advertiser/carts/${cartId}`, { data: { userId } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const favouriteService = {
  getFavourites: async (userId) => {
    try {
      const response = await api.post('/advertiser/favourites/get-all', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createFavourite: async (userId, websiteId) => {
    try {
      const response = await api.post('/advertiser/favourites', { userId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getFavouriteById: async (favouriteId, userId) => {
    try {
      const response = await api.get(`/advertiser/favourites/${favouriteId}`, {
        data: { userId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateFavourite: async (favouriteId, userId, websiteId) => {
    try {
      const response = await api.put(`/advertiser/favourites/${favouriteId}`, {
        userId,
        websiteId
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteFavourite: async (favouriteId, userId) => {
    try {
      const response = await api.delete(`/advertiser/favourites/${favouriteId}`, {
        data: { userId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};


export const userService = {
  searchUsers: async (adminId, query) => {
    try {
      const response = await api.post('/admin/users/search', { adminId, query });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllUsers: async (adminId) => {
    try {
      const response = await api.post('/admin/users/all', { adminId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUsersByStatus: async (adminId, active) => {
    try {
      const response = await api.post('/admin/users/status', { adminId, active });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  changeUserStatus: async (adminId, userId, status) => {
    try {
      const response = await api.put('/admin/users/change-status', { adminId, userId, status });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteUser: async (adminId, userId) => {
    try {
      const response = await api.delete('/admin/users/delete', { data: { adminId, userId } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  sendEmailByAdmin: async (adminId, email, subject, message) => {
    try {
      const response = await api.post('/admin/users/send-email', { adminId, email, subject, message });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUsersByVerification: async (adminId, isVerified) => {
    try {
      const response = await api.post('/admin/users/verification', { adminId, isVerified });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};