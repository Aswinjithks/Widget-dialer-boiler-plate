import {useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AUTH } from '../../../routes/routes';


const useSignUp = () => {
    const navigate = useNavigate()
    const initialValues = {
        name: '',
        email: '',
       
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required.!'),
        email: Yup.string().email("Invalid email").required('E-mail is required.!'),
    })

    const onSubmit = values => {
        navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.OTP}`)       
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return {formik}
};


export default useSignUp