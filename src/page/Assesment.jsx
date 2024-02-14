import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Assesment = () => {
    const [userData, setUserData] = useState({})
    useEffect( () => {
        const fetchData =async () => {
            try{
                const data = await axios.get("https://randomuser.me/api/?page=1&results=1&seed=abc");
                setUserData(data.data);
            }   
            catch(err){
                toast.error(err.message)
            }
        }

        fetchData();
    }, [])
    console.log(userData?.results)

    let formattedDate = "";


    if(userData && userData.results && userData.results[0]){
        const dob = userData?.results[0]?.dob?.date;
        formattedDate = new Date(dob).toLocaleDateString();
    }
  return (
    <div className='flex flex-row justify-center items-center m-[100px]'>
        {userData && userData.results && userData.results[0] ? (

        <div className="max-w-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center p-5 justify-center">
            <a href="#">
                <img className="rounded-md justify-center items-center" 
                src={userData?.results[0]?.picture?.large} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white flex flex-row gap-5">
                    {`Name: 
                    ${userData?.results[0]?.name.title} 
                    ${userData?.results[0]?.name.first}
                    ${userData?.results[0]?.name.last}
                    `
                    }
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {`Username: ${userData?.results[0]?.login.username}`}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Gender: 
                {` ${userData?.results[0]?.gender}`}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
                Email: 
                {` ${userData?.results[0]?.email}`}</p>
                <p className="mb-3 text-gray-900 font-extrabold dark:text-gray-400">
                {`DOB: ${formattedDate}`}</p>
                <Link 
                to={"/"}
                 href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ">
                    Go Back
                    <svg className="rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
        ): <div>
                <h1>Loading...</h1>
        </div>}
        <Toaster />
    </div>
  )
}

export default Assesment