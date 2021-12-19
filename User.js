// TODO: 
// - scrollbox for table
// - log out, end session

// itemsList.map is not a function error
// TODO: set up .map for table rows so 
// that the table row i chose to edit
// hides itself and returns inputs in that row


import '../css/App.css';
import { useState, useEffect, useRef } from 'react';   
import axios from 'axios';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { Icon } from '@iconify/react';

const User = () => {

    axios.defaults.withCredentials = true;

    let hid = 'form--hidden';

    const [name, setName] = useState('');
    const [idState, setIdState] = useState('');
    const [itemsList, setItemsList] = useState([]);

    const tableRowRef = useRef(null);
    const tableRowInputsRef = useRef(null);

    const [hide, setHide] = useState(false);

    const hider = (id) => {
        const items = itemsList.map((item) => {
            if (item.id !== id) {
                return item;
            }

            return { ...item, isHidden: true };
        });

        setItemsList({ items });
        // setHide((prev) => !prev);
    };

    const renderData = () => {
        return itemsList.map((i, index) => {
            const { id, item, spent, net, date, isHidden } = i

            if (isHidden === true) {
                return null;
                
                    // (<tr className='form--hidden' >
                    //     <th><input onChange={handleChangeNewList} placeholder={values.item} name='item' type='name' className='input--css2'/></th>
                    //     <th><input onChange={handleChangeNewList} placeholder={values.spent} name='spent' type='number' step='any' className='input--css2'/></th>
                    //     <th><input onChange={handleChangeNewList} placeholder={values.net} name='net' type='number'step='any' className='input--css2'/></th>
                    //     <th><input onChange={handleChangeNewList} placeholder={moment(values.date).format('MMM DD, YYYY')} name='date' type='date' className='input--css2'/></th>
                    //     <Icon icon="bi:check" onClick={editItem}/>
                    // </tr>);
            }

            return (
                <tr key={id} >
                    <td>{item}</td>
                    <td>{spent}</td>
                    <td>{net}</td>
                    <td>{moment(date).format('MMM DD, YYYY')}</td>
                    <td>
                        <center>
                            <Icon icon="ant-design:edit-filled" onClick={() => {
                                hider(id);
                            }}/>
                            <Icon icon='ci:close-small' onClick={() => {
                                deleteItem(id);
                            }}/>
                        </center>
                    </td>
                </tr>
            )
        })
        
    }

    const [values, setValues] = useState({
        item: '',
        spent: 0,
        net: 0,
        date: new Date()
    });

    const [newList, setNewList] = useState({
        item: '',
        spent: 0,
        net: 0,
        date: new Date()
    });

    const [list, setList]= useState({
        item: '',
        spent: 0,
        net: 0,
        date: new Date()
    });

    const handleChangeNewList = (e) => {
        setNewList({
            ...newList,
            [e.target.name]: e.target.value
        });
    };
    
    const handleChangeList = (e) => {
        setList({
            ...list,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    // gets the users items 
    const findItems = () => {
        axios.post('http://localhost:3001/find-items', {
            username: name
        }).then((response) => {
            setItemsList(response.data);
            console.log(response.data);
            console.log(name)
        });
    };
 
    // function sets users name
    useEffect(() => {
        axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true) {
                setName(response.data.user[0].username);
                console.log(response.data);
            }
        });
    }, []);

    function addItem(e) {
        axios.post('http://localhost:3001/add-item', {
            ...list,
            [e.target.name]: e.target.value,
            username: name
        }).then((response) => {
            console.log(response)
        });
    };

    function deleteItem(id) {
        axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setItemsList(itemsList.filter((val) => {
                return val.id !== id;
            }));
        });
    };

    const swapToInputs = (val) => {
        const tRow = tableRowRef.current;
        const tRowIn = tableRowInputsRef.current;

        setIdState(val.id);
        setValues({
            item: val.item,
            spent: val.spent,
            net: val.net,
            date: val.date
        });

        hider(val.id)

        //tRow.classList.add(hid);
        // tRowIn.classList.remove(hid);
    };

    function editItem(e) {
        const tRow = tableRowRef.current;
        const tRowIn = tableRowInputsRef.current;

        axios.put(`http://localhost:3001/edit/:${idState}`, {
            ...newList,
            [e.target.name]: e.target.value,
            id: idState,
            username: name
       }).then((response) => {
           tRow.classList.remove(hid);
           tRowIn.classList.add(hid);
           setItemsList(response.data);
           console.log(response);
       });
    };

    return (
        <div className='container'>

            <div className='row mt-4'>
                <div className='col'>
                    <label className='pink'>hi {name}</label>
                    <button className='btn-sharp offset-10'>log out</button>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col offset-1'>
                    <form onSubmit={handleSubmit} className='form-inline'>
                        <div className='form-group'>
                            <label>item</label>
                            <input onChange={handleChangeList} name='item' type='name' className='input--css2' />

                            <label >spent</label>
                            <input onChange={handleChangeList} name='spent' type='number' step='any' className='input--css2' />

                            <label >net</label>
                            <input onChange={handleChangeList} name='net' type='number' step='any' className='input--css2' />

                            <label>date</label>
                            <input onChange={handleChangeList} name='date' type='date' className='input--css2' />

                            <button onClick={addItem} className='btn-sharp'>enter</button>
                            <button onClick={findItems} className='btn-sharp'>find</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='row mt-4'>
                <table className=''>
                    <thead>
                        
                        <tr className='table--style'>
                            <th className='table--bro' scope='col'>item</th>
                            <th className='table--bro' scope='col'>spent</th>
                            <th className='table--bro' scope='col'>net</th>
                            <th className='table--bro' scope='col'>date</th>
                            <th className='table--bro' scope='col'>edit/del</th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        {renderData()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;