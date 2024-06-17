
"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { deletetaskcall, gettaskofuser } from '../services/taskservice';
import Taskcomponent from './Taskcomponent';
import { toast } from 'react-toastify';

const Attendence = () => {



    const router = useRouter();
    const [user, setUser] = useState(null);

    const [tasks, setTasks] = useState([]);

    const gettask=async()=>{

        
        try {

            const result = await gettaskofuser(user._id);

            setTasks([...result]);

        } catch (error) {
            console.log(error);
        }
    }


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


    useEffect( () => {

        //fetch attendence of user


        if (user) {
            gettask();
        }


    }, [user])


    async function deletetaskparent(taskid){
        try {
            const response = await deletetaskcall(taskid);
            console.log(response);
            toast.success("Task successfully deleted", {
                position: "top-center",
            });
            // Reload tasks after deletion
            gettask();
        } catch (error) {
            console.log(error);
            toast.error("Error deleting task", {
                position: "top-center",
            });
        }
    }

    return (
        <div className='m-3 sm:grid sm:grid-cols-12  '>
            <div className="lg:col-span-6 lg:col-start-4  md:col-span-8 md:col-start-3 sm:col-span-10 sm:col-start-2  ">
                <h1 className='text-3xl mb-3 font-bold'>Your Sheet  ({tasks.length})</h1>
                {tasks.map((task) => (
                    <Taskcomponent task={task} key={task._id} deletetaskparent={deletetaskparent} />
                ))}
            </div>
        </div>
    )
}

export default Attendence
