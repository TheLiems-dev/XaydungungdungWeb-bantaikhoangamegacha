import axios from 'axios';

// Mặc định NestJS chạy ở port 3000. Cần đảm bảo file account.controller.ts đang map với route 'account' hoặc 'accounts'
const API_URL = 'http://localhost:3000/accounts'; 

export const accountApi = {
  // Lấy danh sách tài khoản
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  // Lấy chi tiết 1 tài khoản
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Tạo tài khoản mới (Khớp với create-account.dto.ts)
  create: async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  // Xóa tài khoản
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};