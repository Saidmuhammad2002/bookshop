import { useSelector } from "react-redux";

const useAuth = () => {
  const { key, secret, email, userName } = useSelector((state) => state.auth);
  const isAuthenticated = key && secret;
  console.log(key, secret, email, userName);

  return { isAuthenticated, email, userName };
};
export default useAuth;
