"use client"
import React, { useEffect, useState } from 'react';
import Profileedit from '../components/Profileedit';
import AddImage from '../components/Addimage';
import { deleteObject, ref } from "firebase/storage";
import { imageDb } from '../components/Config';
import { toast } from 'react-toastify';
import { Updateuser } from '../services/userservice';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

const Page = () => {

    const router = useRouter();
    const [user, setUser] = useState('');

    const [data, setData] = useState({
        profileurl: ""
    });

    useEffect(() => {
        let userData = localStorage.getItem("username");
        if (userData) {
            try {
                userData = JSON.parse(userData);
                setUser(userData);
            } catch (e) {
                console.error("Error parsing JSON from localStorage", e);
            }
        }else{
            router.push("/");
        }
    }, []);

    const deleteImage = async () => {
        if (user?.profileurl) {
            const imageRef = ref(imageDb, user.profileurl);
            try {
                await deleteObject(imageRef);

                const result = await Updateuser(user?._id, data);

                delete result.password;

                localStorage.setItem('username', JSON.stringify(result));
                setUser(result);

                toast.success("Image Deleted successfully!", {
                    position: "top-center"
                });

            } catch (error) {
                console.error("Error deleting image: ", error);
                toast.error("Error deleting image!", {
                    position: "top-center"
                });
            }
        }
    }

    return (
        <div >
            <Header/>
            <br />
            <Profileedit />
            <div className="mt-5">
                {
                    user?.profileurl ? (
                        <button className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={deleteImage}>Delete Image</button>
                    ) : (
                        <AddImage />
                    )}
            </div>
        </div>
    );
}

export default Page;
