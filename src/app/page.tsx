'use client'

import Image from "next/image";
import Dashboard from "@/app/components/dashboard1";

import { useState, useEffect } from 'react'
import QuestionSalesPortal from "@/app/components/page"

const Home = () => {




  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if the user is an admin
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    setIsAdmin(user.role === 'user')
  }, [])



  return (
    <div>
      <QuestionSalesPortal />
      {/*<Dashboard />  */}
      
      {/* Existing home dashboard content */}
      {isAdmin && <h1>For Administrative Roles Link</h1>}
    </div>
  );
};

export default Home;