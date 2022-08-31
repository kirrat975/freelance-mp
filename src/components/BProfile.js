import React from 'react';
import Card from 'react-bootstrap/Card';
import buyer from '../buyer.jpg';
import './Buprofile.css';

function BProfile() {
    const buyerInfo=JSON.parse(localStorage.getItem('buyer'));
    console.log(buyerInfo);
  return (
    <div>
      <div className='p-2 '>
      <div className='bprof'>
      <h1 id='buid'>BUYER PROFILE</h1>
      {buyerInfo.map(buyerInfo=>(
                        <Card className='bcard' style={{ width: '600px'}} key={buyerInfo.id}>
      <Card.Img variant="top" src={buyer} width="150px" height="260px" />
      <Card.Body>
      <hr/>
        <Card.Title>
         <h1 id='bname'>User Name : {buyerInfo.name}</h1>
            
        </Card.Title>
        <Card.Text>
          <div>
          <table>
          <thead>
          <tr>
            <th>Email Address</th>
            <th>Mobile Number</th>
            <th>Residential Address</th>
            </tr>
          </thead>
            <tbody>
            <tr>
               <td><span>{buyerInfo.email}</span></td>
                <td> <span>{buyerInfo.phone}</span></td>
                <td><span>{buyerInfo.address}</span></td>
                </tr>
            </tbody>
          </table>

        
            
            
          </div>
        </Card.Text>
      
      </Card.Body>
    </Card>


    ))}
   
      </div>
      </div>
     
    </div>
  )
}

export default BProfile;