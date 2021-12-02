import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

function Header(){

    let history = useHistory();

    const logOut = () => {
        localStorage.clear();
        history.push("/login");
    }

    //get current state
    const userData = localStorage.getItem("userData");
    let getUserType = "";
    if(userData){
        const user = JSON.parse(userData);
        getUserType = user.account_type;
    }

    return(
        <Navbar bg="primary" variant="dark" expand="md">
            <Container>
                <Navbar.Brand>AdSwipe</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {getUserType === 'admin' ? (<Link to="/scrape_ads" className="fix_lnk_style nav-link">Scrape Ads</Link>) : ''}
                        <Link to="/search_ads" className="fix_lnk_style nav-link">Search Ads</Link>
                        <Link to="/favorites" className="fix_lnk_style nav-link">Favorites</Link>
                        <Link to="/folders" className="fix_lnk_style nav-link">Folders</Link>
                        {/* <Link to="/about" className="fix_lnk_style nav-link">About</Link> */}
                        {/* <Link to="/help" className="fix_lnk_style nav-link">Help</Link> */}
                    </Nav>
                    <Nav>
                        <Button variant="warning" onClick={logOut}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;