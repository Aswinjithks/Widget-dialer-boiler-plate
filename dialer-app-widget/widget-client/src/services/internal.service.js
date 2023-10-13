import service from "../utils/service";
import API from "../config/api";

const internalService = {
  getDepartmentsById: async () => {
    try {
      const id = localStorage.getItem("account_id");
      const response = await service.get(
        `${API.CUSTOMER_VIEW_DEPARTMENTS}/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(" error is ", error);
      return error;
    }
  },

  getAgents: async (dept_name) => {
    try {
      const id = localStorage.getItem("account_id");
      const response = await service.get(
        `${API.CUSTOMER_GET_AGENTS}/${id}?dept_name=${dept_name}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(" error is ", error);
      return error;
    }
  },
};
export default internalService;
