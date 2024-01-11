/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link passHref href="/">
        <Image src="images/pizza.png" alt="pizza slice clip art" id="logo" />
      </Link>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/orders/orders">
              <Nav.Link>View Orders</Nav.Link>
            </Link>
            <Link passHref href="/orders/new">
              <Nav.Link>Create Order</Nav.Link>
            </Link>
            <Link passHref href="/revenue/revenue">
              <Nav.Link>View Revenue</Nav.Link>
            </Link>
            <Button variant="danger" id="btn-signout" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
