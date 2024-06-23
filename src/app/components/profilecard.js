"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/ProfileCard.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import avatar from "../img/avatar.jpg";
import { Updateuser } from '../services/userservice';

const ProfileCard = () => {


  const router = useRouter();
  const [user, setUser] = useState(null);
  const [imageUpdated, setImageUpdated] = useState(false);

  const [data, setData] = useState({
    profileurl: ""
  });


  const updateUserUrl = async () => {
    try {
      const result = await Updateuser(user?._id, data);

      delete result.password;

      localStorage.setItem('username', JSON.stringify(result));
      onchangeimage(true);
    } catch (error) {

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
    setImageUpdated(false);
  }, [imageUpdated])

  const onchangeimage = (x) => {
    setImageUpdated(x);
  }

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <div className={styles.cardBorders}>
          <div className={styles.borderTop}></div>
          <div className={styles.borderRight}></div>
          <div className={styles.borderBottom}></div>
          <div className={styles.borderLeft}></div>
        </div>
        <div className={styles.cardContent}>
          {
            user?.profileurl ? <img src={user.profileurl} className={styles.avatar} alt="Avatar" /> : <Image className={styles.avatar} alt="Avatar" src={avatar} />
          }
          <p className={styles.username}>{user?.name || "No user found"} </p>
          <p className={styles.designation}>{user?.role || "Add Your Role"}</p>
          <p className={styles.bio}>Joining Date: {user?.joiningdate || "Add your Joining date"}</p>
          <p className={styles.bio}>Unique ID: {user?._id}</p>
          <p className={`${styles.sheet} bg-red-800`} onClick={() => router.push("/showattendence")}>Show Total Sheet</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
