import { useQuery } from "@tanstack/react-query";
import AppBar from "../../layout/appBar";
import CardKit from "../common/card";
import { Container, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";

const Product = () => {
  const [productUser, setProductUser] = useState([]);
  const userIdLogin = localStorage.getItem("user_login");
  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/products");
      return res.json();
    },
  });

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user_login") || "{}");

    const filteredProducts =
      data?.filter((item: any) => item.user_id === userLogin.user_id) || [];

    setProductUser(filteredProducts);
  }, [data, userIdLogin]);

  return (
    <AppBar>
      <Container>
        <Stack
          direction="horizontal"
          gap={3}
          className="mb-4 mt-3 d-flex flex-wrap justify-content-start"
        >
          {productUser?.length === 0 ? (
            <Stack className="w-100 text-center">
              محصولی برای نمایش وجود ندارد
            </Stack>
          ) : (
            productUser?.map((item: any) => {
              return (
                <div>
                  <CardKit
                    buttonText="ثبت سفارش"
                    title={item.name}
                    content={item.description}
                    imgSrc={item?.img}
                    price={item.price}
                    userNumber={item.user_id}
                  />
                </div>
              );
            })
          )}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Product;
