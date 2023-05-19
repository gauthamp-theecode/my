import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [loginFlag,setloginFlag] = useState(false);
  const [password,setPassword] = useState("");
  const [result,setResult] = useState([]);
  useEffect(() => {
    getLoginUsers()
  },[])

  const handleRegisterClick = () => {
    navigate('/register')
  }
  async function getLoginUsers(){
    let resp=await fetch("https://645e23db12e0a87ac0e89064.mockapi.io/users",{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept":'application/json'
      },
    });
    let data = await resp.json();
    setResult(data)
    console.log(data)
  }
async function Login() {
  let flag=false;
    console.warn(email,password);
    let item={email:email,password:password};
    for(let i=0;i<result?.length;i++){
     if(email==result[i]?.email && password==result[i]?.password){
      flag=true;
      break;
     }
  }
   console.warn("result",result)
  if(flag==true){
  navigate('/home')
  }else{
    console.warn("invalid credentials");
    alert("invalid login credentials");
    
  }
  localStorage.setItem("email",email);
  localStorage.setItem("password",password);
} 
  return (
    <div>
      <h1><center>Login Page</center></h1>
      <div className="col-sm-6 offset-sm-3">
        <input type="text" placeholder="email" 
        onChange={(e)=>setEmail(e.target.value)} 
        className="form-control" />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <input type="text" placeholder="password" 
        onChange={(e)=>setPassword(e.target.value)}
        className="form-control" />
      </div>
      <div className="col-sm-6 offset-sm-3">
        <button onClick={Login} className="login">Login</button>
      </div>
      <div className="col-sm-6 offset-sm-3">
        <button onClick={handleRegisterClick} className="login">New register</button>
      </div>
      <div>
        {/* <span>{loginFlag ? "":"invalid credential"}</span> */}
      </div>
    </div>
  )
}

export default Login;
