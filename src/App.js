import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';

const App = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = (email) => {
        const jwt = localStorage.jwt;
          if (jwt) {
            const api    =  `${process.env.REACT_APP_API}/posts/${email}`;
            const header =  { Authorization : `Bearer ${jwt}` };
          
          axios
            .get(api,{ headers: header})
            .then(response => {
                console.log(typeof (response.data));
                setPosts(response.data);
            })
            .catch(error => alert('Error fetching posts'));

          }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this post?');
        if (answer) {
            deletePost(slug);
        }
    };

    const deletePost = slug => {
        // console.log('delete', slug, ' post');
        const jwt = localStorage.jwt;
        if (jwt) {
            const api = `${process.env.REACT_APP_API}/post/${slug}`;
            const header = { Authorization : `Bearer ${jwt}` };
        
        axios
            .delete(api, {headers: header })
            .then(response => {
                alert(response.data.message);
                fetchPosts();
            })
            .catch(error => alert('Error deleting post'));
        } else {
            alert("User not logged in")
        }
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>MERN CRUD</h1>
            <hr />
            
            {posts.length > 0 && posts.map((post, email) => (
                <div className="row" key={post.email} style={{ borderBottom: '1px solid silver' }}>
                    <div className="col pt-3 pb-2">
                        <div className="row">
                            <div className="col-md-10">
                                <Link to={`/post/${post.slug}`}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <p className="lead">{post.content.substring(0, 100)}</p>
                                <p>
                                    Author <span className="badge">{post.user}</span> Published on{' '}
                                    <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
                                </p>
                            </div>

                            <div className="col-md-2">
                                <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                                    Update
                                </Link>
                                <button
                                    onClick={() => deleteConfirm(post.slug)}
                                    className="btn btn-sm btn-outline-danger ml-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
