"use client";
import React, { useState } from 'react'

import Header from '../components/header';
import Passwordupdate from '../components/passwordchange';



const page = () => {

    const [changed, setchanged] = useState(true)
    return (
        <div className='color min-h-screen'>

            <Header />
            <br />

            <Passwordupdate/>
            
        </div>
    )
}

export default page
