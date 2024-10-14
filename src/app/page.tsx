'use client'

import Image from "next/image";
import Dashboard from "@/app/components/dashboard";

import { useState, useEffect } from 'react'
import { AdminDashboardWrapper } from "@/app/components/integrated-admin-dashboard"

const Home = () => {

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if the user is an admin
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    setIsAdmin(user.role === 'admin')
  }, [])



  return (
    <div>
      <Dashboard />
      
      {/* Existing home dashboard content */}
      {isAdmin && <AdminDashboardWrapper />}
    </div>
  );
};

export default Home;