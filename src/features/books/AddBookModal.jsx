import { useFormik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Modal, Button, TextField, Typography, Card, IconButton, Grid, InputLabel } from "@mui/material";
import { useAddNewBookMutation } from "./booksApiSlice";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import x from "../../assets/x.svg";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const fields = [
  { name: "isbn", label: "ISBN", type: "text", placeholder: "Enter ISBN" },
  { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
  { name: "author", label: "Author", type: "text", placeholder: "Enter author" },
  { name: "cover", label: "Cover", type: "url", placeholder: "Choose cover image", accept: "image/*" },
  { name: "published", label: "Published Date", type: "date" },
  { name: "pages", label: "Pages", type: "number", placeholder: "Enter number of pages" },
];

const validationSchema = yup.object().shape({
  isbn: yup.string().required("ISBN is required"),
  title: yup.string().optional("Title is optional"),
  author: yup.string().optional("Author is optional"),
  cover: yup.mixed().optional("Cover image is optional"),
  published: yup.date().optional("Published date is optional"),
  pages: yup.number().optional("Pages is optional").positive("Please enter a valid number"),
});

const AddBookModal = ({ open, onClose }) => {
  const [addNewBook, { isLoading, isError, error, isSuccess, data }] = useAddNewBookMutation();

  const formik = useFormik({
    initialValues: { isbn: "", title: "", author: "", cover: "", published: dayjs("2022-04-17"), pages: "" },
    validationSchema,
    onSubmit: async (values) => {
      values.published = values.published.format("YYYY-MM-DD");
      await addNewBook(values);
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          p: 4,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography fontSize="20px" fontWeight="700">
            Create a Book
          </Typography>
          <IconButton onClick={onClose}>
            <img src={x} alt="close" />
          </IconButton>
        </Grid>
        <Typography fontSize="14px" fontWeight="400" mb={1}>
          Only ISBN supported by backend
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {fields.map((field) => (
            <Grid key={field.name} container mb={2}>
              <InputLabel htmlFor={field.name} error={Boolean(formik.touched[field.name] && formik.errors[field.name])}>
                {field.label}
              </InputLabel>
              {field.type === "date" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formik.values[field.name]}
                    onChange={(value) => formik.setFieldValue(field.name, value)}
                    textField={(params) => <TextField {...params} variant="outlined" placeholder={field.placeholder} />}
                  />
                </LocalizationProvider>
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  inputProps={field.accept ? { accept: field.accept } : {}}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                />
              )}
            </Grid>
          ))}

          {isError && <Typography color="red">{error?.data?.message}</Typography>}

          <Grid container justifyContent="space-between" gap={"20px"}>
            <Button variant="outlined" onClick={onClose} sx={{ minWidth: "180px" }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ minWidth: "180px" }} disabled={isLoading}>
              Create Book
            </Button>
          </Grid>
        </form>
      </Card>
    </Modal>
  );
};

export default AddBookModal;

AddBookModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
