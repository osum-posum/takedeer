// -- takedeer.com -- //

// inmport variables //
import '../App.css';
import { useRef, useState, useEffect } from 'react';   
import axios from 'axios';
import { useNavigate } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    const handleSubmit = (event) => {
        event.preventDefault();
    };

      const swapCreate = () => {
        createFormRef.current.classList.add('form--hidden');
        loginFormRef.current.classList.remove('form--hidden');
    };

      const swapLogin = () => {
        createFormRef.current.classList.remove('form--hidden');
        loginFormRef.current.classList.add('form--hidden');
    };

    axios.defaults.withCredentials = true;

    // Function --> creates user 
    function createUser() {

        if (passwordReg !== confirmPassword) {
            passWarningRef.current.classList.remove('form--hidden')
        } else {
            passWarningRef.current.classList.add('form--hidden')
        };

        axios.post('http://localhost:3001/create', {
            username: usernameReg,
            password: passwordReg,
            confirmPassword: confirmPassword,
        }).then(() => {
            console.log('success');
        });
    };

    // Function --> logs user in 
    function login() {
        axios.post('http://localhost:3001/login:id', {
            username: usernameLog,
            password: passwordLog,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
                console.log(response.data.message)
            } else {
                setLoginStatus(response.data[0].username);
                console.log(response.data[0].username)
                console.log({message: 'pushed'});
                //TODO: navigate for when user is logged in
                navigate(`/User/${response.data[0].username}`);
            }
        });
    };

    // Function --> sets loginStatus for useState(); 
    useEffect(() => {
        axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0].username);
                console.log(response.data);
            }
        });
    }, []);

    // Front End Componant 
    return (
        <Container id='container' className='d-grid h-100'>
            <Form onSubmit={handleSubmit} id='form--width' className='text-center w-100' ref={createFormRef}>
                <h6>make</h6>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control type='username' size='sm'onChange={(event) => {setUsernameReg(event.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password' size='sm' onChange={(event) => {setPasswordReg(event.target.value)}}/> 
                </Form.Group>
                <Form.Group>
                    <Form.Label>confirm password</Form.Label>
                    <Form.Control type='password' size='sm' onChange={(event) => {setConfirmPassword(event.target.value)}}/> 
                </Form.Group>
                <div>
                <Button variant='primary' size='sm' onClick={createUser}>make</Button>
                </div>
                <div>
                    <Button variant='primary' size='sm' onClick={swapCreate}>log</Button>
                </div>
                <p className='form--hidden' ref={passWarningRef}>passwords don't match</p>
            </Form>

            <Form id='form--width' className='text-center w-100 form--hidden' ref={loginFormRef}>
            <h6>log</h6>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control type='username' size='sm'onChange={(event) => {setUsernameLog(event.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password' size='sm' onChange={(event) => {setPasswordLog(event.target.value)}}/> 
                </Form.Group>
                <div>
                <Button variant='primary' size='sm' onClick={login}>log</Button>
                </div>
                <div>
                    <Button variant='primary' size='sm' onClick={swapLogin}>make</Button>
                </div>
            </Form>
        </Container>
    );
};

export default Home;