"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Updateusername } from '../services/userservice';
import { toast } from 'react-toastify';

const Profileedit = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [data, setData] = useState({
        name: ""
    });

    useEffect(() => {
        let userData = localStorage.getItem("username");
        if (userData) {
            try {
                userData = JSON.parse(userData);
                setUser(userData);
                setData({ name: userData.name }); // Set initial name from user data
            } catch (e) {
                console.error("Error parsing JSON from localStorage", e);
            }
        }
    }, []);

    const handleNameChange = (event) => {
        setData({
            name: event.target.value
        }); // Update name state on input change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (data.name === "") {
            toast.warning("Name can't be empty", {
                position: "top-center"
            });
            return;
        }
        
        try {
            await Updateusername(user._id, data);
            const updatedUser = { ...user, name: data.name };
            localStorage.setItem('username', JSON.stringify(updatedUser));
            toast.success("User updated successfully", {
                position: "top-center"
            });
            router.push("/profile");
        } catch (error) {
            console.error("Error updating user: ", error);
            toast.error("Error updating user!", {
                position: "top-center"
            });
        }
    };

    const handleReset = () => {
        setData({ name: user.name });
    };

    const handleChangePassword = () => {
        router.push("/changepassword");
    };

    if (!user) {
        return <div>Loading...</div>; // Handle case where user data is not yet loaded
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={handleNameChange}
                        className="w-full p-3 rounded-lg text-gray-800 border border-gray-400 focus:outline-none focus:border-gray-600"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded m-2 hover:bg-blue-600 ">Save</button>
                <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded m-2 hover:bg-gray-600 " onClick={handleReset}>Reset</button>
                <button type="button" className="bg-red-500 text-white py-2 px-4 rounded m-2 hover:bg-red-600" onClick={handleChangePassword}>Change Password</button>
            </form>
        </div>
    );
}

export default Profileedit;
