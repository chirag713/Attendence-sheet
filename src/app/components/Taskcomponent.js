"use client"
import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { updatetasklike } from '../services/taskservice';
import { toast } from 'react-toastify';

const Taskcomponent = ({ task, deletetaskparent }) => {
    const [editing, setEditing] = useState(false);
    const [titl, setTitle] = useState(task.task);
    const [conten, setContent] = useState(task.details);
    const [tas, setTas] = useState({
        task: task.task,
        details: task.details,
    });
    const [isAllowed, setIsAllowed] = useState(false);

    const checkEditDeletePermission = () => {
        const now = new Date();
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
        const formatter = new Intl.DateTimeFormat('en-IN', options);
        const parts = formatter.formatToParts(now);
        const dateParts = parts.filter(part => part.type !== 'literal').reduce((acc, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {});
        const currentFormattedDate = `${dateParts.day}/${dateParts.month}/${dateParts.year}`;
        const currentHour = now.toLocaleString('en-IN', { hour: '2-digit', timeZone: 'Asia/Kolkata', hour12: false });

        const taskDate = task.addeddate.substring(0, 10);

        if (currentFormattedDate === taskDate && currentHour >= 18 && currentHour < 19) {
            setIsAllowed(true);
        } else {
            setIsAllowed(false);
        }
    };

    useEffect(() => {
        checkEditDeletePermission();
    }, []);

    const showedit = () => {
        if (isAllowed) {
            setEditing(!editing);
        } else {
            toast.warning("You can only edit or delete the task between 6 PM and 7 PM IST on the same day.", {
                position: "top-center",
            });
        }
    };

    const deletetask = () => {
        if (isAllowed) {
            deletetaskparent(task._id);
        } else {
            toast.warning("You can only edit or delete the task between 6 PM and 7 PM IST on the same day.", {
                position: "top-center",
            });
        }
    };

    const updatequestion = async () => {
        setContent(tas.details);
        setTitle(tas.task);
        await updatetasklike(task._id, tas);
        setEditing(false);
        toast.success("Task updated", {
            position: "top-center",
        });
    };

    return (
        <div className={` my-3 shadow-lg mb-1 rounded hoverable-div `} style={{ border: '1px solid black' }} >
            <div className='p-3'>
                <div className="flex justify-between">
                    <h1 className='text-2xl font-semibold'> Date: {task.addeddate.substring(0, 10)}</h1>
                    <div className="flex">
                        <span className='shadow-lg h-10 cursor-pointer rounded-full p-3 hover:bg-blue-400 mr-1' onClick={showedit}><MdEdit /></span>
                        <span className='shadow-lg h-10 cursor-pointer rounded-full p-3 hover:bg-blue-400' onClick={deletetask}><RxCross2 /></span>
                    </div>
                </div>
                <div className="flex justify-between mt-3">
                    <p className='font-bold'>Task: {titl}</p>
                </div>
                <div className="flex justify-between mt-3">
                    <p className='text-left font-semibold mb-2'> Detail: <span>{conten}</span></p>
                    <p className='text-right font-bold mb-2 pl-2'>Performance: <span>{task.score}</span></p>
                </div>
            </div>

            {editing && (
                <div>
                    <form className='pb-5'>
                        <div className="mt-4">
                            <label htmlFor="task_task" className='block mb-2 text-2xl'>Task</label>
                            <input type="text"
                                className='w-full p-3 rounded-full text-white bg-gray-800 focus:ring-gray-400 border border-gray-600'
                                id="task_task"
                                name="task_task"
                                placeholder='Give a Task'
                                onChange={(event) => {
                                    setTas({
                                        ...tas,
                                        task: event.target.value,
                                    })
                                }}
                                value={tas.task}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="task_content" className='block mb-2 text-2xl'>Details</label>
                            <textarea className='w-full p-3 rounded-2xl text-white bg-gray-800 focus:ring-gray-400 border border-gray-600'
                                id="task_detail"
                                rows={5}
                                name="task_detail"
                                placeholder='Enter your Description'
                                onChange={(event) => {
                                    setTas({
                                        ...tas,
                                        details: event.target.value,
                                    })
                                }}
                                value={tas.details}
                            />
                        </div>

                        <div className='mt-4 flex justify-center'>
                            <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={updatequestion}>Change Task</button>
                            <button type='button' className='text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                onClick={() => {
                                    setTas({
                                        task: task.task,
                                        details: task.details,
                                    })
                                }}
                            >Clear</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Taskcomponent;
