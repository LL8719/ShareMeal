import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUp from '../pages/Signup';
import Login from '../pages/Login';
import { Box, Stack, Text, Input, Button,Divider } from '@chakra-ui/react'

import Auth from '../utils/auth';
import "../styles/AppNav.css"
const AppNav = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='center'>
      <Box fontFamily={'Poppins'} color={'white'} textShadow=' 4px 4px 6px rgba(0, 0, 0, 8)' fontSize={'90px'}>ShareMeal</Box>
      </div>
      <Box className="navbar" display="flex"  margin="0 auto 30px auto"  maxW={"900px"}>
        <Box w="100px" ></Box>
        <Box display="flex" gap="40px">
        <Navbar.Brand as={Link} to='/'>
            Recipe Search
          </Navbar.Brand>
          <Nav.Link as={Link} to='/'>
                Search For Recipes
              </Nav.Link>
              <Link>Comment</Link>
          </Box> 

        <div>
     

        {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Recipes
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
        </div>
     
        
      </Box>

     
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
