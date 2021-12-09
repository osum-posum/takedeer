import '../App.css';
import { useRef, useState } from 'react';   
import axios from 'axios'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const Home = () => {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameLog, setUsernameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');

    const createFormRef = useRef(null);
    const loginFormRef = useRef(null);
    const passWarningRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
      };

    function createUser() {

        axios.post('http://localhost:3001/create', {
            username: usernameReg,
            password: passwordReg,
            confirmPassword: confirmPassword,
        });

        // if (usernameReg !== confirmPassword) {
        //     passWarningRef.current.classList.remove('form--hidden')
        // } else {
        //     passWarningRef.current.classList.add('form--hidden')
        // };
    };

    return (
        <Container id='container' className='d-grid h-100'>
            <Form onSubmit={handleSubmit} id='form--width' className='text-center w-100' ref={createFormRef}>
                <h8>sign up</h8>
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
                    <Form.Control type='password' size='sm' onCHange={(event) => {setConfirmPassword(event.target.value)}}/> 
                </Form.Group>
            </Form>

            <Form id='form--width' className='text-center w-100 form--hidden' ref={createFormRef}>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control type='username' size='sm'onChange={(event) => {setUsernameLog(event.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password' size='sm' onChange={(event) => {setPasswordLog(event.target.value)}}/> 
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Home;