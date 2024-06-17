// components/Header.js
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
// import logo from "../Assets/logo.png";
import { IoIosClose } from "react-icons/io";
import { HiBars3 } from "react-icons/hi2";

import styles from "../styles/navbar.module.css";
import { useRouter } from 'next/navigation';

const Header = () => {


    const router = useRouter();
    const [navActive, setNavActive] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [login, setlogin] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        let userData = localStorage.getItem("username");
        if (userData) {
            setlogin(true);
        } else {
            setlogin(false)
            router.push("/");
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("username");
        setlogin(false)
        router.push("/");
    }

    const handleNavToggle = () => setNavActive(!navActive);

    return (
        <>
            <header className={`${scrolling ? styles.scrolling : ""} ${styles.header}`}  >
                <a href="#">
                    <Image className={styles.logo} src="" alt='BasicBrush Studios Logo' />
                </a>
                <div>
                    <ul className={`${styles.navbar} ${navActive ? styles.active : ''}`}>


                        {
                            login ? <li onClick={() => router.push("/profile")}>Profile</li> : <li onClick={() => router.push("/")}>Login</li>
                        }
                        {
                            login ? <li onClick={() => router.push("/sheet")}>Sheet</li> : <li></li>
                        }
                        {
                            login ? <li onClick={logout}>Logout</li> : <li></li>
                        }

                        <a href="#" onClick={handleNavToggle} className={styles.close}>
                            <div className="bg-red-700 rounded-full p-1 w-7 h-7 flex items-center justify-center">
                                <IoIosClose className="text-white" />
                            </div>
                        </a>
                    </ul>
                </div>
                <div className={styles.mobile}>
                    <i><HiBars3 id={styles.bar} onClick={handleNavToggle} /></i>
                </div>
            </header>
        </>
    );
};

export default Header;
