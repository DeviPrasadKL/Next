"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function page({ params }) {
  console.log(params.id);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`https://main.d36k059eagzoi1.amplifyapp.com/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
  }, [])

  if (data.length == 0) {
    return (
      <div className='flex items-center justify-center h-screen w-full'>11-
        <h1>Loading.............</h1>
      </div>
    )
  } else {
    return (
      <div className='flex items-center justify-center h-screen w-full'>
        <div className='border-2 p-4 rounded-lg'>
          <h1>Tittle:- {data.title}</h1>
          <h1>Desc:- {data.desc}</h1>
          <h1>Date:- {data.date.split("T")[0]}</h1>
          <h1>Time:- {data.date.split("T")[1].split(".")[0]}</h1>
          <div className='flex items-center justify-center gap-4 p-2'>
            <Link href="/crud">
              <button type='button' className='py-2 px-6 rounded-lg bg-blue-900 hover:bg-blue-700'>Back</button>
            </Link>
            <Link href="/">
              <button type='button' className='py-2 px-6 rounded-lg bg-blue-900 hover:bg-blue-700'>Home</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
