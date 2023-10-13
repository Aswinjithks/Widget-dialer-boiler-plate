import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AUTH } from "../../../routes/routes";

const useOtp = () => {
    // const navigate = useNavigate();
    const initialValues = {
        otp: "",
    };
    const validationSchema = Yup.object({
        otp: Yup.string().required("Otp is required.!"),
    });

    const onSubmit = (values) => {
        // navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.OTP}`);
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return { formik };
};

export default useOtp;
