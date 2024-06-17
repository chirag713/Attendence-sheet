"use client";
import SignForm from "./components/signin";
import Header from "./components/header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import ProfileCard from "./components/profilecard";

export default function Home() {


  const router = useRouter();
  useEffect(() => {
    let userData = localStorage.getItem("username");
    if (userData) {
      router.push("/profile");
    }
  }, [router]);

  return (
    <main >
      <Header />
      <div className="flex justify-center py-10">
        <SignForm />
      </div>
      {/* <ProfileCard/> */}
    </main>
  );
}
