import API, { privateEndpoints } from "../config/api";
import service from "../utils/service";

const AdminService = {
  // api call to get all departments
  getDepartments: async () => {
    try {
      const response = await service.get(API.DEPARTMENT);

      return response.data;
    } catch (error) {
      return error;
    }
  },

  editDepartments: async (values, id) => {
    try {
      const response = await service.patch(`${API.DEPARTMENT}/${id}`, values);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  addDepartments: async (values) => {
    try {
      const response = await service.post(API.DEPARTMENT, values);

      return response.data;
    } catch (error) {
      return error;
    }
  },

  createAgent: async (values) => {
    try {
      const response = await service.post(API.AGENT, values);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  editAgent: async (values, id) => {
    try {
      const response = await service.patch(`${API.AGENT}/${id}`, values);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  deleteAgent: async (id) => {
    try {
      const response = await service.delete(`${API.AGENT}/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getAgents: async () => {
    try {
      const response = await service.get(API.AGENT);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  createTicket: async (params = {}) => {
    try {
      const response = await service.post(API.TICKET, params);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  saveCallDetails: async (params = {}) => {
    try {
      const response = await service.post(API.CALL_DETAILS, params);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  updateCallDetails: async (params = {}, id) => {
    try {
      const response = await service.patch(`${API.CALL_DETAILS}/${id}`, params);
      return response?.data?.id;
    } catch (error) {
      return error;
    }
  },
  getCallDetails: async (params = {}) => {
    try {
      const response = await service.get(`${API.CALL_DETAILS}?page=${params.currentPage}&perpage=${params.selectedValue}`, params);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default AdminService;
