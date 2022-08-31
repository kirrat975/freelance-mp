import React,{useState,useEffect}from 'react';
import '../Join.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {  Alert } from "react-bootstrap";
import { Link,useNavigate} from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import axios from 'axios';
import signin from '../signin.jpg';
function Signin() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { logIn,passwordReset } = useUserAuth();

  const navigate = useNavigate();
  const buyer=JSON.parse(localStorage.getItem("buyer"));
  const buyeremail=buyer.map(x=>x.email);
  const seller=JSON.parse(localStorage.getItem("seller"));
  const selleremail=seller.map(x=>x.email);
   



  const handleBS = async (e) => {
    e.preventDefault();
    setError("");
    try {
    
      axios.get('http://localhost:9999/retrieveBuyer/'+email).then((res)=>{
        if(email===buyeremail[0])
        {
        localStorage.setItem("buyer",JSON.stringify(res.data))
        
        }
        else{
          alert('Incorrect email or password');
        }
     
    }
      
      )
    
      await logIn(email, password);
      navigate("/buyhp")
      
    } catch (err) {
      setError(err.message);
      alert("Incorrect email or password");
    }
    
  };
  const passreset = async (e) => {
    e.preventDefault();
    setError("");
    try {
      
      await passwordReset(email);
      navigate("/signin")
      
    } catch (err) {
      setError(err.message);
      
    }
    
  };

  const handleSS = async (e) => {
    e.preventDefault();
    setError("");
    try {
    
      axios.get('http://localhost:9999/retrieveSellers/'+email).then((res)=>{
        if(email===selleremail[0])
        {
          localStorage.setItem("seller",JSON.stringify(res.data))
        }
      
     
    }
      
      )
    
      await logIn(email, password);
      navigate("/selld")
      
    } catch (err) {
      setError(err.message);
    }
    
  };
  
  
  
  
  return (
   
    <div className='p-5'>
            <div className='bjcont'>
            <div className= "d-flex gap-3 m-5">
    
            <div>
              <img src={signin} width="600px" height="450px" className='sbs'/>
            </div>
            <div className= "col-sm-6 ">
            {error && <Alert variant="danger">{error}</Alert>}
            <form className="aform">
            <div>
            <h1 id='jhead'>Sign In</h1>
            </div>

        <div className="mb-3 p-3">
          <input type="email" className="form-control" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)}/>
        </div>


        <div className="mb-3 p-3">
          <input type="password" className="form-control" placeholder="Enter your password" required  onChange={(e) => setPassword(e.target.value)}/>
        </div>
       
        <div className="d-grid">
          
          
          <Button type="submit" onClick={handleBS} variant="default" className="subtn">
            Sign In As Buyer
          </Button>
          <Button type="submit" onClick={handleSS}  variant="default" className="subtn">
            Sign In As Seller
          </Button>
         
        </div>
        <p className="forgot-password text-center">
        <span> <input type="checkbox" style={{width:50}}/>
        Remember Me</span>&nbsp; &nbsp;<Button onClick={ passreset} variant="default" id="sibtn" >Forgot Password?</Button>
        </p>
        <footer>
       <p> Not a member yet? <Link to="/"><Button variant="default" id="jbtn" >Join Now</Button></Link>
        </p>
        </footer>
      </form>
      </div>
            </div>
            </div>
            </div>
            
        
  
   
  )
}

export default Signin;