
// "use client";

// import React, { useState } from 'react';
// import styles from '../styles/SignForm.module.css';
// import { toast } from 'react-toastify';
// import { Loginuser } from '../services/userservice';
// import { useRouter } from 'next/navigation';




// const SignForm = () => {

//     const router = useRouter();
//     const [isSignUp, setIsSignUp] = useState(false);

//     const [passchange, setpasschange] = useState(false);

//     const [logindata, setloginData] = useState({
//         email: "",
//         password: "",
//     });


//     const [recipient, setRecipient] = useState('');
//     const [subject, setSubject] = useState('Forget Password OTP');
//     const [message, setMessage] = useState('');



//     const submitlogindata = async (e) => {
//         e.preventDefault();

//         if (logindata.email === "" || logindata.email === null) {
//             toast.warning("Email field is required !!..", {
//                 position: "top-center"
//             });
//             return;
//         }

//         if (logindata.password === "" || logindata.password === null) {
//             toast.warning("Password field is required !!..", {
//                 position: "top-center"
//             });
//             return;
//         }

//         try {
//             let result = await Loginuser(logindata);
//             toast.success("User logged successfully !!..", {
//                 position: "top-center"
//             });
//             delete result.user.password;
//             // console.log(result.user);
//             localStorage.setItem('username', JSON.stringify(result.user));
//             router.push("/profile");
//         } catch (error) {
//             console.log(error);
//             toast.error("Something went wrong !!..", {
//                 position: "top-center"
//             });
//         }
//     }

//     const changepassword = () => {
//         setpasschange(true);
//         setloginData({
//             email: "",
//             password: "",
//         })
//     }


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // setStatus('Sending...');

//         // const res = await fetch('/api/sendEmail', {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //   },
//         //   body: JSON.stringify({ recipient, subject, text: message }),
//         // });

//         // const data = await res.json();
//         // if (res.status === 200) {
//         //   setStatus('Email sent successfully');
//         // } else {
//         //   setStatus(`Error: ${data.message}`);
//         // }
//     };

//     const sendotptouser = (e) => {
//         e.preventDefault();
//         console.log(logindata.email);
//         let otprandom = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
//         console.log(otprandom);
//         setMessage(`Your OTP is ${otprandom}`);
//         setRecipient(logindata.email);
//         handleSubmit();
//     }

//     return (
//         <div className={`m-2 ${styles.wrapper} ${isSignUp ? styles.animateSignUp : styles.animateSignIn}`} >

//             <div className={`${styles.formWrapper} ${styles.signIn}`}>
//                 <form>
//                     {
//                         !passchange ?
//                             <h2>Login</h2> :
//                             <h2>Change Password</h2>
//                     }
//                     <div className={styles.inputGroup}>
//                         <input type="email" required

//                             onChange={(event) => {
//                                 setloginData({
//                                     ...logindata,
//                                     email: event.target.value,
//                                 })
//                             }}
//                             value={logindata.email}

//                         />

//                         <label>Email</label>
//                     </div>
//                     <div className={styles.inputGroup}>
//                         {
//                             !passchange ?
//                                 <>
//                                     <input type="password" required

//                                         onChange={(event) => {
//                                             setloginData({
//                                                 ...logindata,
//                                                 password: event.target.value,
//                                             })
//                                         }}
//                                         value={logindata.password}
//                                     />
//                                     <label>Password</label>
//                                 </> :
//                                 ""
//                         }
//                     </div>
//                     {
//                         !passchange ?
//                             <div className={styles.forgotPass}>
//                                 <a href="#" onClick={changepassword}>Forgot Password?</a>
//                             </div> :
//                             ""
//                     }

//                     {
//                         !passchange ?
//                             <button onClick={submitlogindata} className={styles.btn}>Login</button> :
//                             <button onClick={sendotptouser} className={styles.btn}>Send otp</button>
//                     }

//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignForm;




"use client";

import React, { useState } from 'react';
import styles from '../styles/SignForm.module.css';
import { toast } from 'react-toastify';
import { Loginuser } from '../services/userservice';
import { useRouter } from 'next/navigation';




const SignForm = () => {

    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);

    const [logindata, setloginData] = useState({
        email: "",
        password: "",
    });



    const submitlogindata = async (e) => {
        e.preventDefault();

        if (logindata.email === "" || logindata.email === null) {
            toast.warning("Email field is required !!..", {
                position: "top-center"
            });
            return;
        }

        if (logindata.password === "" || logindata.password === null) {
            toast.warning("Password field is required !!..", {
                position: "top-center"
            });
            return;
        }

        try {
            let result = await Loginuser(logindata);
            toast.success("User logged successfully !!..", {
                position: "top-center"
            });
            delete result.user.password;
            // console.log(result.user);
            localStorage.setItem('username', JSON.stringify(result.user));
            router.push("/profile");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !!..", {
                position: "top-center"
            });
        }
    }
    
    return (
        <div className={`m-2 ${styles.wrapper} ${isSignUp ? styles.animateSignUp : styles.animateSignIn}`} >

            <div className={`${styles.formWrapper} ${styles.signIn}`}>
                <form>
                    <h2>Login</h2>
                    <div className={styles.inputGroup}>
                        <input type="email" required

                            onChange={(event) => {
                                setloginData({
                                    ...logindata,
                                    email: event.target.value,
                                })
                            }}
                            value={logindata.email}

                        />
                        <label>Email</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="password" required

                            onChange={(event) => {
                                setloginData({
                                    ...logindata,
                                    password: event.target.value,
                                })
                            }}
                            value={logindata.password}
                        />
                        <label>Password</label>
                    </div>
                    {/* <div className={styles.forgotPass}>
                        <a href="#">Forgot Password?</a>
                    </div> */}
                    <button onClick={submitlogindata} className={styles.btn}>Login</button>
                    <div className={styles.signLink}>
                        <br />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignForm;