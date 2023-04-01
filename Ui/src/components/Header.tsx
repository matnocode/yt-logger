import { Container, NavbarBrand, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="light">
      <Container className="d-flex justify-content-between">
        <button className="btn">
          <NavbarBrand onClick={() => navigate("/")}>Yt-Logger</NavbarBrand>
        </button>
        <NavDropdown title={"My Account"}>
          <NavDropdown.Item
            onClick={() => {
              console.log("Cliked Register");
            }}
          >
            Register
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              console.log("Cliked login");
            }}
          >
            Login
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
