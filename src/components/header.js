import { Container, Row, Nav, Dropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const HeaderApp = () => {
    const usenavigate = useNavigate();

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            usenavigate('/');
        }
    }, [usenavigate]);

    return (
        <Row className="header-app">
            <Container>
                <Nav className="justify-content-center">
                    <div className="nav-link-container header-app-menu">
                        <NavLink to={'/home'}>Profile</NavLink>
                    </div>
                    <Dropdown as={Nav.Item} className="nav-link-container header-app-menu">
                        <Dropdown.Toggle as={NavLink} to={'/post'}>List Student</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to={'/post'} style={{color: 'black', backgroundColor: 'white'}}>List Student</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to={'/create'} style={{color: 'black'}}>Add Student</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="nav-link-container header-app-menu">
                        <NavLink to={'/'}>Logout</NavLink>
                    </div>
                </Nav>
            </Container>
        </Row>
    );
}
export default HeaderApp;
