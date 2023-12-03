import { useSelector } from "react-redux";

const useAuth = () => {
  const { key, secret, email, name } = useSelector((state) => state.auth);
  const isAuthenticated = key && secret;
  console.log(key, secret, email, name);

  return { isAuthenticated, email, name };
};
export default useAuth;
