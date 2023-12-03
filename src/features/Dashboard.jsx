import { Container } from "@mui/material";
import NavBar from "../components/Navbar";
import BooksList from "./books/BooksList";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <NavBar />
      <BooksList />
    </Container>
  );
};
export default Dashboard;
