import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useSignUpMutation } from "../authApiSlice";
import useTitle from "../../../hooks/useTitle";

import SignUpForm from "./SignUpForm";

const SignUp = () => {
  useTitle("User Login");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUp] = useSignUpMutation();

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    setSubmitting(true);
    const { data, error } = await signUp(values);

    if (error) {
      setStatus({ success: false });
      setErrors({
        submit: error.data.message || "Something went wrong. Please try again.",
      });
    } else {
      dispatch(setCredentials({ key: data.key, sign: data.sign }));
      navigate("/");
    }

    setSubmitting(false);
  };

  return <SignUpForm onSubmit={onSubmit} />;
};
export default SignUp;
