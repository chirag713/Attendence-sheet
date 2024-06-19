"use client";

import React, { useEffect, useState } from 'react';
import { imageDb } from './Config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Updateuser } from '../services/userservice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AddImage = ({onchangeimage}) => {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");
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
        }
    }, []);

    const handleChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage && selectedImage.size > 1024 * 1024) { // 1MB = 1024 * 1024 bytes
            setError("File size should be less than 1MB");
            setImage(null);
        } else {
            setError("");
            setImage(selectedImage);
        }
    }

    const addImage = (e) => {
        e.preventDefault();

        if (image == null) {
            return;
        }

        const imgRef = ref(imageDb, `Files/${v4()}`);

        uploadBytes(imgRef, image)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .then((url) => {
                setImageURL(url);
                setData((prevData) => ({
                    ...prevData,
                    profileurl: url
                }));
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
            });
    }

    

    const updateUserUrl = async () => {
        try {
            const result = await Updateuser(user?._id, data);
            toast.success("User updated successfully!", {
                position: "top-center"
            });

            delete result.password;

            localStorage.setItem('username', JSON.stringify(result));
            onchangeimage(true);
        } catch (error) {
            toast.error("Something went wrong!", {
                position: "top-center"
            });
        }
    }

    useEffect(() => {
        if (imageURL) {
            updateUserUrl();
        }
    }, [imageURL]);

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
            <form>
                <input
                    type="file"
                    accept='image/*'
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-violet-50 file:text-violet-700
                               hover:file:bg-violet-100"
                />
                <button
                    onClick={addImage}
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    Add Image
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {/* {imageURL && (
                <div className="mt-4">
                    <p>Image URL: <a href={imageURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{imageURL}</a></p>
                    <button
                        onClick={deleteImage}
                        className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                        Delete Image
                    </button>
                </div>
            )} */}
        </div>
    )
}

export default AddImage;
