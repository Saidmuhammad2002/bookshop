import { Box, Button, Grid } from "@mui/material";
import errorImage from "../assets/error.svg";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <img src={errorImage} alt="Error 404 - Page Not Found" style={{ maxWidth: "100%", height: "auto" }} />
      <Grid gap={2} container justifyContent="center" mt={4}>
        {["Go Home Page", "Reload Page"].map((label, index) => (
          <Button
            key={index}
            variant={index === 0 ? "contained" : "outlined"}
            onClick={() => (index === 0 ? navigate("/") : window.location.reload())}
            sx={{
              p: "10px 64px",
              textTransform: "none",
              marginBottom: "8px",
            }}
          >
            {label}
          </Button>
        ))}
      </Grid>
    </Box>
  );
};

export default ErrorPage;
