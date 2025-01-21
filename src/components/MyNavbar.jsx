import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const MyNavbar = ({ cartItemCount, handleShowCart }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Tienda Pokemon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/category/fire">Fire Pokemons</Nav.Link>
            <Nav.Link as={Link} to="/category/water">Water Pokemons</Nav.Link>
          </Nav>
          <CartWidget cartItemCount={cartItemCount} handleShowCart={handleShowCart} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
