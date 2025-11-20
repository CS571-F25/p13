import { Navbar, Container, Nav } from 'react-bootstrap'

export default function SiteNavbar() {
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#/">Boardify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/demo">Demo</Nav.Link>
            <Nav.Link href="#/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
