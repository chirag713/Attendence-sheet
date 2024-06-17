"use client"

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import ProfileCard from '../components/profilecard';
import TodaysAttendence from '../components/Today\'sAtetendence';

const Page = () => {

  return (
    <div className=' min-h-screen pb-2 color'>
      <Header />
      <ProfileCard/>
      <br /><br />
      <TodaysAttendence/>
      <br />
    </div>
  )
}

export default Page;
