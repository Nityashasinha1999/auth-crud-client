import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Nav from './Nav';

import { Link, useHistory } from 'react-router-dom';


const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: '',
        email: ''
    });
         
    
    
    // destructure values from state
    const { title, content, user, email } = state;

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        const jwt = localStorage.jwt;
          axios
           .post(`${process.env.REACT_APP_API}/post`, { 
                
               title, content, user, email
             },
             {
                 headers: {
                     Authorization : `Bearer ${jwt}`
                 }
             }) 
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, title: '', content: '', user: '', email: '' });
                // show sucess alert
                alert(`Post titled ${response.data.title} is created`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>CREATE POST</h1>
            <br />

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input
                        onChange={handleChange('title')}
                        value={title}
                        type="text"
                        className="form-control"
                        placeholder="Post title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea
                        onChange={handleChange('content')}
                        value={content}
                        type="text"
                        className="form-control"
                        placeholder="Write something.."
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        required
                    />
                </div>
                 <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                        onChange={handleChange('email')}
                        value={email}
                        type="text"
                        className="form-control"
                        placeholder="Your email"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
