import Link from 'next/link';

import Navbar from '../components/navbar.js';

import Map from '../components/map.js';
import { UserButton } from "@clerk/nextjs";




export default function Home() {
  
  const position = [51.505, -0.09];
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  
  return (
    <div>
      <Navbar/>
      <UserButton afterSignOutUrl="/"/>
      <Link href="/map">Map</Link>
      <Link href="/leaderboard">Leaderboard</Link>
      <Link href="/submitreq">Submit Request</Link>
      <Link href="/myreq">My Requests</Link>

    </div>
  );
}


