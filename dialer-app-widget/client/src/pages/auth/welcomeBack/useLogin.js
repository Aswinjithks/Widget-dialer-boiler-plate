import { useFormik } from "formik";
import { useParams } from "react-router";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store/hooks";
import { adminLogin } from "../../../store/slices/user";

const useLogin = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const agentValidationSchema = Yup.object({
    username: Yup.string().required("Password is required.!"),
    password: Yup.string().required("Password is required.!"),
  });

  const adminValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("E-mail is required.!"),
    password: Yup.string().required("Password is required.!"),
  });

  const validationSchema = username ? agentValidationSchema : adminValidationSchema;

  const onSubmit = (values) => {
    const data = {
      ...values,
      adminUsername: username,
    };
    dispatch(adminLogin(data));
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return { formik, username };
};

export default useLogin;
