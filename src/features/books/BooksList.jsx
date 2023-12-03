import { useGetBooksQuery } from "./booksApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import Book from "./Book";
import { Button, Grid, TextField, Typography } from "@mui/material";
import plus from "../../assets/plus.svg";
import AddBookModal from "./AddBookModal";
import { useState } from "react";

const BooksList = () => {
  useTitle("Books list");

  const [open, setOpen] = useState(false);

  const { name } = useAuth();

  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBooksQuery("Book", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  console.log(isSuccess);
  if (isLoading) content = <div>Loading....</div>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = books;

    const listData = ids?.length ? (
      ids.map((bookId) => <Book key={bookId} bookId={bookId} />)
    ) : (
      <Typography
        color={"white"}
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        No books yet :(
      </Typography>
    );

    content = (
      <div>
        <Grid container justifyContent={"space-between"}>
          <Typography fontSize={"36px"} fontWeight={"700"} color={"white"}>
            You’ve got
            <span className="primaryColor"> {ids?.length} book</span>
          </Typography>
          <Grid item xs={6} justifyContent={"flex-end"} container>
            <TextField placeholder="Enter a book name" sx={{ width: "300px", input: { background: "white" } }} />
            <Button
              variant="contained"
              sx={{ marginLeft: "12px", p: "10px 24px", textTransform: "none", gap: "12px" }}
              onClick={() => setOpen(true)}
            >
              <img src={plus} />
              Create a book
            </Button>
          </Grid>
        </Grid>
        <Typography fontSize={"20px"} fontWeight={"400"} color={"white"} mb={4} mt={"12px"}>
          Your task today
        </Typography>
        <Grid
          container
          sx={{
            gap: "24px",
          }}
        >
          {listData}
        </Grid>
        <AddBookModal open={open} onClose={() => setOpen(false)} />
      </div>
    );
  }

  return content;
};
export default BooksList;
