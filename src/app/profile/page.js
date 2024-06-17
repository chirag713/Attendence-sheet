"use client"

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { useRouter } from 'next/navigation';
import Attendence from '../components/attendence';

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let userData = localStorage.getItem("username");
    if (userData) {
      try {
        userData = JSON.parse(userData);
        setUser(userData);
      } catch (e) {
        console.error("Error parsing JSON from localStorage", e);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const gotosheet = () => {
    router.push("/sheet");
  }

  return (
    <div className=' bg-gray-300'>
      <Header />
      <div className="sm:grid sm:grid-cols-12 font-bold text-xl ">
        <div className="lg:col-span-6 lg:col-start-4  md:col-span-8 md:col-start-3 sm:col-span-10 sm:col-start-2  ">
          <h1 className='m-2'>Name: {user?.name || "No user found"}</h1>
          <h1 className='m-2'>Role: {user?.role || "Add your role"}</h1>
          <h1 className='m-2'>Joining Date: {user?.joiningdate || "Add your Joining date"}</h1>
          <h1 className='m-2'>Unique ID: {user?._id}</h1>
          <button className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 m-2' onClick={gotosheet}>Add today's attendance</button>
        </div>
      </div>
      <br /><br />
      <Attendence />
    </div>
  )
}

export default Page;
