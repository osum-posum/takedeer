import '../css/App.css';
import { useRef, useState, useEffect } from 'react';   
import axios from 'axios';
import { useNavigate } from 'react-router';

const User = () => {

    // const [loginStatus, setLoginStatus] = useState('');

    axios.defaults.withCredentials = true;

    
    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col offset-1'>
                    <form className='form-inline'>
                        <div className='form-group'>
                            <label>item</label>
                            <input className='input--css2'></input>

                            <label >spent</label>
                            <input className='input--css2'></input>

                            <label >net</label>
                            <input className='input--css2'></input>

                            <label>date</label>
                            <input className='input--css2'></input>
                        </div>
                    </form>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='table'>
                    <thead>
                        <tr className='table--style'>
                            <th className='table--bro' scope='col'>item</th>
                            <th className='table--bro' scope='col'>spent</th>
                            <th className='table--bro' scope='col'>net</th>
                            <th className='table--bro' scope='col'>date</th>
                        </tr>
                        <tbody className='tbody'>
                            <tr>
                                <th></th>
                            </tr>
                        </tbody>
                    </thead>
                </div>
            </div>
        </div>
    );
};

export default User;