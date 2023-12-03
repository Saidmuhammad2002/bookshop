import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";
import useTitle from "../../../hooks/useTitle";

import LoginForm from "./LoginForm";

const Login = () => {
  useTitle("User Login");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    await dispatch(setCredentials(values));
    setSubmitting(true);
    const { data, error } = await login(values);

    if (error) {
      setStatus({ success: false });
      setErrors({
        submit: error?.data?.message || "Something went wrong. Please try again.",
      });
    } else {
      dispatch(setCredentials(data?.data));
      navigate("/");
    }

    setSubmitting(false);
  };

  return <LoginForm onSubmit={onSubmit} />;
};
export default Login;
