import React, {useEffect, useState} from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
function Register(){
    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [emailcheck,setEmailcheck] = useState([]);
    
    useEffect(()=>{
        getLoginUsers()
    },[])




    async function getLoginUsers(){
        let resp=await fetch("https://645e23db12e0a87ac0e89064.mockapi.io/users",{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept":'application/json'
          },
        });
        let data = await resp.json();
        setEmailcheck(data)
        console.log('era',data)
      }
    
    
    
    
    
    async function signUp() {
        console.warn(email,emailcheck)
        
     for (let i = 0; i < emailcheck.length; i++) {
     if (emailcheck[i].email == email) {
    return alert( `this ${email} already exist`) 
    }
        
     }




        let item={name,password,email}
        console.warn(item)

        let result= await fetch("https://645e23db12e0a87ac0e89064.mockapi.io/users",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type": 'application/json',
                "Accept": 'application/json',
            }
        })
        result =await result.json()
        navigate("/login")
        localStorage.setItem("user-info", JSON.stringify(result))
        
    }
    return(
        <div className="col-sm-6 offset-sm-3">
            <h1>Register Page</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="name" />
            <br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password" />
            <br />
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="email" />
            <br />
            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" placeholder="phone" />
            <br />
            <button onClick={signUp}
             className="signUp">Sign Up</button>
        </div>
    )
}

export default Register;

