"use client"
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Page() {

  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api")
      .then((res) => {
        console.log(res.data);
        setData(res.data); setPending(false);
      })
  }, [pending])

  const deleteItem = (id) => {
    axios.delete(`http://localhost:3000/api/${id}`)
      .then((res) => {
        console.log(res);
        setPending(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  if (pending) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <h1 className='text-2xl text-white'>Loading...............</h1>
      </div>
    )
  } else {
    return (
      <div className='flex justify-center items-center w-full mt-6 gap-2 flex-col'>
        <Link href="/" className="md:mb-2">
          <button type="button" className='py-2 px-6 rounded-lg bg-blue-900 hover:bg-blue-700'>Home</button>
        </Link>
        <Link href="/crud/addData" className="md:mb-2">
          <button type="button" className='py-2 px-6 rounded-lg bg-blue-900 hover:bg-blue-700'>Add Data</button>
        </Link>
        <div className='flex justify-center items-center w-full h-full flex-col gap-4'>
          {
            !pending && data.map((element) => {
              return (
                <div className='border-2 p-4 rounded-xl flex items-center justify-center flex-col gap-4'>
                  <Link href={`/crud/details/${element.id}`} >
                    <h1>Title: {element.title}</h1>
                    <h2>Des: {element.desc}</h2>
                  </Link>
                  <button onClick={() => { deleteItem(element.id) }} className='py-2 px-6 rounded-lg bg-red-900 hover:bg-red-700'>Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
