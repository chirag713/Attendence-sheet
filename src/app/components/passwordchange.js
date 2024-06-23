import React, { useEffect, useState } from 'react';
import { Updateuser, passchange } from '../services/userservice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Passwordupdate = () => {

  const router = useRouter();
  const [data, setData] = useState({
    currentpassword: "",
    newPassword: "", // Include newPassword in the data state
  });
  const [user, setUser] = useState(null);
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await passchange(user?._id, data);
      if (result.password === data.currentpassword) {
        setShowNewPasswordFields(true);
      } else {
        toast.error("Password is incorrect", {
          position: 'top-center'
        });
      }
    } catch (error) {
      console.log(error);
    }
    console.log('Current Password:', data.currentpassword);
  };

  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();
    if (data.newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match", {
        position: 'top-center'
      });
      return;
    }
    try {

      const result = Updateuser(user?._id, data);

      // Call your API service to update the password
      // Example: const updateResult = await updatePassword(user?._id, data.newPassword);

      // Assuming the update was successful, show success message
      toast.success("Password updated successfully", {
        position: 'top-center'
      });


      localStorage.removeItem("username");

      router.push("/profile");

      // Reset states
      setData({ ...data, currentpassword: "", newPassword: "" });
      setShowNewPasswordFields(false);
      setConfirmNewPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password", {
        position: 'top-center'
      });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, currentpassword: e.target.value });
  };

  const handleNewPasswordChange = (e) => {
    setData({ ...data, newPassword: e.target.value });
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={showNewPasswordFields ? handleNewPasswordSubmit : handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <label className="block mb-4">
          <span className="text-gray-700">Current Password:</span>
          <input
            type="password"
            value={data.currentpassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>

        {showNewPasswordFields && (
          <>
            <label className="block mb-4">
              <span className="text-gray-700">New Password:</span>
              <input
                type="password"
                value={data.newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Confirm New Password:</span>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {showNewPasswordFields ? "Update Password" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Passwordupdate;
