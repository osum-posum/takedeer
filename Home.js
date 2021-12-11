// -- takedeer.com -- //

//TODOS:
// -- resize row 2 to stay the same size and never change when swaping forms


// inmport variables //
import '../css/App.css';
import { useRef, useState, useEffect } from 'react';   
import axios from 'axios';
import { useNavigate } from 'react-router';

import { Container, Form, Button, Row, Col } from 'react-bootstrap';

// Entire Component { variables, functions, etc. }
const Home = () => {

    // used to push user to new page
    let navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameLog, setUsernameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const createFormRef = useRef(null);
    const loginFormRef = useRef(null);
    const passWarningRef = useRef(null);
    const userWarningRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const swapCreate = () => {
        const passWarn = passWarningRef.current;
        const createForm = createFormRef.current;
        const loginForm = loginFormRef.current;

        if (passWarn.className !== 'form--hidden'){
            passWarn.classList.add('form--hidden');
        };

        createFormRef.current.classList.add('form--hidden');
        loginFormRef.current.classList.remove('form--hidden');
    };

      const swapLogin = () => {
        const userWarn = userWarningRef.current
        const createForm = createFormRef.current
        const loginForm = loginFormRef.current

        if (userWarn.className !== 'form--hidden'){
            userWarn.classList.add('form--hidden');
        };

        createForm.classList.remove('form--hidden');
        loginForm.classList.add('form--hidden');
    };

    axios.defaults.withCredentials = true;

    // Function --> creates user 
    function createUser() {

        if (passwordReg !== confirmPassword) {
            passWarningRef.current.classList.remove('form--hidden')
        } else {
            passWarningRef.current.classList.add('form--hidden')
        };

        if (passwordReg || confirmPassword === ''){
            return console.log('blank inputs')
        };

        axios.post('http://localhost:3001/create', {
            username: usernameReg,
            password: passwordReg,
            confirmPassword: confirmPassword,
        }).then(() => {
            console.log('success');
        });
    };

    // Function --> logs user in // sets status of logged in
    function login() {
        axios.post('http://localhost:3001/login:id', {
            username: usernameLog,
            password: passwordLog,
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message)
                userWarningRef.current.classList.remove('form--hidden');
            } else {
                console.log(response.data[0].username)
                console.log({message: 'pushed'});

                //TODO: navigate for when user is logged in
                navigate(`/User/${response.data[0].username}`);
            }
        });
    };

    // Front End Componant 
    return (
        <Container className='d-grid h-100 justify-content-center text-justify'>

            {/* HEADER */}
            <Row className='align-items-end'>
                <Col>
                    <h5>
                        <small><p>welcome to <span>takedeer.com </span></p></small>
                    </h5>
                    <small><p>keep track of your finances.</p></small>
                </Col>
            </Row>

            {/* cREATE Form */}
            <Row id='container' className='' ref={createFormRef} md>
                <Form onSubmit={handleSubmit} id='form--css' className='text-center form-inline' >
                <div className='space'></div>
                    <h6 className='pink'>make</h6>
                    <div className='space'></div>
                    <Col >
                        <Form.Group>
                            <Form.Label>user</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col className='offset-md-2'>
                        <Form.Group>
                            <Form.Control className='input--css' type='username' onChange={(event) => {setUsernameReg(event.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>pass</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col  className='offset-md-2'>
                        <Form.Group>
                            <Form.Control className='input--css' type='password' onChange={(event) => {setPasswordReg(event.target.value)}}/> 
                        </Form.Group>
                    </Col>
                    <Col >
                        <Form.Group>
                            <Form.Label>confirm</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col className='offset-md-2'>
                        <Form.Group>
                            <Form.Control className='input--css' type='password' onChange={(event) => {setConfirmPassword(event.target.value)}}/> 
                        </Form.Group>
                    </Col>

                    <Row className='justify-content-center'>
                        <div className='space'></div>
                        <Button variant='sharp' size='sm' onClick={createUser}>make</Button>
                        <div className='space'></div>
                        <Button variant='sharp' size='sm' onClick={swapCreate}>log</Button>
                    </Row>
                    <div className='space'>
                    <p className='form--hidden pink' ref={passWarningRef}>passwords don't match</p>
                    </div>
                    <div className='space'></div>
                </Form>
            </Row>
            
            {/* Login fORM */}
            <Row ref={loginFormRef} id='container' className='form--hidden' md>
                <Form onSubmit={handleSubmit} id='form--css' className='text-center w-100' >
                <div className='space'></div>
                <h6 className='pink'>log</h6>
                <div className='space'></div>
                    <Col >
                        <Form.Group>
                            <Form.Label>user</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='offset-md-2'>
                            <Form.Control className='input--css' type='username' onChange={(event) => {setUsernameLog(event.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col >
                        <Form.Group>
                            <Form.Label>pass</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col className='offset-md-2'>
                        <Form.Group>
                            <Form.Control className='input--css' type='password' onChange={(event) => {setPasswordLog(event.target.value)}}/>
                        </Form.Group>
                    </Col>
                    
                    <Row className='justify-content-center'>
                        <div className='space'></div>
                        <Button variant='sharp' id='' size='sm' onClick={login}>log</Button>
                        <div className='space'></div>
                        <Button variant='sharp' size='sm' onClick={swapLogin}>make</Button>
                    </Row>
                    <div className='space'>
                    <p className='form--hidden pink' ref={userWarningRef}>wrong username/ password</p>
                    </div>
                    <div className='space'></div>
                </Form>
            </Row>

            {/* FOOTER */}
            <Row className='align-items-start'>
                <Col>
                    <footer>
                        <small><p>site created by <span>Chavez, </span> 2021.</p></small>
                    </footer>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;