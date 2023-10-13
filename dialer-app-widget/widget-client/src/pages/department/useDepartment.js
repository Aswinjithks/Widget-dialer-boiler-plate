import React, { useEffect } from "react";
import service from "../../utils/service";
import API from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
import internalService from "../../services/internal.service";

const useDepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [departments, setDepartments] = React.useState(null);
  const [department, setDepartment] = React.useState(null);
  const [agents, setAgents] = React.useState(null);
  const [agentPeerId, setAgentPeerId] = React.useState(null);
  const [agentName, setAgentName] = React.useState(null);

  const fetchDepartments = async () => {
    try {
      const response = await internalService.getDepartmentsById();
      setDepartments(response);
      return response;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchDepartments().then((response) => {
      setDepartment(response?.data?.data?.department[0]?.name);
    });
  }, []);

  const departmentHandler = async () => {
    try {
      const response = await internalService.getAgents(department);
      if (response.data?.statusCode === 200) {
        const tmpAgent = response?.data?.data?.result;
        // if (tmpAgent && tmpAgent.length > 0) {
        const { state } = location;
        localStorage.setItem("agentPeerId", tmpAgent?.[0]?.peerId);
        navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.CALL}`, {
          state: {
            department: department,
            phone: state.phone,
            peerId: state.peerId,
            name: state.name,
            agentPeerId: tmpAgent?.[0]?.peerId,
            agentName: tmpAgent?.[0]?.username,
          },
        });
        // }
      } else {
        setError(response.data?.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!location.state?.peerId) {
      navigate(`/${AUTH.BASE}/${AUTH.PAGES.WELCOME}`);
    }
  }, [location.state?.peerId]); // Only navigate on changes to location.state.peerId.

  return {
    department,
    setDepartment,
    departments,
    setDepartments,
    departmentHandler,
    error,
    agentPeerId,
    agentName,
  };
};

export default useDepartment;
