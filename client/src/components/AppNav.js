import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUp from '../pages/Signup';
import Login from '../pages/Login';
import { Box, Stack, Text, Input, Button, Divider } from '@chakra-ui/react'

import Auth from '../utils/auth';
import "../styles/AppNav.css"
const AppNav = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
  
        <div className='header-wrapper'>
          <div className='center'>
          <Box fontFamily={'Poppins'} color={'white'} textShadow=' 4px 4px 6px rgba(0, 0, 0, 8)' fontSize={'8vw'}>ShareMeal</Box>
          </div>
        <div className='nav-container'>
        <Box className="navbar" display="flex" >
          <Box display="flex" className='navbar-brand'>
            <Navbar.Brand as={Link} to='/'>
              Home
            </Navbar.Brand>
          </Box>

            {Auth.loggedIn() ? (
              <>       
                <Nav.Link as={Link} to='/saved' className='navbar-brand'>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => setShowModal(true)}>Login | Sign Up</Nav.Link>
            )}
        </Box>
        </div>
        </div>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <Login handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUp handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNav;
