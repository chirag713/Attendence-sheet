"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Addtask } from '../services/taskservice';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

const page = () => {

    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        let userData = localStorage.getItem("username");
        if (userData) {
            try {
                userData = JSON.parse(userData);
                setUser(userData);

                data.userId=(userData._id)
            } catch (e) {
                console.error("Error parsing JSON from localStorage", e);
            }
        } else {
            router.push("/");
        }
    }, [router]);

    const [data, setData] = useState({
        task: "",
        details: "",
        userId: "",
        addeddate: ""
    });

    const taskformsubmited = async (event) => {

        // console.log(new Date(Date.now()));
        event.preventDefault();


        if (data.task === "" || data.task === null) {
            toast.warning("Task field is required !!..", {
                position: "top-center"
            });
            return;
        }

        if (data.details === "" || data.details === null) {
            data.details = "..."
        }

        try {
            const response = await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data_temp = await response.json();
            console.log("Current global time (UTC):", data_temp.utc_datetime);

            data.addeddate = data_temp.utc_datetime

        } catch (error) {
            toast.warning("Error in fetching or processing data !!..", {
                position: "top-center"
            });
            return;
        }



        try {
            const result = await Addtask(data);
            toast.success("Task created saved !!..", {
                position: "top-center"
            });

            router.push("/profile")

        } catch (error) {
            toast.error("Something went wrong !!..", {
                position: "top-center"
            });
        }

    }
    return (
        <div >

            <Header/>


            <div className='flex justify-center '>
                <div className='py-5 ali  min-w-[70vw] max-w-[800px] px-10  sm:px-5 ' >
                    <h1 className='text-3xl text-center'>Update today's Attendence</h1>
                    <form action="#" className='mt-5' onSubmit={taskformsubmited} >
                        <div className='mt-3'>
                            <label htmlFor="user_task" className='block mb-2 text-2xl font-medium'>Task</label>
                            <textarea className='w-full p-3 rounded-3xl ps-2  text-white bg-gray-800 focus:ring-gray-400 border border-gray-600' type="text" placeholder='Enter your todays task ' id="user_task"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        task: event.target.value,
                                    })
                                }}
                                value={data.task}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="user_details" className='block mb-2 text-2xl font-medium'>Details</label>
                            <textarea className='w-full p-3 rounded-3xl ps-2  text-white bg-gray-800 focus:ring-gray-400 border border-gray-600' type="text" placeholder='Enter Details of todays task ' id="user_details"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        details: event.target.value,
                                    })
                                }}
                                value={data.details}
                            />
                        </div>
                        <div className='mt-4 flex justify-center'>
                            <button type='submit' className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800' >Add task </button>
                            <button type='button' className='bg-red-600 ms-3 py-2 px-3 rounded-lg hover:bg-red-800'
                                onClick={(event) => {
                                    setData({
                                        task: "",
                                        details: "",
                                    })
                                }}
                                value={data.status}

                            >Reset</button>
                        </div>
                        {/* {JSON.stringify(data)}; */}
                    </form>
                </div>
            </div>

        </div>
    )
}

export default page
