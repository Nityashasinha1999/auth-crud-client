import React,{useState} from 'react';
import Nav from './Nav';
import {Link,useHistory} from 'react-router-dom'

const Login = ()=> {
    const history = useHistory()
   // const [name, setName] = useState("")
     const [password, setPassword] = useState("")
      const [email, setEmail] = useState("")
      const PostData = () => {
          fetch(`${process.env.REACT_APP_API}/signin`, {
              method: "post",
              headers:{
                  "Content-Type": "application/json"
              },
              body:JSON.stringify({
                 // name,
                  password,
                  email
              })
          }).then(res=>res.json())
          .then(data => {
              console.log(data)
              if(data.error){
                  console.log("error")
                  
              }
              else{
                  
                 localStorage.setItem("jwt", data.token)
                 localStorage.setItem("user",JSON.stringify(data.user))
                 localStorage.setItem("email", JSON.stringify(data.email))
                 //console.log('bgf')
              history.push('/')
              console.log(data)
              }
          }).catch(err=> {
              console.log(err)
          })
          
      }
    return (
         
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>LOGIN</h1>
            <br />
            
                 <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                        //value={email}
                        type="text"
                        className="form-control"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input
                       // value={password}
                        type="password"
                        className="form-control"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={() => PostData()}>Login</button>
                </div>
            
        </div>
    );


    
}

export default Login;