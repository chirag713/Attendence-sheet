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
            addeddate: `${formattedDate} ${formattedTime}`
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
        <div>
            <Header />

            <div className='flex justify-center'>
                <h1>
                    {formattedDate} {formattedTime}
                </h1>
                <div className='py-5 ali min-w-[70vw] max-w-[800px] px-10 sm:px-5'>
                    <h1 className='text-3xl text-center'>Update today's Attendance</h1>
                    <form action="#" className='mt-5' onSubmit={taskformsubmited}>
                        <div className='mt-3'>
                            <label htmlFor="user_task" className='block mb-2 text-2xl font-medium'>Task</label>
                            <textarea className='w-full p-3 rounded-3xl ps-2 text-white bg-gray-800 focus:ring-gray-400 border border-gray-600'
                                type="text"
                                placeholder="Enter your today\'s task"
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
                        <div className='mt-3'>
                            <label htmlFor="user_details" className='block mb-2 text-2xl font-medium'>Details</label>
                            <textarea className='w-full p-3 rounded-3xl ps-2 text-white bg-gray-800 focus:ring-gray-400 border border-gray-600'
                                type="text"
                                placeholder="Enter details of today\'s task"
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
                        <div className='mt-4 flex justify-center'>
                            <button type='submit' className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800'>Add task</button>
                            <button type='button' className='bg-red-600 ms-3 py-2 px-3 rounded-lg hover:bg-red-800'
                                onClick={() => {
                                    setData({
                                        task: "",
                                        details: "",
                                        userId: data.userId,
                                        addeddate: ""
                                    })
                                }}
                            >Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page;
