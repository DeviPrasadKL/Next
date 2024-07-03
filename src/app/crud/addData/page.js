"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Page() {

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let formObj = Object.fromEntries(form.entries());
    const { title, desc } = formObj;
    if (title !== "" && desc !== "") {
      console.log(formObj);
      axios.post("http://localhost:3000/api", formObj)
        .then((res) => {
          console.log("Data added!!!");
          router.push("/crud");
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <div>
      <form onSubmit={(e) => { handleSubmit(e) }} className='flex justify-center items-center w-full h-screen flex-col gap-4'>
        <input placeholder='Title' name='title' className='text-black p-2 rounded-lg' />
        <input placeholder='Description' name='desc' className='text-black p-2 rounded-lg' />
        <button type='submit' className='py-2 px-6 rounded-lg bg-blue-900 hover:bg-blue-600'> Submit</button>
        <Link href="/crud">
          <button type='button' className='py-2 px-6 rounded-lg bg-blue-900 hover:bg-blue-700'>Back</button>
        </Link>
      </form>
    </div>
  )
}
