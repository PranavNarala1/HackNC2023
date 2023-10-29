import Link from 'next/link';

import Navbar from '../components/navbar.js';
import { Flex, Box} from "@chakra-ui/react";

import Map from '../components/map.js';
import { UserButton } from "@clerk/nextjs";


import { useUser } from '@clerk/clerk-react';


export default function Home() {
  const position = [51.505, -0.09];
  const AnyReactComponent = ({ text }) => <div>{text}</div>;


  
  return (
    <div>
      <Navbar/>
      <Flex flexDirection="column" minHeight="75vh" bg="#F0EBD8"></Flex>
      {/* <UserButton afterSignOutUrl="/"/>
      <Link href="/map">Map</Link>
      <Link href="/leaderboard">Leaderboard</Link>
      <Link href="/submitreq">Submit Request</Link>
      <Link href="/myreq">My Requests</Link> */}

    </div>
  );
}


