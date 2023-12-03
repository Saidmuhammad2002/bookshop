import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "./booksApiSlice";
import { memo, useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import AddBookModal from "./AddBookModal";

const Book = ({ bookId }) => {
  const { book } = useGetBooksQuery("Book", {
    selectFromResult: ({ data }) => ({
      book: data?.entities[bookId],
    }),
  });

  const { title, author, published, pages, cover } = book || {};

  const navigate = useNavigate();

  if (book) {
    return (
      <Card sx={{ width: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              cover || "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.webp"
            }
            sx={{ objectFit: "contain", backgroundColor: "#EFE6FD" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title || "No title"}
            </Typography>
            <Grid container justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="body1" color="text.secondary">
                {author || "No author"}: {published || "####"}-year
              </Typography>
              <Chip
                label={pages + " pages"}
                sx={{ backgroundColor: "#EFE6FD", color: "primary.main", maxHeight: "19px", fontSize: "12px" }}
              />
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else return null;
};

const memoizedNote = memo(Book);

export default memoizedNote;
