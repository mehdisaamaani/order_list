import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import FormLogin from "./formLogin";
import RegisterPage from "./formRegister";

const Login = () => {
  const [registerPage, setRegisterPage] = useState(false);
  const [counterRegister, setCounterRegister] = useState(0);

  return (
    <Container fluid>
      <Row>
        <Col lg="6" style={{ minHeight: "100svh" }}>
          <img src="./login.webp" className="img-fluid h-100 w-100" alt="..." />
        </Col>
        <Col lg="5" style={{ height: "100svh" }}>
          <Stack
            gap={2}
            className="justify-content-center align-items-center "
            style={{ height: "100%" }}
          >
            {!registerPage ? (
              <FormLogin
                setRegisterPage={setRegisterPage}
                setCounterRegister={setCounterRegister}
                counterRegister={counterRegister}
              />
            ) : (
              <RegisterPage
                setRegisterPage={setRegisterPage}
                setCounterRegister={setCounterRegister}
                counterRegister={counterRegister}
              />
            )}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
