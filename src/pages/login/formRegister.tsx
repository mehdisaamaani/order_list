import React, { useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { hasRegister } from "./login.type";
import { toast } from "react-toastify";

const RegisterPage = (props: hasRegister) => {
  const { setRegisterPage } = props;
  const [counterRegister, setCounterRegister] = useState(0);
  const [validated, setValidated] = useState(false);
  const [dataLocalArray, setDataLocalArray] = useState([{}]);
  const [stateOnLocalStorage, setStateOnLocalStorage] = useState({
    id: "0",
    name: "",
    lastName: "",
    user_id: "user_1",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStateOnLocalStorage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const storedUsers = localStorage.getItem("user_data");
    if (storedUsers) {
      setDataLocalArray(JSON.parse(storedUsers));
    }
    const storedCounter = localStorage.getItem("data_counter");
    if (storedCounter) {
      setCounterRegister(Number(storedCounter));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("user_data", JSON.stringify(dataLocalArray));
  }, [dataLocalArray]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataForm = Object.values(stateOnLocalStorage).every(
      (value) => typeof value === "string" && value !== ""
    );
    if (!dataForm) {
      setValidated(true);
    }
    const existingUser = dataLocalArray?.find(
      (user: any) => user.phone === stateOnLocalStorage.phone
    );
    if (existingUser) {
      toast.error("این شماره موبایل تکراری است");
      return;
    }

    if (dataForm) {
      const dataCounterFromLocal = localStorage.getItem("data_counter");
      const newCounter = dataCounterFromLocal
        ? Number(dataCounterFromLocal) + 1
        : counterRegister + 1;

      setCounterRegister(newCounter);
      localStorage.setItem("data_counter", `${newCounter}`);

      const newUser = {
        ...stateOnLocalStorage,
        user_id: `user_${newCounter}`,
        id: stateOnLocalStorage.phone,
      };

      setStateOnLocalStorage({
        id: "0",
        name: "",
        lastName: "",
        user_id: "user_1",
        phone: "",
        email: "",
      });

      const updatedArray = [...dataLocalArray, newUser];
      setDataLocalArray(updatedArray);
      localStorage.setItem("user_data", JSON.stringify(updatedArray));

      setRegisterPage(false);
    }
  };
  return (
    <Form dir="rtl" style={{ width: "50%" }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="نام"
          name="name"
          value={stateOnLocalStorage.name}
          onChange={handleChange}
          isInvalid={stateOnLocalStorage.name.trim() === "" && validated}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Control
          name="lastName"
          value={stateOnLocalStorage.lastName}
          onChange={handleChange}
          isInvalid={stateOnLocalStorage.lastName.trim() === "" && validated}
          type="text"
          placeholder="نام خانوادگی"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Control
          name="phone"
          value={stateOnLocalStorage.phone}
          onChange={handleChange}
          isInvalid={stateOnLocalStorage.phone.trim() === "" && validated}
          type="text"
          placeholder="شماره تماس"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          name="email"
          type="email"
          value={stateOnLocalStorage.email}
          onChange={handleChange}
          isInvalid={stateOnLocalStorage.email.trim() === "" && validated}
          placeholder="ایمیل"
        />
      </Form.Group>
      <Stack direction="vertical">
        <Button variant="primary" type="submit">
          ثبت نام
        </Button>
        <Button
          variant="outline-light"
          className="bg-none text-primary"
          onClick={() => setRegisterPage(false)}
        >
          آیا حساب کاربری دارید؟ وارد شوید
        </Button>
      </Stack>
    </Form>
  );
};

export default RegisterPage;
