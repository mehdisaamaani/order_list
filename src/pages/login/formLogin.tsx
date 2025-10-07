import React, { useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { hasRegister } from "./login.type";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logHistory } from "../../utility/loginHistory";

const FormLogin = (props: hasRegister) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { setRegisterPage } = props;
  const [valueLogin, setValueLogin] = useState({
    email: "",
    phone: "",
    user_id: "",
  });
  const [validated, setValidated] = useState(false);
  const [userDataLocal, setUserDataLocal] = useState([]);
  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    const test = userData && JSON.parse(userData);
    setUserDataLocal(test);
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValueLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFormLogin = Object.values(valueLogin).every(
      (value) => typeof value === "string" && value !== ""
    );
    if (!dataFormLogin) {
      setValidated(true);
    }
    const phoneData = userDataLocal?.find(
      (value: any) => value.phone === valueLogin.phone
    );
    const emailData = userDataLocal?.find(
      (value: any) => value.email === valueLogin.email
    );
    const userId: any = userDataLocal?.filter(
      (value: any) => value.phone === valueLogin.phone
    );
    const userWithId = {
      ...valueLogin,
      user_id: userId[0]?.user_id,
    };
    if (phoneData && emailData) {
      setIsLogin(true);
      navigate("/");
      localStorage.setItem("isLogin", JSON.stringify(true));
      localStorage.setItem("user_login", JSON.stringify(userWithId));
      logHistory({ email: valueLogin.email, phone: valueLogin.phone }, "login");
    }
    if (!phoneData || !emailData) {
      toast.error("کاربر یافت نشد");
    }
  };

  return (
    <Form dir="rtl" style={{ width: "50%" }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="ایمیل"
          name="email"
          value={valueLogin.email}
          onChange={handleChange}
          isInvalid={valueLogin.email === "" && validated}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="شماره تماس"
          name="phone"
          value={valueLogin.phone}
          onChange={handleChange}
          isInvalid={valueLogin.phone === "" && validated}
        />
      </Form.Group>

      <Stack direction="vertical">
        <Button variant="primary" type="submit">
          ورود
        </Button>
        <Button
          variant="outline-light"
          className="bg-none text-primary"
          onClick={() => setRegisterPage(true)}
        >
          آیا حساب کاربری ندارید؟
        </Button>
      </Stack>
    </Form>
  );
};

export default FormLogin;
