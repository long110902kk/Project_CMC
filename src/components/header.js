import { Container, Row, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderApp = () => {
    return (
        <Row className="header-app">
            <Container>
                <Nav className="justify-content-center">
                    <div className="nav-link-container">
                        <NavLink to={'/'}>Home</NavLink>
                    </div>
                    <div className="nav-link-container">
                        <NavLink to={'/post'}>Post</NavLink>
                    </div>
                    <div className="nav-link-container">
                        <NavLink to={'/login'}>Login</NavLink>
                    </div>
                    <div className="nav-link-container">
                        <NavLink to={'/register'}>Register</NavLink>
                    </div>
                </Nav>
            </Container>
        </Row>
    );
}
export default HeaderApp;
