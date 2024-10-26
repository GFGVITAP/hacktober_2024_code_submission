import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link , useNavigate} from 'react-router-dom';
import mncLogo from "../img/mncLogo.png"
import "./Nav_bar.css"

function Nav_bar() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <div className="nav-logo-container">
            <img id='mnc-logo' src={mncLogo} alt="" /><div>RMS</div>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/" className='nav-links'>Home</Nav.Link>
              <Nav.Link href="#action2" className='nav-links'>Taxes</Nav.Link>
              <Nav.Link href="/payments" className='nav-links'>Online Payments</Nav.Link>
              <Nav.Link className='nav-links' href='/User-dashboard' to="/User-dashboard">DashBoard</Nav.Link>
              <Nav.Link href="/calculator" className='nav-links'>Calculator</Nav.Link>
              <NavDropdown title="More" id="navbarScrollingDropdown" className='nav-links'>
                <NavDropdown.Item href="#action3">About Us</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Services
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Departments
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  News & Updates
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
            <Form className="d-flex">

              <Button variant="outline-success" onClick={()=>{navigate("/signin")}}>Login</Button>
              <Button variant="outline-danger" onClick={()=>{navigate("/signup")}}>Sign-Up</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default Nav_bar;