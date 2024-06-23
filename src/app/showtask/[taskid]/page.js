"use client";
import Taskcomponent from '@/app/components/Taskcomponent';
import Header from '@/app/components/header';
import { gettask } from '@/app/services/taskservice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const router = useRouter();
    const [id, setId] = useState("");
    const [task, setTask] = useState(null);

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const idFromUrl = pathSegments[pathSegments.length - 1];
        setId(idFromUrl);
    }, []);

    const showtask = async () => {
        try {
            const result = await gettask(id);
            setTask(result);
            console.log(result);
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    }

    useEffect(() => {
        if (id !== "") {
            showtask();
        }
    }, [id])

    return (
        <div className="p-5">
            <Header />
            <div>
                {task && (
                    <Taskcomponent
                        task={task}
                        key={task._id}
                    // deletetaskparent={deletetaskparent}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
