import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import CategoriesModal from '../CategoriesModal/CategoriesModal';

const MainNav = () => {
  return (
    <>
      <div className='hcp-notify'>
        This site is intended for healthcare professionals
      </div>
      <div className='wb-logo d-none d-xl-block'>
        <h1>
          <Link href='/'>
            <a>
              <span>Med</span>lair
            </a>
          </Link>
        </h1>
        <span>
          {new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
      <Navbar bg='light' expand='xl'>
        <Container fluid>
          <Navbar.Brand className='d-block d-xl-none' href='/'>
            <span>Med</span>lair
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='m-auto'>
              <Link
                href={`/latest-news?category=Health Assessment And Treatment`}
              >
                <a className='nav-link'>Health Assessment and treatment</a>
              </Link>
              <Link
                href={`/latest-news?category=Basic processes, theory and methodology`}
              >
                <a className='nav-link'>
                  Basic processes, theory and methodology
                </a>
              </Link>
              <Link href={`/latest-news?category=Biopsychosocial interactions`}>
                <a className='nav-link'>Biopsychosocial interactions</a>
              </Link>
              <Link
                href={`/latest-news?category=Health policy and Organizations`}
              >
                <a className='nav-link'>Health policy and Organizations</a>
              </Link>
              <CategoriesModal />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNav;
