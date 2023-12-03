import { Link } from "react-router-dom";
import { Box, Card, OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";
import { Formik } from "formik";
import googleIcon from "../../../assets/google.svg";
import facebookIcon from "../../../assets/facebook.svg";
import * as Yup from "yup";
import { Grid, Stack, Button, InputLabel, FormHelperText, Typography, Divider } from "@mui/material";

const SignUpForm = ({ onSubmit }) => {
  const initialValues = {
    email: "",
    name: "",
    key: "",
    secret: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    name: Yup.string().max(255).required("Name is required"),
    key: Yup.string().max(255).required("Key is required"),
    secret: Yup.string().max(255).required("Secret is required"),
  });

  const content = (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
      <Card sx={{ width: 430, padding: "28px" }}>
        <header>
          <Typography fontSize={"36px"} align="center" fontWeight={"700"} mb={"36px"}>
            Sign in
          </Typography>
          {socialButton(googleIcon, "Continue with Google")}
          {socialButton(facebookIcon, "Continue with Facebook")}
        </header>
        <Box my={"28px"}>
          <Divider>
            <Typography variant="caption">OR</Typography>
          </Divider>
        </Box>

        <main className="login">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container gap={2}>
                  {formFields.map((field) => (
                    <Grid item xs={12} key={field.id}>
                      <InputLabel htmlFor={field.id} error={Boolean(touched[field.id] && errors[field.id])}>
                        {field.label}
                      </InputLabel>
                      <OutlinedInput
                        {...field}
                        label={null}
                        fullWidth
                        error={Boolean(touched[field.id] && errors[field.id])}
                        id={field.id}
                        value={values[field.id]}
                        name={field.id}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={field.label}
                      />
                      {touched[field.id] && errors[field.id] && (
                        <FormHelperText error id={`standard-weight-helper-text-${field.id}`}>
                          {errors[field.id]}
                        </FormHelperText>
                      )}
                    </Grid>
                  ))}

                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12} mt={"36px"}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </main>
        <footer>
          <Typography align="center" mt={"12px"}>
            Already signed up? <Link to="/login">Go to Log In </Link>
          </Typography>
        </footer>
      </Card>
    </Stack>
  );
  return content;
};
export default SignUpForm;

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const socialButton = (imgSrc, text) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: "16px",
      border: "1px solid  #151515",
      padding: "10px",
      borderRadius: "4px",
      gap: "16px",
    }}
  >
    <img src={imgSrc} alt="logo" />
    <Typography>{text}</Typography>
  </Box>
);

const formFields = [
  { id: "name", label: "Your name", type: "text" },
  { id: "email", label: "Your email", type: "email" },
  { id: "key", label: "Your key", type: "text" },
  { id: "secret", label: "Your password", type: "password" },
];
