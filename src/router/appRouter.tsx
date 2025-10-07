import Home from "../pages/home";
import Login from "../pages/login";
import ProductPages from "../pages/product";

export const userRoutesAcceptor = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product",
    element: <ProductPages />,
  },
];
