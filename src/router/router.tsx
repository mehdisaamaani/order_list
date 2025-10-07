import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router";
import { userRoutesAcceptor } from "./appRouter";

const RouterPages = () => {
  const isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);
  return useRoutes(userRoutesAcceptor);
};

export default RouterPages;
