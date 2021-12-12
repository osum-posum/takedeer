import '../css/App.css';
import { useRef, useState, useEffect } from 'react';   
import axios from 'axios';
import { useNavigate } from 'react-router';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const User = () => {

    // const [loginStatus, setLoginStatus] = useState('');

    axios.defaults.withCredentials = true;

    // Function --> sets loginStatus for useState(); 
    // useEffect(() => {
    //     axios.get('http://localhost:3001/login').then((response) => {
    //         if (response.data.loggedIn === true) {
    //             setLoginStatus(response.data.user[0].username);
    //             console.log(response.data);
    //         }
    //     });
    // }, []);

    return (
        <Container id='container' className='d-grid h-100'>
            <p>hi</p>
        </Container>
    );
};

export default User;