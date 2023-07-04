import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirect = (route) => {
  if (!route) {
    route = '/register'
  }
  const navigate = useNavigate();

  const jwt = window.localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      navigate(route);
    }
  }, [jwt]);

  return null;
};

export default useRedirect;
