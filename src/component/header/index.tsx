import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LogoType } from "../icon";
import { useNavigate } from "react-router";
import { logHistory } from "../../utility/loginHistory";

function NavbarHeader() {
  const navigate = useNavigate();
  const handleExit = () => {
    localStorage.setItem("isLogin", JSON.stringify(false));
    const dataUserLogin = localStorage.getItem("user_login");
    if (dataUserLogin) logHistory(JSON.parse(dataUserLogin), "logout");
    localStorage.removeItem("user_login");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ height: "51px" }} dir="rtl">
        <Navbar.Brand href="/">
          <LogoType />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/product">محصولات انتخاب شده</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav className="text-danger" onClick={handleExit}>
              خروج
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
