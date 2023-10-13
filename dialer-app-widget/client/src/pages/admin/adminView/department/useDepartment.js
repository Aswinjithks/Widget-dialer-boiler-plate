import { useEffect, useState ,useCallback} from "react";
import * as Yup from "yup";
import AdminService from "../../../../services/admin.service";
import { useFormik } from "formik";

const useDepartment = (isEdit, modal) => {
  const [departmentList, setDepartmentList] = useState([]);
  const [agentList, setAgentList] = useState([]);

  const getDepartments = useCallback(() => {
    AdminService.getDepartments()
      .then((departmentList) => setDepartmentList(departmentList?.data))
      .catch((error) => setDepartmentList([]));
  }, []);

  const getAgent = useCallback(() => {
    AdminService.getAgents()
      .then((agentList) => setAgentList(agentList?.data?.result))
      .catch((error) => setAgentList([]));
  }, []);
  useEffect(() => {
    getDepartments();
    getAgent();
  }, [getDepartments, getAgent]);

  const initialValues = {
    department: isEdit ? modal?.name : "",
  };

  //validation state add
  const validationSchema = Yup.object({
    department: Yup.string().required("Department is required!"),
  });

  const deleteAgent = (agentId) => {
    alert(`close clicked ${agentId}`);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (isEdit) {
      await AdminService.editDepartments(values, modal.id);
    } else {
      await AdminService.addDepartments(values);
      resetForm();
    }
  };

  //handle form submission
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return { departmentList, formik, deleteAgent ,agentList};
};
export default useDepartment;
