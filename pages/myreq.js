import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";
import { useUser } from '@clerk/clerk-react';
import { getAuth } from "@clerk/nextjs/server"; 
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Navbar from '../components/navbar.js';

import Router from "next/router";
import React, { useState } from 'react';

import {finishRequest} from './api/api_endpoints.js';

import {fetchRequests, getRequestsByRequester} from './api/api_endpoints.js';
import { Button } from '@chakra-ui/react';



// export async function getServerSideProps() {
//     const orders_data = await getRequests();
//     const req_data = await getRequestsByRequester();

//     return {
//       props: {
//         orders_data,
//         req_data
//       },
//     };
//   }

import Clerk from '@clerk/clerk-react';


export async function getStaticProps() {
  let orders_data_val = await fetchRequests();
  let req_data_val = await getRequestsByRequester();
  // console.log("Testing", orders_data_val);
  // process.env.USERNAME = "Testing";
  // console.log("Test");
  // console.log(orders_data_val)

 
  return {
    props: {
      orders_data_val: orders_data_val,
      req_data_val : req_data_val
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 4, // In seconds
  }
}


// async function update(name){
//   orders_data_val = await getRequests("ayush");
//   req_data_val = await getRequestsByRequester("akhil");
// }


export default function myreq({curr_name="", orders_data_val, req_data_val}) {
  const { isLoaded, isSignedIn, user } = useUser();
  // const [orders_data_val, set_orders_data] = useState(orders_data);
  // const [req_data_val, set_req_data] = useState(orders_data);
  //const [curr_name, set_name] = useState(name);
  //let name = "";
  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    margin: "1rem 0",
  };
  
    return (
        <div>
          <Navbar></Navbar>
          <Box width="100%" bg="gray.100">
          <h2 style={headingStyle}>Orders:</h2>
      
          <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th fontSize="lg" fontWeight="bold" textAlign="center">User ID</Th>
            <Th fontSize="lg" fontWeight="bold" textAlign="center">start</Th>
            <Th fontSize="lg" fontWeight="bold" textAlign="center">End</Th>
            <Th fontSize="lg" fontWeight="bold" textAlign="center">Requestor</Th>
            <Th fontSize="lg" fontWeight="bold" textAlign="center">Deliverer</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders_data_val.map((post) => (
            <Tr key={post.i}>
              <Td textAlign="center">{post.id}</Td>
              <Td textAlign="center">{post.start}</Td>
              <Td textAlign="center">{post.end}</Td>
              <Td textAlign="center">{post.requester}</Td>
              <Td textAlign="center">{post.deliverer}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      
      
      {/* <div>Orders I'm Taking:
        {orders_data_val.map((post) => {
              return (
                <div key={post.id}>
                  <p>{post.id}</p>
                  <p>{post.start}</p><p>{post.end}</p>
                <p>{post.requester}</p>
                <p>{post.deliverer}</p>
                </div>
            ) 
        })}
      </div> */}

      {/* </div> */}
      </Box>
      </div>
    );
}