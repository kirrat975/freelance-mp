import {React ,useState,useEffect}from 'react'
import './Sellerdash.css';
import { Link,useNavigate} from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

import axios from 'axios';
function SellerDash() {
    const navigate=useNavigate();
    const [Suserdata, setSUserData] = useState([]);
    const { logOut, user } = useUserAuth();
    
   

    useEffect(() => {
        getProject();
      }, []);
    
      const getProject = async () => {
       
     
        await axios.get("http://localhost:9999/retrieveProjects/").then((response)=>{
            localStorage.setItem("projects",JSON.stringify(response.data))
           
            setSUserData(response.data);
        });
        
       
      };

      /*onClick={()=>{handleBid(data.buyerId,data.title,data.description,data.category,data.duration,data.price)}}
      const handleBid=async(buyerId,title,description,category,duration,price)=>{
        const seller=JSON.parse(localStorage.getItem("seller"));
        const sellerId=seller.map(x=>x._id);
       const regpro={
        title:title,
        description:description,
        category:category,
        price:price,
        duration:duration,
        buyerId:buyerId,
        sellerId:sellerId[0]

       }
       axios.post('http://localhost:9999/registerOrder',regpro).then((response)=>{
        console.log(response.data)
        alert("Order is created")
       })
      }*/
      const handleSLogout=async()=>{
        try {

            await logOut();
            localStorage.removeItem("seller");
            navigate("/home");
          } catch (error) {
            console.log(error.message);
          }
      }
     
      
  return (
   
    <div className='p-4'>
        <h1 id="sellh">Seller Dashboard</h1>
        <div>
       
        <header>
            <nav className='navbar'>
            <Link to="/"></Link>
            <ul>
                
                <li><button >Buyer Requests</button></li>
                <li><button >Orders</button></li>
                <li><button>Profile</button></li>
                <li><button onClick={()=>navigate('/set')}>Settings</button></li>
                <li><button onClick={()=>navigate('/bill')}>Billing</button></li>
                <li><button onClick={handleSLogout}>Logout</button></li>
             
            </ul>
            </nav>
        </header>
        </div>
        <div>
    
            <table className='tabpro'>
                <thead>
                    <tr>
                        <th>Buyer Id</th>
                        <th>Project Id</th>
                        <th>title</th>
                        <th>description</th>
                        <th>Category</th>
                        <th>Duration</th>
                        <th>Budget</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {Suserdata.map(data=>(
                       <tr>
                        <td >{data.buyerId}</td>
                        <td >{data._id}</td>
                        <td>{data.title}</td>
                        <td>{data.description}</td>
                        <td>{data.category}</td>
                        <td>{data.duration}</td>
                        <td>Rs.{data.price}</td>
                       <td><button id='bid'>BID</button></td>
                       </tr>


    ))}
   
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default SellerDash