"use client"
import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { updatetasklike } from '../services/taskservice';
import { toast } from 'react-toastify';

const Taskcomponent = ({ task, deletetaskparent }) => {

    const [editing, setEditing] = useState(false);

    function showedit(taskid) {
        setEditing(!editing);
    }

    function deletetask(taskid) {
        console.log(taskid);
        deletetaskparent(taskid);

    }

    const [titl, settitle] = useState(task.task);
    const [conten, setcontent] = useState(task.details);

    async function updatequestion() {
        setcontent(tas.details);
        settitle(tas.task);
        await updatetasklike(task._id , tas);
        setEditing(false);
        toast.success("Task updated", {
            position: "top-center",
        })

        console.log("helo");
    }

    const [tas, setTas] = useState({
        task: task.task,
        details: task.details,
        // userId: "660fe19e3e4e313bfc8970a2",
    });
    return (
        <div className={`bg-gray-200 my-3  shadow-lg mb-1 rounded `}>
            <div className='p-3  '>
                <div className="flex justify-between">
                    <h1 className='text-2xl font-semibold '> Date : {task.addeddate.substring(0, 10)}</h1>
                    <div className="flex">
                        <span className=' shadow-lg h-10  cursor-pointer rounded-full p-3 hover:bg-gray-400 mr-1 ' onClick={() => showedit(task._id)} ><MdEdit /></span>

                        <span className=' shadow-lg h-10 cursor-pointer rounded-full p-3 hover:bg-gray-400 ' onClick={() => deletetask(task._id)} ><RxCross2 /></span>

                    </div>
                </div>
                <div className="flex justify-between mt-3">
                    <p className='font-bold'>Task : {titl}</p>

                </div>
                <div className="flex justify-between mt-3">
                    <p className='text-left font-semibold mb-2'>  Detail : <span>{conten}</span></p>
                    <p className='text-right font-bold mb-2 pl-2'>Performance : <span>{task.score}</span></p>
                </div>
            </div>

            {editing ?
                <div>
                    <form action="#" className='pb-5' >
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
                            <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={() => updatequestion(task._id, tas)} >Change Task </button>
                            <button type='button' className='text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                onClick={(event) => {
                                    setTas({
                                        task: task.task,
                                        details: task.details,
                                    })
                                }}
                                value={tas.status}>Clear</button>
                        </div>

                        {/* {JSON.stringify(tas)} */}
                    </form>
                </div>
                : ""}
        </div>
    )
}

export default Taskcomponent
