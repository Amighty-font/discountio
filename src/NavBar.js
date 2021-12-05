import React, { Component } from 'react'
import { Container, Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Home from './Home';
import Account from './Account';
import List from './List'

export default class NavbarComp extends Component {
    render() {
        return (

        <Router>
        <div>
        <Navbar bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand href="#">Discountio</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link as={Link} to={""}>Home</Nav.Link>
                <Nav.Link as={Link} to={"/account"}>Account</Nav.Link>
                <Nav.Link as={Link} to={"/list"}>List</Nav.Link>
                {/* <Nav.Link href="#" disabled>
                hellooo lets go
                </Nav.Link> */}
            </Nav>
            <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Item Name"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </ div>
        <div>
            <Routes>
            <Route path="" element={<Home/>}></Route>
            <Route path="/list" element={<List/>}></Route>
            <Route path="/account" element={<Account/>}></Route>
            </ Routes>
        </div>
        </Router>
        
        )
    }
}
