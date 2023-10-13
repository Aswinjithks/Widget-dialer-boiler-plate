import { useFormik } from "formik";
import { useEffect, useState,useCallback } from "react";
import * as Yup from "yup";
import AdminService from "../../../../services/admin.service";
import { toast } from "react-toastify";
import Peer from "peerjs";

const useAgent = (isEdit, modal) => {
  const [agentList, setAgentList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  const getAgent = useCallback(() => {
    AdminService.getAgents()
      .then((agentList) => setAgentList(agentList?.data?.result))
      .catch((error) => setAgentList([]));
  }, []);

  // const getAgent = () => {
  //   AdminService.getAgents()
  //     .then((agentList) => setAgentList(agentList?.data))
  //     .catch((error) => setAgentList(agentList));
  // };

  //for  list of agents
  useEffect(() => {
    getAgent();
  }, [getAgent]);

  //initial state for add agents
  const initialValues = {
    department: isEdit ? modal?.department : "",
    username: isEdit ? modal?.username : "",
    password: "",
    confirmPassword: "",
  };

  //validation state add
  const agentValidationSchema = Yup.object({
    username: Yup.string().required("Username is required!"),
    password: Yup.string()
      .min(4, "Password must be atleast 4 characters long")
      .required("Password is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password not match!")
      .required("Confirm Password is required!"),
    department: Yup.string().required("Department is required!"),
  });
  //validation schema for edit
  const agentValidationSchemaEdit = Yup.object({
    username: Yup.string().required("Username is required!"),
    password: Yup.string()
      .min(4, "Password must be atleast 4 characters long")
      .required("Password is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password not match!")
      .required("Confirm Password is required!"),
    department: Yup.string().required("Department is required!"),
  });

  const validationSchema = isEdit
    ? agentValidationSchemaEdit
    : agentValidationSchema;

  // Call department list API
  useEffect(() => {
    AdminService.getDepartments()
      .then((response) => {
        setDepartmentList(response.data);
      })
      .catch((error) => setDepartmentList([]));

    return () => {
      setDepartmentList([]);
    };
  }, []);

  //handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    // e.preventDefault();
    let msg = "";
    const payload = {
      department: values.department,
      username: values.username,
      password: values.password,
    };

    if (isEdit) {
      const newAgent = await AdminService.editAgent(payload, modal?.id);
      msg = newAgent?.stack?.split(`\n`)[0];
      if (newAgent?.statusCode === 200) {
        msg = newAgent?.message;
        resetForm();
      }
    } else {
      const peer = new Peer();
      const peerId = await new Promise((resolve) => {
        peer.on("open", (id) => resolve(id));
      });
      payload.peerId = peerId
      const newAgent = await AdminService.createAgent(payload);
      msg = newAgent?.stack?.split(`\n`)[0];
      if (newAgent?.statusCode === 200) {
        msg = newAgent?.message;
        resetForm();
      }
    }

    toast(`${msg}`, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //handle form submission
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return { agentList, departmentList, formik };
};

export default useAgent;
