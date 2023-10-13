import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

import service from "../../utils/service";
import API from "../../config/api";
import { AUTH } from "../../routes/routes";

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Please enter a valid phone number"),
});

const usePhone = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await service.post(API.GET_OTP, {
        name: location.state.name,
        phoneNumber: `+91${values.phone}`,
      });

      if (response.data?.statusCode === 200) {
        navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.OTP}`, {
          state: {
            phone: values.phone,
            name: location.state.name,
          },
        });
      }
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      // showToast(err?.message || "something went wrong");
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: LoginSchema,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (!location.state?.name) {
      navigate(`/${AUTH.BASE}/${AUTH.PAGES.WELCOME}`);
    }
  });
  return { formik };
};

export default usePhone;
