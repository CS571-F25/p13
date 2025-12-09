import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'

export default function SiteNavbar() {
  const { lang, setLang, t } = useI18n()
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Boardify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>{t.nav.home}</Nav.Link>
            <Nav.Link as={NavLink} to="/demo">{t.nav.demo}</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">{t.nav.contact}</Nav.Link>
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              {lang === 'en' ? 'English' : '한국어'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setLang('en')} active={lang === 'en'}>
                English
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setLang('ko')} active={lang === 'ko'}>
                한국어
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
