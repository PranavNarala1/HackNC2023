import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Navbar from '../components/navbar.js';


import {fetchLeaderboard} from './api/api_endpoints.js';

import React, { useState, useEffect } from "react";


//leaderboard_results = await fetchLeaderboard();
// console.log(leaderboard_results)

let called = false;

export async function getServerSideProps() {
    const data = await fetchLeaderboard();
  
    return {
      props: {
        data,
      },
    };
  }



// export default function leaderboard({data}) {
//   const { isLoaded, userId, sessionId, getToken } = useAuth();
  
//     return (
//       <div>Leaderboard
//         {data.map((post) => {
//             return (
//                 <div key={post.i}><p>{post.n}</p><p>{post.p}</p></div>
//             )
//         })}
//       </div>
      
//     );
// }

export default function Leaderboard({ data }) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

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
      <h2 style={headingStyle}>Leaderboard</h2>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th fontSize="lg" fontWeight="bold" textAlign="center">User</Th>
            <Th fontSize="lg" fontWeight="bold" textAlign="center">Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((post) => (
            <Tr key={post.i}>
              <Td textAlign="center">{post.n}</Td>
              <Td textAlign="center">{post.p}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
    </div>
  );
}




