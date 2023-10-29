import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";
import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/navbar.js';


import {acceptRequest} from './api/api_endpoints.js';
import {createRequest} from './api/api_endpoints.js';
import Router from "next/router";


export default function submitreq() {
  const { isLoaded, isSignedIn, user } = useUser();
  //const { isLoaded, userId, sessionId, getToken } = useAuth();

    
  const onReqAdd = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send the input value to an API or perform some action)
    //console.log('Form submitted with value: ', e.target.take_id.value);
    //const formData = new FormData(event.currentTarget);
    createRequest(e.target.start.value, e.target.end.value, e.target.order_info.value, "open", e.target.dorm.value, user.firstName + " " + user.lastName);
    //Router.reload();
  };


  const onReqSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send the input value to an API or perform some action)
    //console.log('Form submitted with value: ', e.target.take_id.value);
    //const formData = new FormData(event.currentTarget);
    //createRequest(formData.id, formData.start, formData.end, formData.order_info, "active", formData.dorm, userId);
    acceptRequest(e.target.take_id.value, user.firstName + " " + user.lastName);
    //Router.reload();
  };
  
  return (
      <div>
        <Navbar></Navbar>
      <div style={{color: "#2B4468", padding: "20px", borderRadius: "10px", fontSize:"24px", marginBottom:"10px"}}>Submit req:

      <form onSubmit={onReqAdd}>
      Start: <input type="text" name="start" style={{backgroundColor:"#F2CAA9", borderRadius: "10px", marginLeft:"10px", marginBottom:"10px"}} /> <br></br>
      End: <input type="text" name="end" style={{backgroundColor:"#F2CAA9", borderRadius: "10px", marginLeft:"10px", marginBottom:"10px"}} /> <br></br>
      Order Info: <input type="text" name="order_info" style={{backgroundColor:"#F2CAA9", borderRadius: "10px", marginLeft:"10px", marginBottom:"10px"}} /> <br></br>
      Dorm: <input type="text" name="dorm" style={{backgroundColor:"#F2CAA9", borderRadius: "10px", marginLeft:"10px", marginBottom:"10px"}} /> <br></br>
      <button type="submit" style={{ backgroundColor: "#2B4468", color: "#ffffff", borderRadius: "5px", padding: "10px 20px", border: "none", marginBottom:"10px"}}>Submit</button> <br></br>
    </form>

      </div>
      <div style={{color: "#2B4468", padding: "20px", borderRadius: "10px", fontSize:"24px", marginBottom:"10px"}}>Take req:
      <form onSubmit={onReqSubmit}>
      ID: <input type="text" name="take_id" style={{backgroundColor:"#F2CAA9", borderRadius: "10px", marginLeft:"10px", marginBottom:"10px"}} /> <br></br>
      <button type="submit" style={{ backgroundColor: "#2B4468", color: "#ffffff", borderRadius: "5px", padding: "10px 20px", border: "none" }}>Submit</button> <br></br>
    </form>
      </div>
      
      </div>
      
    );
}