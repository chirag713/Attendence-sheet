"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { deletetaskcall, gettaskofuser } from '../services/taskservice';
import Taskcomponent from './Taskcomponent';
import { toast } from 'react-toastify';

const TodaysAttendence = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const gettask = async () => {
    try {
      const result = await gettaskofuser(user._id);
      setTasks(result);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    if (user) {
      gettask();
    }
  }, [user]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayFormatted = yesterday.toISOString().split('T')[0];
    const hasRelevantTask = tasks.some(task => task.addeddate === today || task.addeddate === yesterdayFormatted);
    setShow(hasRelevantTask);
  }, [tasks]);

  const check = (task) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const todayFormatted = formatDateToDDMMYYYY(today);
    const yesterdayFormatted = formatDateToDDMMYYYY(yesterday);

    return task.addeddate === todayFormatted || task.addeddate === yesterdayFormatted;
  };

  async function deletetaskparent(taskid) {
    try {
      await deletetaskcall(taskid);
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

  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const hasRelevantTask = tasks.some(check);
    setShow(hasRelevantTask);
  }, [tasks]);

  return (
    <div className='m-3 sm:grid sm:grid-cols-12'>
      <div className="lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-3 sm:col-span-10 sm:col-start-2">
        <h1 className='text-3xl mb-3 font-bold'>{show ? "Your Recent Work" : ""}</h1>
        {tasks.map((task) => (
          check(task) && (
              <Taskcomponent
                task={task}
                key={task._id}
                deletetaskparent={deletetaskparent}
              />
          )
        ))}
      </div>
    </div>
  );
};

export default TodaysAttendence;
