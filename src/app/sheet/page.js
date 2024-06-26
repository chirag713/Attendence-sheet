"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Addtask } from '../services/taskservice';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

const Page = () => {
    const [formattedDate, setFormattedDate] = useState("");
    const [formattedTime, setFormattedTime] = useState("");

    const updateDateTime = () => {
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-IN', options);
        const parts = formatter.formatToParts(now);

        const dateParts = parts.filter(part => part.type !== 'literal').reduce((acc, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {});

        let formattedDat = `${dateParts.day}/${dateParts.month}/${dateParts.year}`;
        let formattedTim = `${dateParts.hour}:${dateParts.minute}:${dateParts.second} IST`;

        setFormattedDate(formattedDat);
        setFormattedTime(formattedTim);
    }

    useEffect(() => {
        const intervalId = setInterval(updateDateTime, 1000);
        updateDateTime();
        return () => clearInterval(intervalId);
    }, []);

    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        let userData = localStorage.getItem("username");
        if (userData) {
            try {
                userData = JSON.parse(userData);
                setUser(userData);
                setData(prevData => ({
                    ...prevData,
                    userId: userData._id
                }));
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
        event.preventDefault();

        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        if (hour < 18 || (hour === 19 && minute > 0) || hour > 19) {
            toast.warning("Task can only be added between 6 PM and 7 PM IST.", {
                position: "top-center"
            });
            return;
        }

        updateDateTime();

        if (!data.task) {
            toast.warning("Task field is required !!..", {
                position: "top-center"
            });
            return;
        }

        if (!data.details) {
            data.details = "...";
        }

        const newData = {
            ...data,
            addeddate: formattedDate // Set the formatted date here
        };

        console.log(newData);

        try {
            const result = await Addtask(newData);

            toast.success("Task created and saved !!..", {
                position: "top-center"
            });

            router.push("/profile");
        } catch (error) {
            toast.error("Something went wrong !!..", {
                position: "top-center"
            });
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col'>
            <Header  />
            <br />
            <div className='flex-grow  flex justify-center items-center'>
                <div className=' bg-blue-200 shadow-lg rounded-lg p-8 w-full max-w-xl'>
                    <h1 className='text-3xl text-center font-bold mb-4'>Update today's Attendance</h1>
                    <h2 className='text-center text-gray-600 mb-6'>{formattedDate} {formattedTime}</h2>
                    <form action="#" className='space-y-6' onSubmit={taskformsubmited}>
                        <div>
                            <label htmlFor="user_task" className='block mb-2 text-xl font-medium text-gray-700'>Task</label>
                            <textarea
                                className='w-full p-3 rounded-lg border border-gray-300 focus:ring color focus:ring-indigo-200 focus:border-indigo-500'
                                type="text"
                                placeholder="Enter your today's task"
                                id="user_task"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        task: event.target.value,
                                    })
                                }}
                                value={data.task}
                            />
                        </div>
                        <div>
                            <label htmlFor="user_details" className='block mb-2 text-xl font-medium text-gray-700'>Details</label>
                            <textarea
                                className='w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 color focus:border-indigo-500'
                                type="text"
                                placeholder="Enter details of today's task"
                                id="user_details"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        details: event.target.value,
                                    })
                                }}
                                value={data.details}
                            />
                        </div>
                        <div className='flex justify-center space-x-4'>
                            <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600'>Add task</button>
                            <button
                                type='button'
                                className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600'
                                onClick={() => {
                                    setData({
                                        task: "",
                                        details: "",
                                        userId: data.userId,
                                        addeddate: ""
                                    })
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <br />
        </div>
        
    )
}

export default Page;
